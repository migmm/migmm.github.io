import axios from 'axios';
import cheerio from 'cheerio';
import cron from 'node-cron';
import api from '../api/projects';

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
    cron.schedule('*/1 * * * *', async () => {
        const startTime = Date.now();

        await getProjects();

        const fetchPromises = urlsArray.map((url) => fetchData(url, startTime));
        await Promise.all(fetchPromises);

        if (urlsArrayWithError.length > 0) {
            console.log('Number of URLs with errors:', urlsArrayWithError.length);
            urlsArrayWithError = [];
        }
    });
};

export default checkWebsOnline;
