#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});

server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

if(process.env.ENABLE_BASIC_AUTH === 'true'){
    server.use(prerender.basicAuth());
}

if(process.env.ENABLE_WHITELIST === 'true'){
    server.use(prerender.whitelist());
}

if(process.env.ENABLE_BLACKLIST === 'true'){
    server.use(prerender.blacklist());
}

if(process.env.ENABLE_LOGGER === 'true'){
    server.use(prerender.logger());
}

if(process.env.ENABLE_INMEMORYHTMLCACHE === 'true'){
    server.use(prerender.inMemoryHtmlCache());
}

if(process.env.ENABLE_S3HTMLCACHE === 'true'){
    server.use(prerender.s3HtmlCache());
}

server.start();
