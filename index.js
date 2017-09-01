var path = require('path')
var server = require(path.join(__dirname, 'src/server.js'))
var routes = require(path.join(__dirname, 'src/routes.js'))

server.start(routes.mockRoute)