var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 8081;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    addHeader: ['Access-Control-Allow-Origin', '*'],
    addHeader: ['Access-Control-Allow-Credentials', 'true'],
    addHeader: ['Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS, PUT'],
    addHeader: ['Access-Control-Allow-Headers', '"Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});