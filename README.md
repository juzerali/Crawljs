# Crawljs

A basic crawler written in nodejs

# Note
Crawljs has a dependency on jsdom which in turn has dependency on contextify which is a native nodejs extension. To run this crawler, you will require a C++ compiler on your machine. [Details](https://github.com/tmpvar/jsdom#contextify).

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
```