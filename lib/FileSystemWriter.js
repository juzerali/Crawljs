module.exports = FileSystemWriter;

var fs = require("fs");

/**
* Whenever http response is returned, this class is called to write
* the response contents on disk. Saves pages by the name of their 
* urls except that it replaces all the slashes with two consecutive 
* underscores
*/
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