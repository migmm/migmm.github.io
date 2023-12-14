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
const maxWaitTime = 60000;

let urlsArray: string[] = [];
let projectTitles: string[] = [];
let urlsArrayWithError: string[] = [];

/*
 * Function to fetch data from a given URL
 * @param {string} url - The URL to fetch data from
 * @param {number} startTime - The start time of the request in milliseconds
 * @returns {Promise<void>} - Promise indicating completion of the function
 */
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

/*
 * Handle case when max wait time is exceeded for a URL
 * @param {string} url - The URL for which the max wait time is exceeded
 * @returns {void}
 */
const handleMaxWaitTimeExceeded = (url: string): void => {
    console.log('Max time reached for', url, 'Stopping search.');
    urlsArrayWithError.push(url);
};

/*
 * Handle case when the HTTP response is successful
 * @param {string} url - The URL for which the response is successful
 * @param {string} html - The HTML content of the response
 * @returns {void}
 */
const handleSuccessfulResponse = (url: string, html: string): void => {
    const $ = cheerio.load(html);
    const pageTitle = $('title').text();
    console.log('Page title for', url + ':', pageTitle);

    const index = urlsArray.indexOf(url);

    if (index !== -1 && projectTitles[index] !== pageTitle) {
        handleTitleMismatch(url, projectTitles[index], pageTitle);
    }
};

/*
 * Handle case when there is an error in the HTTP response
 * @param {string} url - The URL for which there is an error in the response
 * @param {number} statusCode - The HTTP status code of the response
 * @returns {void}
 */
const handleErrorResponse = (url: string, statusCode: number): void => {
    console.error('The request returned status code', statusCode, 'for:', url);
    urlsArrayWithError.push(url);
};

/*
 * Handle general request error
 * @param {string} url - The URL for which there is a general request error
 * @returns {void}
 */
const handleRequestError = (url: string): void => {
    urlsArrayWithError.push(url);
    console.error('HTTP request error for:', url);
};

/*
 * Handle case when there is a mismatch in page titles
 * @param {string} url - The URL for which there is a title mismatch
 * @param {string} expectedTitle - The expected title
 * @param {string} actualTitle - The actual title obtained from the response
 * @returns {void}
 */
const handleTitleMismatch = (url: string, expectedTitle: string, actualTitle: string): void => {
    console.error(`Error: Title mismatch for ${url}. Expected "${expectedTitle}", but got "${actualTitle}"`);
    urlsArrayWithError.push(url);
};

/*
 * Function to retrieve projects from an API
 * @returns {Promise<void>} - Promise indicating completion of the function
 */
const getProjects = async (): Promise<void> => {
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

/*
 * Handle case when there is an error retrieving projects
 * @param {any} error - The error object indicating the issue
 * @returns {void}
 */
const handleGetProjectsError = (error: any): void => {
    console.log('Error getting projects', error);
};

/*
 * Function to check websites online status using a cron job
 * @returns {void}
 */
const checkWebsOnline = (): void => {
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

/*
 * Handle case when there is an error fetching data from a URL
 * @param {string} url - The URL for which there is an error fetching data
 * @param {any} error - The error object indicating the issue
 * @returns {void}
 */
const handleFetchDataError = (url: string, error: any): void => {
    console.error(`Error fetching data from ${url}:`, error);
    urlsArrayWithError.push(url);
};

/*
 * Handle errors after checking websites
 * @returns {Promise<void>} - Promise indicating completion of the function
 */
const handleErrorsAfterCheck = async (): Promise<void> => {
    console.log('Number of URLs with errors:', urlsArrayWithError.length);
    const htmlContent = generateErrorHtml(urlsArrayWithError);
    console.log("Sending mail with errors...");
    await sendMail(EMAIL_TO_SEND_MSG, 'Web errors', htmlContent);
    urlsArrayWithError = [];
};


export default checkWebsOnline;
