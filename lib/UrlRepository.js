module.exports = UrlRepository;

var EventEmitter = require("events").EventEmitter;

function UrlRepository(limit) {
	this._linksArray = [];
	this.currentIndex = 0;
	this.limit = +limit?+limit:-1;
	this.counter = 0;
};

UrlRepository.prototype = EventEmitter.prototype;

UrlRepository.prototype.nextUrl = function() {
	var currentIndex = ++this.index;
	return this._linksArray[currentIndex];
};

UrlRepository.prototype.putUrl = function(url){
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