var News = require('./index.js');
var expect = require('expect.js');

var news = new News();

describe('News Module', function() {

	before(function(done) {

		news.setLanguage();
		news.setAPIKey();

		done();
	});


	it('Reading all the news sources', function(done) {

		news.getSoures(function(err, res){

			var response = res.body;

			expect(res).property('status').be(200);

			expect(response).property('sources').a('array');

			response.sources.forEach(function(item, i) {
				expect(response.sources[i]).property('name').a('string');
				expect(response.sources[i]).property('url').a('string');
				expect(response.sources[i]).property('category').a('string');
				expect(response.sources[i]).property('language').a('string');
				expect(response.sources[i]).property('country').a('string');
				expect(response.sources[i]).property('urlsToLogos').a('object');
				expect(response.sources[i]).property('sortBysAvailable').a('array');
			});


			done();
		});

	});

	it('Read artices from CNN', function(done) {

		var params = {
			source: 'cnn',
		};

		news.getArticles(params ,function(err, res){

			var response = res.body;

			expect(res).property('status').be(200);

			expect(response).property('source').a('string').be(params.source);

			expect(response).property('articles').a('array');

			response.articles.forEach(function(item, i) {
				expect(response.articles[i]).property('author');
				expect(response.articles[i]).property('title').a('string');
				expect(response.articles[i]).property('description').a('string');
				expect(response.articles[i]).property('url').a('string');
				expect(response.articles[i]).property('url').a('string');
				expect(response.articles[i]).property('urlToImage').a('string');
			});

			done();

		});

	});

});

news.setLanguage();

