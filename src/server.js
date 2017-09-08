var http = require('http')
var url = require('url')
var path = require('path')

var fs = require('fs')

var textPlain = 'plain'
var textHtml = 'html'
var charset = 'utf-8'

var config = require('./../build/config')

function header (textType) {
	return {
		'Content-Type': 'text/' + (textType || textPlain) +';charset=' + charset
	}
}

function start (route) {
	function serverHandler (req, res) {
		var pathname = url.parse(req.url).pathname
		// console.log('pathname => ' + pathname)
		// if (pathname === '/') {
		// 	res.writeHead(200, header(textHtml))
		// 	// render index.html
		// 	fs.readFile('./index.html', function (err, data) {
		// 		res.write(data)
		// 		res.end()
		// 	})
		// } else {
		// 	res.writeHead(200, header())
		// 	var json = route(pathname)
		// 	if (json) {
		// 		res.write(json)
		// 	}
		// 	res.end()
		// }			
		res.writeHead(200, header())
		var json = route(pathname)
		if (json) {
			res.write(json)
		}
		res.end()
	}
	http.createServer(serverHandler).listen(config.port)
}

module.exports.start = start
