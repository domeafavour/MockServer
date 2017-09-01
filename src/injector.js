var numbers = require('./dictionary/numbers')
var strings = require('./dictionary/strings')

var types = {
	'numbers': numbers,
	'strings': strings
}

function inject (injection) {
	if (injection.fields) {
		injectFields(injection.fields)
	} 
	if (injection.dictionary) {
		injectDictionary(injection.dictionary)
	}
}

function injectFields (fields) {
	for (var f in fields) {
		var field = fields[f]
		for (var m in field) {
			types[f] = field[m]
		}
	}
}

function injectDictionary (dictionary) {
	// inject dictionary
	// console.log(dictionary)
}

module.exports.inject = inject