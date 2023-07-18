// Create web server
// 1. Load modules
// 2. Create server
// 3. Start server
// 4. Listen for events

// 1. Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// 2. Create server
var server = http.createServer(handleRequest);

// 3. Start server
server.listen(8080);

// 4. Listen for events
function handleRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('pathname: ' + pathname);
    if (pathname == '/main') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('main.html', function(err, data) {
            res.write(data);
            res.end();
        });
    } else if (pathname == '/addComment') {
        var data = '';
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            var dataObject = qs.parse(data);
            console.log(dataObject);
            res.writeHead(200);
            res.end();
        });
    } else {
        res.writeHead(404);
        res.end('Page not found.');
    }
}
