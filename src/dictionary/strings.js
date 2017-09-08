var names = require('./string/names')
var addresses = require('./string/addresses')
var urls = require('./string/urls')
var mobiles = require('./string/mobiles')
var emails = require('./string/emails')

var $random = require('./random')

function name () {
	return $random.randomValueOfArray(names.lastNames).def
		+ $random.randomValueOfArray(names.firstNames).def
}

function nick () {
	return 'hello_mikky'
}

function address () {
	return $random.randomValueOfArray(addresses.addresses)
}

function url () {
	return $random.randomValueOfArray(urls.security) +'://' 
				+ $random.randomString(8, 'lowercase') +'.'
				+ $random.randomValueOfArray(urls._)
}

function mobile () {
	var nums = [1]
	var secondNums = [3, 4, 5, 7, 8]
	nums.push($random.randomValueOfArray(secondNums))
	for (var i = 0; i < 9; i ++) {
		nums.push($random.random(0, 9))
	}
	return nums.join('')
}

function email () {
	var hosts = emails.hosts
	var name = $random.randomString(8, 'lowercase')
	return name + '@' + $random.randomValueOfArray(hosts) + '.com'
}

function random () {
	return $random.randomString()
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