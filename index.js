var dotenv = require('dotenv').config();
var request = require('superagent');

var News = function() {};

var apiKey = '';
var language = '';

function getApiKey() {
	return apiKey;
}

News.prototype.getSources = function(callback) {

	if (!callback || typeof callback !== 'function') {
        return;
    }

	request
		.get(process.env.NEWS_SOURCES + '?language'+ language)
		.end(callback);
};

News.prototype.getArticles = function(params, callback) {

	if(typeof params === 'function') {
		// throw error
		callback = params;
		callback(new Error('Missing the params object'));
	}

	if(!params.source) {
		// throw error
		callback(new Error('source is a required'));
	}

	param = '?source='+ params.source;

	if(params.sortBy) {
		param = '&sortBy=' + params.sortBy;
	}

	param = param +'&apiKey='+ getApiKey();

	request
		.get(process.env.NEWS_ARTICLES + param)
		.end(callback);
};

News.prototype.setAPIKey= function(key) {
	apiKey = key || process.env.API_KEY;
};

News.prototype.getLanguage = function() {
	return language;
};

News.prototype.setLanguage = function(language) {
	language = language || 'en';
};

module.exports = News;