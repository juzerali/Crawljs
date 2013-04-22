module.exports = UrlRepository;

var EventEmitter = require("events").EventEmitter;

/**
* UrlRepository class is responsible for maintaining list of urls. It should
* keep track of which urls are already queued and/or crawled and not to 
* accept duplicate urls. It keeps track of number of urls obtained.
*/
function UrlRepository(limit) {
	this._linksArray = [];
	this.currentIndex = 0;
	this.limit = +limit?+limit:-1;
	this.counter = 0;
};

UrlRepository.prototype = EventEmitter.prototype;

UrlRepository.prototype.putUrl = function(url){
	var hash = url.indexOf("#");
	if(hash > 0){
		url = url.substring(0, hash);
	}
	var limit = this.limit;
	if(limit && (limit ==-1 || limit > 0)){
		if (this._linksArray.indexOf(url) == -1){
			console.log("URL found " + this.counter++ + ": " + url);
			this._linksArray.push(url);
			this.emit("put", url);
			if(limit != -1) this.limit--;
		}
	}
};