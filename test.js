var News = require('./index.js');

var news = new News();

news.setLanguage();

// news.getSoures(function(err, response){

// 	if(err) {
// 		console.log(err);
// 	}

// 	console.log(response.body);
// });

var params = {
	source: 'cnbc',
};

news.getArticles(params ,function(err, response){

	if(err) {
		console.log(err);
	}

	console.log(response.body);

});