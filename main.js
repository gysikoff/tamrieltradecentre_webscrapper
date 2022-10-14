const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 

// loading config
let raw = fs.readFileSync('config.json');
let config = JSON.parse(raw);

let items = config["items"];

// creating options for chrome driver
let chromeOptions = new chrome.Options()
chromeOptions.addArguments("--disable-gpu");
chromeOptions.addArguments("--disable-crash-reporter");
chromeOptions.addArguments("--disable-logging");
chromeOptions.excludeSwitches("enable-logging");

if(config["headless"]){
    chromeOptions.addArguments("--headless");
}

(async function main() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  try {
    for(const item of items){
        await driver.get(item["url"]);
        // Wait for page to fetch the data
        await driver.wait(until.elementsLocated(By.xpath("//table[@class='trade-list-table max-width']")));
        // Get all the grids for informations
        let nameGrids = await driver.findElements(By.xpath("//div[contains(@data-bind, 'text: Name')]"));
        let playerGrids = await driver.findElements(By.xpath("//div[contains(@data-bind, 'text: PlayerID')]"));
        let locationGrids = await driver.findElements(By.xpath("//div[contains(@data-bind, 'text: StringResource')]"));
        let guildGrids = await driver.findElements(By.xpath("//div[contains(@data-bind, 'text: GuildName')]"));
        let priceGrids = await driver.findElements(By.xpath("//span[contains(@data-bind, 'localizedNumber: UnitPrice')]"));
        let quantityGrids = await driver.findElements(By.xpath("//span[contains(@data-bind, 'localizedNumber: Amount')]"));
        let lastSeenGrids = await driver.findElements(By.xpath("//td[contains(@data-bind, 'minutesElapsed: DiscoverUnixTime')]"));
        
        // Iterate through every item found on page
        for(let i=0; i<nameGrids.length; i++){
            let itemListed = {
                name: await nameGrids[i].getText(),
                player: await playerGrids[i].getText(),
                location: await locationGrids[i].getText(),
                guild: await guildGrids[i].getText(),
                price: parseFloat((await priceGrids[i].getText()).replace(',','')),
                quantity: parseInt((await quantityGrids[i].getText()).replace(',','')),
                lastSeen: await lastSeenGrids[i].getText()
            };
            // log item if meets conditions
            if (itemListed["price"] <= item["price"]){
                console.log(`Price (${itemListed["name"]}): ${itemListed["price"]} (QUANTITY: ${itemListed["quantity"]})\nPlayer: ${itemListed["player"]}\nLocation: ${itemListed["location"]} (GUILD: ${itemListed["guild"]})\nLast Seen: ${itemListed["lastSeen"]}\n`);
            }
        }
        
        await sleep(config["nextUrlTimeout"]);
    }
  } finally {
    await driver.quit();
    await sleep(config["nextLoopTimeout"]);
    console.log("##### NEXT LOOP #####\n");
    await main();
  }
})();