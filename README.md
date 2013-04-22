# Crawljs

A basic crawler written in nodejs

# Usage
```
npm install -g crawljs
crawljs http://nodejs.org
```

### Provide a limit to number of urls to be crawled
`crawljs http://nodejs.org 500` 
Crawls only first 500 urls encountered

## Programmatic api
```
var	Crawler = require("../lib/Crawler")
,	seed = "http://nodejs.org"
,	limit = 500;

var crawler = new Crawler(limit);
crawler.crawl(seed);
