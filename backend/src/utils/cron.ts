import axios from 'axios';
import cheerio from 'cheerio';
import cron from 'node-cron';
import api from '../api/projects';
import sendMail from '../utils/mailSender';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();

const EMAIL_TO_SEND_MSG = process.env.EMAIL_SEND_MESSAGE || '';
const WEBCHECK_INTERVAL = process.env.WEBCHECK_INTERVAL || '12';

let urlsArray: string[] = [];
let urlsArrayWithError: string[] = [];
const maxWaitTime = 60000;


const getProjects = async () => {
    try {
        const projects = await api.getProjects();
        urlsArray = projects.filter((element: any) => element.deployURL).map((element: any) => element.deployURL);
    } catch (error) {
        console.log('Error getting projects', error);
    }
};

const fetchData = async (url: string, startTime: number): Promise<void> => {
    try {
        const currentTime = Date.now();

        if (currentTime - startTime > maxWaitTime) {
            console.log('Max time reached for', url, 'Stopping search.');
            urlsArrayWithError.push(url);
            return;
        }

        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                const pageTitle = $('title').text();
                console.log('Page title for', url + ':', pageTitle);
            } else {
                console.error('The request returned status code', response.status, 'for:', url);
                urlsArrayWithError.push(url);
            }
        } catch (error) {
            console.log(url);
            urlsArrayWithError.push(url);
            console.error('HTTP request error for:', url);
        }
    } catch (error) {
        urlsArrayWithError.push(url);
        console.error('Error fetching data from:', url);
    }
};

const checkWebsOnline = () => {
    const timeToCron =convertToCronExpression(WEBCHECK_INTERVAL);

    cron.schedule(timeToCron, async () => {
        const startTime = Date.now();

        await getProjects();

        const fetchPromises = urlsArray.map((url) => fetchData(url, startTime));
        await Promise.all(fetchPromises);

        if (urlsArrayWithError.length > 0) {
            console.log('Number of URLs with errors:', urlsArrayWithError.length);
            const htmlContent = generateErrorHtml(urlsArrayWithError);
            console.log(htmlContent)
            await sendMail(EMAIL_TO_SEND_MSG, 'Web errors', htmlContent );
            urlsArrayWithError = [];
        }
    });
};

const generateErrorHtml = (errorUrls:any) => {
    const title = "Web errors";
    const errorList = errorUrls.map((url:any) => `<li>${url}</li>`).join("\n");

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            <ul>
                ${errorList}
            </ul>
        </body>
        </html>
    `;
}

/* 

    Equivalent time in minutes to use in function convertToCronExpression()

    1       // 1 min
    720     // 12 h 0 min
    1440    // 1 day
    43200   // 1 month
    525600  // 1 year

*/

const convertToCronExpression = (value:any) => {
    if (value < 1) {
        return `*/1 * * * *`;
    } else if (value < 60) {
        return `*/${value} * * * *`;
    } else if (value < 1440) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${minutes} ${hours} * * *`;
    } else if (value < 43200) {
        const days = Math.floor(value / 1440);
        return `0 0 */${days} * *`;
    } else if (value < 525600) {
        const months = Math.floor(value / 43200);
        return `0 0 1 */${months} *`;
    } else {
        const years = Math.floor(value / 525600);
        return `0 0 1 1 */${years}`;
    }
}


export default checkWebsOnline;
