var names = require('./string/names')
var addresses = require('./string/addresses')
var urls = require('./string/urls')
var mobiles = require('./string/mobiles')
var emails = require('./string/emails')

var numbers = require('./numbers')

var ran = numbers.random

function name () {
	var lastNames = names.lastNames
	var firstNames = names.firstNames
	return lastNames[ran(0, lastNames.length - 1)].def
		+ firstNames[ran(0, firstNames.length - 1)].def
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
	return name + '@' + hosts[ran(0, hosts.length - 1)] + '.com'
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