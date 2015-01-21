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

if(process.env.ENV_VARIABLE === 'ENABLE_BASIC_AUTH'){
    server.use(prerender.basicAuth());
}

if(process.env.ENV_VARIABLE === 'ENABLE_WHITELIST'){
    server.use(prerender.whitelist());
}

if(process.env.ENV_VARIABLE === 'ENABLE_BLACKLIST'){
    server.use(prerender.blacklist());
}

if(process.env.ENV_VARIABLE === 'ENABLE_LOGGER'){
    server.use(prerender.logger());
}

if(process.env.ENV_VARIABLE === 'ENABLE_INMEMORYHTMLCACHE'){
    server.use(prerender.inMemoryHtmlCache());
}

if(process.env.ENV_VARIABLE === 'ENABLE_S3HTMLCACHE'){
    server.use(prerender.s3HtmlCache());
}

server.start();
