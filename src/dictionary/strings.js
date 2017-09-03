var names = require('./string/names')
var addresses = require('./string/addresses')
var urls = require('./string/urls')
var mobiles = require('./string/mobiles')
var emails = require('./string/emails')

var numbers = require('./numbers')

function name () {
	return numbers.randomValueOfArray(names.lastNames).def
		+ numbers.randomValueOfArray(names.firstNames).def
}

function nick () {
	return 'hello_mikky'
}

function address () {
	return 'shanghai'
}

function url () {
	return 'https://www.google.com'
}

function mobile () {
	return '18226745637'
}

function email () {
	var hosts = emails.hosts
	var name = random().substr(0, 8)
	return name + '@' + numbers.randomValueOfArray(hosts) + '.com'
}

function random () {
	return Math.random().toString(36).substr(2)
}

module.exports = {
	name,
	nick,
	address,
	url,
	mobile,
	email,
	random
}