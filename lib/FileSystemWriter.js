module.exports = FileSystemWriter;

var fs = require("fs");

function FileSystemWriter (folder) {
	this.folder = folder;
	fs.mkdir("./pages", function(e){
		if(e)
			console.log("Path ./pages already exists.")
	});
}

FileSystemWriter.prototype.write = function(url, chunk){
	var filename = "./pages/"+url.replace(/\//g, "__").substring(0,244)+".html";
	fs.appendFileSync(filename, chunk);
}