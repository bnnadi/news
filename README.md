# Node News

Up-to-date news headlines and metadata in JSON from 70+ popular news sites. Powered by NewsAPI.org.

You will need an API key from https://newsapi.org

Please look at their documentation to see how to use the API

If you use this in a project, add a 'powered by' attribution link back to NewsAPI.org


## How to use
First install dependencies
```javascript
npm install node-news
```

Second create an .env file  and set with the correct route
```
NEWS_ARTICLES
NEWS_SOURCES
```

```javascript

var News = require('node-news');

var news = new News();

// you can pass a string for which language you want
// by default it will be set to en (english)
news.setLanguage();

// You have the option of passing in your api key here
// Or creating a .env file and setting it to as API_KEY
news.setAPIKey();
```

Once you set the Language and your API key then you can call these functions that accept a callback function
```javascript
news.getSoures(callback);
news.getArticles(callback);

```