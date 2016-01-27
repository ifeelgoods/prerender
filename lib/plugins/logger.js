module.exports = {
    onPhantomPageCreate: function(phantom, req, res, next) {
        req.prerender.page.set('onConsoleMessage', function(msg) {
            console.log('[CONSOLE] ' + msg);
        });

        req.prerender.page.set('onResourceError', function(resourceError) {
            console.log('[RESOURCE ERROR] Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
            console.log('[RESOURCE ERROR] Error Code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
        });

        req.prerender.page.set('onError', function(msg, trace) {
            var msgStack = ['[ERROR] ' + msg];

            if (trace && trace.length) {
                msgStack.push('[TRACE]');
                trace.forEach(function(t) {
                    msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
                });
            }

            console.error(msgStack.join('\n'));
        });

        next();
    }
}
