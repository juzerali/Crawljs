module.exports = CrawlJSError;

function CrawlJSError (msg) {
	Error.call(this);
	this.message = msg;
}

CrawlJSError.prototype.__proto__ = Error.prototype;