// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin());

import dotenv from 'dotenv'
dotenv.config()
import {sleep} from "./halpers/common/sleep.mjs";
import {checkLoginForm} from "./modules/checkLoginForm.mjs";
import {checkLoginButton} from "./modules/checkLoginButton.mjs";
import {checkSendCodeToEmail} from "./modules/checkSendCodeToEmail.mjs";
export const LAUNCH_PUPPETEER_OPTS = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
    ],
    headless: false,
    ignoreHTTPSErrors: true,
    executablePath: executablePath(),
};

export const PAGE_PUPPETEER_OPTS = {
    networkIdle2Timeout: 3000,
    waitUntil: 'networkidle2',
    timeout: 300000,
};

(async () => {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const Page = await browser.newPage()
        await Page.goto('https://www.ea.com/fifa/ultimate-team/web-app/')

        await sleep(10_000)
        await checkLoginButton(Page)
        await sleep(3_000)
        await checkLoginForm(Page)
        // await sleep(3_000)
        // await checkSendCodeToEmail(Page)


    } catch (e) {

    }
})()