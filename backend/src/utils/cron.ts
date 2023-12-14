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

const fetchData = async (url: string, startTime: number): Promise<void> => {
    try {
        const currentTime = Date.now();

        if (currentTime - startTime > maxWaitTime) {
            handleMaxWaitTimeExceeded(url);
            return;
        }

        const response = await axios.get(url);

        if (response.status === 200) {
            handleSuccessfulResponse(url, response.data);
        } else {
            handleErrorResponse(url, response.status);
        }
    } catch (error) {
        handleRequestError(url);
    }
};

const handleMaxWaitTimeExceeded = (url: string) => {
    console.log('Max time reached for', url, 'Stopping search.');
    urlsArrayWithError.push(url);
};

const handleSuccessfulResponse = (url: string, html: string) => {
    const $ = cheerio.load(html);
    const pageTitle = $('title').text();
    console.log('Page title for', url + ':', pageTitle);

    const index = urlsArray.indexOf(url);

    if (index !== -1 && projectTitles[index] !== pageTitle) {
        handleTitleMismatch(url, projectTitles[index], pageTitle);
    }
};

const handleErrorResponse = (url: string, statusCode: number) => {
    console.error('The request returned status code', statusCode, 'for:', url);
    urlsArrayWithError.push(url);
};

const handleRequestError = (url: string) => {
    urlsArrayWithError.push(url);
    console.error('HTTP request error for:', url);
};

const handleTitleMismatch = (url: string, expectedTitle: string, actualTitle: string) => {
    console.error(`Error: Title mismatch for ${url}. Expected "${expectedTitle}", but got "${actualTitle}"`);
    urlsArrayWithError.push(url);
};

const getProjects = async () => {
    try {
        const projects = await api.getProjects();
        projectTitles = projects
            .filter((element: any) => element.deployURL !== '' && element.deployURL != null)
            .map((element: any) => element.titleCheck);

        urlsArray = projects
            .filter((element: any) => element.deployURL !== '' && element.deployURL != null)
            .map((element: any) => element.deployURL);
    } catch (error) {
        handleGetProjectsError(error);
    }
};

const handleGetProjectsError = (error: any) => {
    console.log('Error getting projects', error);
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
                handleFetchDataError(url, error);
            }
        }

        if (urlsArrayWithError.length > 0) {
            handleErrorsAfterCheck();
        }
    });
};

const handleFetchDataError = (url: string, error: any) => {
    console.error(`Error fetching data from ${url}:`, error);
    urlsArrayWithError.push(url);
};

const handleErrorsAfterCheck = async () => {
    console.log('Number of URLs with errors:', urlsArrayWithError.length);
    const htmlContent = generateErrorHtml(urlsArrayWithError);
    console.log("Sending mail with errors...");
    await sendMail(EMAIL_TO_SEND_MSG, 'Web errors', htmlContent);
    urlsArrayWithError = [];
};


export default checkWebsOnline;
