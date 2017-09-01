var http = require('http')
var url = require('url')

var config = require('./../build/config')

function start (route) {
	function serverHandler (req, res) {
		var pathname = url.parse(req.url).pathname
		var json = route(pathname)
		res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
		if (json) {
			res.write(json)
		}
		res.end()
	}
	http.createServer(serverHandler).listen(config.port)
}

module.exports.start = start

