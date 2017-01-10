var dotenv = require('dotenv').config();
var request = require('superagent');

var News = function() {};

var apiKey = '';
var apiEndpint = {};
var language = '';

function getApiKey() {
	return apiKey;
}

News.prototype.getSources = function(callback) {

	if (!callback || typeof callback !== 'function') {
        return;
    }

    var source = apiEndpint.source || process.env.NEWS_SOURCES;

    if(!source) {
    	callback({error: 'Api endpoint is needed'});
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
		return;
	}

	var articles = apiEndpint.articles || process.env.NEWS_SOURCES;

    if(!articles) {
    	callback({error: 'Api endpoint is needed'});
    }

	if(getApiKey() === '') {
		// throw error
		callback(new Error('Api Key is a required'));
		return;
	}

	if(!params.source) {
		// throw error
		callback(new Error('source is a required'));
		return;
	}

	param = '?source='+ params.source;

	if(params.sortBy) {
		param += '&sortBy=' + params.sortBy;
	}

	param += '&apiKey='+ getApiKey();

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

News.prototype.setApiEndpints= function(routes) {

	if(typeof routes !== 'object') {
		return 'Must be an object';
	}

	if(routes.hasProperty('source') && routes.hasProperty('articles'))
		apiEndpint = routes;
};

module.exports = News;