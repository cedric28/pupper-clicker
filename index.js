const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const [page] = await browser.pages();
  await page.goto("https://odesk.kromeditors.com/tasks/");
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );
  // Then you have to find element on page, which you'd like to click.
  // It could be done with your browser. The image would be later.
  // Or use JS selectors. We assume the easiest case to show the logic.

  // You selected the element and get path via browser.
  const selectorForLoadMoreButton = "#claim-consultation-task";
  const isElementVisible = async (page, cssSelector) => {
    let visible = true;
    await page
      .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  };
  let loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
  while (loadMoreVisible) {
    await page.click(selectorForLoadMoreButton).catch(() => {});
    loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
  }
  // await page.click("#btnLogIn", { clickCount: 1 });
  // await page.waitForTimeout(2000);
  // await browser.close();
})();
