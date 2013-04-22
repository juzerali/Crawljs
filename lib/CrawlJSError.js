module.exports = CrawlJSError;

/**
* Error class to throw application specific errors.
*/
function CrawlJSError (msg) {
	Error.call(this);
	this.message = msg;
}

CrawlJSError.prototype.__proto__ = Error.prototype;