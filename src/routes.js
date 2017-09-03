var mockConfig = require('./../mock.config')
var injector = require('./injector')
var numbers = require('./dictionary/numbers')
var strings = require('./dictionary/strings')

// var pathNameRegx = /^\/?([\w+|\W+]\/?)+$/
var replaceRegx = /^\/|\/$/g

// var funcRegx = /^(Number|Boolean|String|Array|Object)$/
// var funcToStringRegx = /^\[object\s(Number|String|Boolean|Array|Object)\]$/

function isObject (constructor) {
  return constructor.name === Object.name
}

function isArray (constructor) {
  return constructor.name === Array.name
}

function isBoolean (constructor) {
  return constructor.name === Boolean.name
}

function mockRoute (pathname) {
  var realPathName = pathname.replace(replaceRegx, '')
  if (realPathName === 'favicon.ico') {
    return null
  }
  if (mockConfig.inject) {
    injector.inject(mockConfig.inject)
  }
  var config = mockConfig.data[realPathName]
  var json = handleConfig(config)
  return JSON.stringify(json)
}

/**
 * [handleConfig description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
function handleConfig (config) {
  var json = {}
  var type = config.type
  if (type) {
    if (isArray(type)) {
      json = []
      var size = config.size || 10
      for (var i = 0; i < size; i ++) {
        json.push(handleConfig(config.construct))
      }
    } else {
      return handleConfig(config.construct)
    }
  } else {
    for (var i in config) {
      var info = config[i]
      var infoType = info.type
      if (isArray(infoType) || isObject(infoType)) {
        json[i] = formatVal(info, handleConfig(info))
      } else {
        json[i] = getValue(infoType, info)
      }
    }
  } 
  return json
}

/**
 * [getValue description]
 * @param  {constructor} type [description]
 * @param  {Object} info [description]
 * @return {string|number|bool}      [description]
 */
function getValue (type, info) {
  if (isBoolean(type)) {
    return Boolean(numbers.random(0, 1))
  } else {
    var field = info.field || 'random', 
        args = [], 
        val, 
        target = strings
    switch (type) {
      case String: {
        // field = info.field || 'name'
        break
      }
      case Number: {
        target = numbers
        // field = info.field || 'age'
        if (info.range) {
          args = getRange(info.range)
        }
        break
      }
    }
    val = target[field].apply(null, args)
    return formatVal(info, val)
  }
}

function formatVal (info, val) {
  return info.formatter ? info.formatter(val) : val
}

/**
 * string like [18-99]
 * @param  {[type]} range [description]
 * @return {[type]}       [description]
 */
function getRange (range) {
  range = range.replace(/^\[|\]$/g, '')
  return range.split('-').map(function (num) {
    return Number(num)
  })
}

module.exports.mockRoute = mockRoute