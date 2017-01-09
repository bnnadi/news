var dotenv = require('dotenv').config();
var request = require('superagent');

var News = function() {};

var apiKey = '';
var language = '';

function getApiKey() {
	return apiKey;
}

News.prototype.getSources = function(callback) {

	callback = (typeof callback === 'function') ? callback : function() {};

	request
		.get(process.env.NEWS_SOURCES + '?language'+ language)
		.end(callback);
};

News.prototype.getArticles = function(params, callback) {

	callback = (typeof callback === 'function') ? callback : function() {};

	// TODO: look at this error
	if(typeof params === 'function' || params.length === 0) {
		// throw error
		console.log('Missing the params object');
		callback({error: 'Missing the params object'});
		return;
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