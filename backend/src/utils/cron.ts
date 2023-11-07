import axios from "axios";
import cheerio from "cheerio";
import cron from "node-cron";
import api from "../api/projects";

let urlsArray:any = [];
const maxWaitTime = 60000;


const getProjects = async () => {
    const projects = await api.getProjects();
    urlsArray = [];

    try {
        projects.forEach((element: { deployURL: string }) => {
            if (element.deployURL) {
                urlsArray.push(element.deployURL);
            }
        });

    } catch (error) {
        console.log("Error getting projects", error);
    }
};

function fetchData(url: string, startTime: number): void {
    try {
        const currentTime = Date.now();

        if (currentTime - startTime > maxWaitTime) {
            console.log("Max time reached to", url, "Stoping search.");
            return;
        }

        axios
            .get(url)
            .then((response: any) => {
                if (response.status === 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);

                    const pageTitle = $("title").text();
                    console.log("Page title", url + ":", pageTitle);
                } else {
                    console.error("The request returned code 200 for: ", url);
                }
            })
            .catch(() => {
                console.error("HTTP request error from: ", url);
            });
    } catch (error) {
        console.error("Error fetching data from: ", url);
    }
}

//"0 */12 * * *"
const checkWebsOnline = () => {
    cron.schedule("*/1 * * * *", async () => {
        const startTime = Date.now();

        await getProjects();

        urlsArray.forEach((url:any) => {
            fetchData(url, startTime);
        });
    });
};


export default checkWebsOnline;
