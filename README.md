# tamrieltradecentre_webscrapper
get notifications when someone lists a cheap item

![image](https://user-images.githubusercontent.com/73183321/195930616-8d6cd18e-c451-4465-aca3-69bbc40c49b7.png)

Bot is based on selenium-webdriver, for it to work you have to download chromedriver matching your chrome version -> https://chromedriver.chromium.org/ and add it to system PATH variables

To turn off webdriver's popup window set headless option in config.json to true

nextUrlTimeout defines a time in (ms) for webdriver to sleep before going to a next url

nextLoopTimeout defines a time in (ms) for webdriver to sleep before next loop

To add more items just copy an item from config and change urls (when you go to https://www.tamrieltradecentre.com/ search an item and click on last seen tab then copy the url and paste it into config)

You can also try to link this with discordbot to create useful tool for your guild, but instead of printing things to text channel you can try to use ![image](https://user-images.githubusercontent.com/73183321/195931476-d9903676-7059-4bfe-a25b-6316a14b46c5.png) 

to print items as below
![image](https://user-images.githubusercontent.com/73183321/195931644-64e1d97e-2089-46b0-aca0-c60175fccf6c.png)

