var dotenv = require('dotenv').config();
var request = require('superagent');

var News = function() {};

var language = '';

News.prototype.getSoures = function(callback) {

	callback = (typeof callback === 'function') ? callback : function() {};

	request
		.get(process.env.NEWS_SOURCES + '?language'+ language)
		.end(callback);
};

News.prototype.getArticles = function(params, callback) {

	callback = (typeof callback === 'function') ? callback : function() {};

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

	param = param +'&apiKey='+process.env.API_KEY;

	request
		.get(process.env.NEWS_ARTICLES + param)
		.end(callback);
};

News.prototype.getLanguage = function() {
	return language;
};
News.prototype.setLanguage = function(language) {
	language = language || 'en';
};

module.exports = News;