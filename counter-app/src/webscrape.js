import { Component } from "react";

const app = require("./App.js")
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs")
puppeteer.use(StealthPlugin());
require('localstorage-polyfill');


  async function scrapeProduct(url){
  //launching puppeteer
  const browser = await puppeteer.launch({ headless: false });
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
  /* let visit = 0;

  function location() {
    //choosing location
    page.click(
      "#site-layout > div.modal-dialog.modal-dialog--region-selector > div.modal-dialog__content > div > div > ul > li:nth-child(2) > button"
    );
    page.screenshot({ path: "src/images/testresult3.png" });
    console.log("Pucture 3:" + { path: "src/images/testresualt3.png" });
    visit++;
    time();
  }*/

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

    /*if (visit <= 0) {
      location();
    }*/

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
      '//*[@id="site-content"]/div/div/div/div[2]/div/div[2]/div[2]/div[2]/div/ul/li[1]/div/div/div[3]/div[1]/h3/a/span'
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

    //JSON START
    let myObj;

    // Storing data:
    myObj = { name: title, price: price, img: image };

    // Retrieving data:
    fs.writeFile("src/shoppingData.json", JSON.stringify(myObj), () => {
      console.log("The data saved to the file named shoppingData.json")
    })
    
    console.log("JSON Name" + myObj.name);
    console.log("JSON Price" + myObj.price);
    console.log("JSON Name" + myObj.img);


    //JSON END
  }
  console.log("-----------------------------Ending-------------------------");
  console.log(page.url());
  await browser.close();
}
var product = () => {
  let productlink = "https://www.realcanadiansuperstore.ca/search?search-bar=";
  let itemProduct;
  itemProduct = "orange";
  return productlink + itemProduct;
};

scrapeProduct(product());
