module.exports = new Fetch;

var	http = require("http")
,	https = require("https")
,	path = require("path")
,	FileSystemWriter = require("./FileSystemWriter");

var fileSystemWriter = new FileSystemWriter();


function Fetch(){
	this.counter = 0;
};

Fetch.prototype.get = function(url, callback){
	var self = this;
	var body = "";
	var self = this;
	var agent = url.indexOf('https')===0?https:http;

	agent.get(url, function(res){
		console.log("URL FETCHED "+ self.counter++ +": " + url);
		if (res.statusCode === 301 || res.statusCode === 302){
			callback("redirect", res.headers.location);
			return;
		}
		res.on('data', function(chunk){
			body += chunk;
			fileSystemWriter.write(url, chunk);
		});

		res.on("end", function(){
			callback(null, body);
		});

		res.on("error", function(err){
			console.log(err);
		});
	}).on("error", function(err){
		console.log(err);
	});
};