module.exports = Crawler;

var UrlRepository = require("./UrlRepository")
,	jsdom = require("jsdom")
,	fetch = require("./Fetch")
,	CrawlJSError = require("./CrawlJSError");


var ABSOLUTE_URL_PATTERN = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
var ABSOLUTE_URL_PATH_PATTERN = /\/(.*)[/](.*)/;
var RELATIVE_URL_PATH_PATTERN = /(.*)[/](.*)/;

function Crawler(limit){
	var self = this;
	self.limit = limit;
	var urlRepository = self.urlRepository = new UrlRepository(self.limit);

	/**
	*	This is the main logic of crawler
	*/
	urlRepository.on("put", function(url){
		//Ignore mailto urls and hashtags
		if (url.substring(0,7).toLowerCase() === "mailto") return;

		fetch.get(url, function(err, body){
			if(err && err === "redirect"){
				var redirectUrl = body;
				urlRepository.putUrl(redirectUrl);
			}
			try{
				jsdom.env(body, function(err, window){
					// if(!window) return;
					var anchors = window.document.getElementsByTagName('a');
					for (var i = anchors.length - 1; i >= 0; i--) {
						var href = anchors[i].href;
						if(href.indexOf('http') === 0 && href.indexOf("https") !=0 ) 
							urlRepository.putUrl(anchors[i].href);
					};
				});
			} catch(e){
				//Non html page encountered, ignore
				console.error(e);
			}
		});
	});
}

Crawler.prototype.crawl = function(seed){debugger;
	if (!ABSOLUTE_URL_PATTERN.test(seed))
		throw new CrawlJSError("Fully qualified seed url is required. Cannot accept " + seed);
	self = this;
	self.urlRepository.putUrl(seed);
}