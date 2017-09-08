var path = require('path')
var server = require(path.join(__dirname, 'src/server.js'))
var routes = require(path.join(__dirname, 'src/routes.js'))

server.start(routes.mockRoute)

console.log('server started...')

// !Function.prototype.bind 
// && Function.prototype.bind = function (object) {
// 	var self = this
// 	return function () {
// 		self.apply(object)
// 	}
// }

// wonderful reg
// yes, it is.
var moneyReg = /^([1-9]\d{0,}|0)([.]?|(\.\d{1,2})?)$/
