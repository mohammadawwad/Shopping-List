// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function scrapeProduct(url) {
  //launching puppeteer
  const browser = await puppeteer.launch({ headless: true });
  //opens page
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load" });
  console.log(
    "-----------------------------Launching-------------------------"
  );
  console.log("Page is loaded...");

  //item count
  let item = 0;
  //Have you visited
  let visit = 0;

  function location() {
    //choosing location
    page.click(
      "#site-layout > div.modal-dialog.modal-dialog--region-selector > div.modal-dialog__content > div > div > ul > li:nth-child(2) > button"
    );
    page.screenshot({ path: "src/images/testresult3.png" });
    console.log("Pucture 3:" + { path: "src/images/testresualt3.png" });
    visit++;
    time();
  }

  //function for current seconds
  function time() {
    var d = new Date();
    var n = d.getSeconds();
    return console.log("TimeStamp:" + n);
  }

  for (item; item <= 0; item++) {
    await page.screenshot({ path: "src/images/testresult1.png" });
    console.log("Pucture 1:" + { path: "src/images/testresualt1.png" });
    time();

    //waiting 2 seconds to load page
    await new Promise((r) => setTimeout(r, 2000));
    await page.screenshot({ path: "src/images/testresult2.png" });
    console.log("Pucture 2:" + { path: "src/images/testresualt2.png" });
    time();

    if (visit <= 0) {
      location();
    }

    //checking if loaded properly after waiting for 2 more seconds
    await new Promise((r) => setTimeout(r, 12000));
    await page.screenshot({ path: "src/images/testresult4.png" });
    console.log("Pucture 4:" + { path: "src/images/testresualt4.png" });
    time();

    //fetching data
    console.log("-----------------------Fetching Data------------------------");

    //Item Image
    const [el] = await page.$x(
      '//*[@id="site-content"]/div/div/div/div[2]/div/div[2]/div[2]/div[2]/div/ul/li[1]/div/div/div[2]/div/img'
    );
    const imgSrc = await el.getProperty("src");
    const image = await imgSrc.jsonValue();
    console.log("Status: SUCCESS");

    //Item Title
    const [el2] = await page.$x(
      '//*[@id="site-content"]/div/div/div/div[2]/div/div[2]/div[2]/div[2]/div/ul/li[1]/div/div/div[3]/div[1]/h3/a/span/span[1]'
    );
    const titleSrc = await el2.getProperty("textContent");
    const title = await titleSrc.jsonValue();
    console.log("Status: SUCCESS");

    //Item Price
    const [el3] = await page.$x(
      '//*[@id="site-content"]/div/div/div/div[2]/div/div[2]/div[2]/div[2]/div/ul/li[1]/div/div/div[3]/div[2]/ul[1]/li/span/span[1]'
    );
    const priceSrc = await el3.getProperty("textContent");
    const price = await priceSrc.jsonValue();
    console.log("Status: SUCCESS");
    console.log("Data Achieved...");

    console.log({ image, title, price });
  }
  console.log("-----------------------------Ending-------------------------");
  await browser.close();
}

product = () => {
  let productlink = "https://www.realcanadiansuperstore.ca/search?search-bar=";
  let itemProduct;
  itemProduct = "2% milk";
  return productlink + itemProduct;
};

scrapeProduct(product());
