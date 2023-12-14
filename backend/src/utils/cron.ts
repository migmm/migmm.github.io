import axios from 'axios';
import cheerio from 'cheerio';
import cron from 'node-cron';
import api from '../api/projects';
import sendMail from '../utils/mailSender';
import dotEnvExtended from 'dotenv-extended';
import convertToCronExpression from './convertToCronExpression';
import { generateErrorHtml } from './emailContentGenerator';


dotEnvExtended.load();

const EMAIL_TO_SEND_MSG = process.env.EMAIL_SEND_MESSAGE || '';
const WEBCHECK_INTERVAL = parseInt(process.env.WEBCHECK_INTERVAL || '720');

let urlsArray: string[] = [];
let projectTitles: string[] = [];
let urlsArrayWithError: string[] = [];
const maxWaitTime = 60000;

const getProjects = async () => {
    try {
        const projects = await api.getProjects();
        projectTitles = projects
            .filter(
                (element: any) => element.deployURL !== '' && element.deployURL != null
            )
            .map((element: any) => element.titleCheck);

        urlsArray = projects
            .filter(
                (element: any) => element.deployURL !== '' && element.deployURL != null
            )
            .map((element: any) => element.deployURL);
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

                const index = urlsArray.indexOf(url);

                if (index !== -1 && projectTitles[index] !== pageTitle) {
                    console.error(`Error: Title mismatch for ${url}. Expected "${projectTitles[index]}", but got "${pageTitle}"`);
                    urlsArrayWithError.push(url);
                }
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
    const timeToCron = convertToCronExpression(WEBCHECK_INTERVAL);

    cron.schedule(timeToCron, async () => {
        const startTime = Date.now();
        await getProjects();

        for (const url of urlsArray) {
            try {
                await fetchData(url, startTime);
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                urlsArrayWithError.push(url);
            }
        }

        if (urlsArrayWithError.length > 0) {
            console.log('Number of URLs with errors:', urlsArrayWithError.length);
            const htmlContent = generateErrorHtml(urlsArrayWithError);
            console.log(htmlContent);
            await sendMail(EMAIL_TO_SEND_MSG, 'Web errors', htmlContent);
            urlsArrayWithError = [];
        }
    });
};


export default checkWebsOnline;
