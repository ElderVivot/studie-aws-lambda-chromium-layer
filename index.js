const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

module.exports = {
    handler: async () => {
        try {
            const browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });

            const page = await browser.newPage();

            await page.goto("https://www.sefaz.go.gov.br/netaccess/000System/acessoRestrito/login", { waitUntil: "networkidle0" });

            console.log(await page.content())
            console.log("Chromium:", await browser.version());
            console.log("Page Title:", await page.title());

            await page.close();

            await browser.close();
        } catch (error) {
            throw new Error(error.message);
        }
    },
};