var mockConfig = require('./../mock.config')
var injector = require('./injector')

var numbers = require('./dictionary/numbers')
var strings = require('./dictionary/strings')

var random = require('./dictionary/random')

// var pathNameRegx = /^\/?([\w+|\W+]\/?)+$/
var replaceRegx = /^\/|\/$/g
var isHtmlRegx = /.(html|htm)$/
var htmlFileRegx = /\/((\w+|\W+).(html|htm))$/

var htmlTagRegx = /<(S*?)[^>]*>.*?|<.*?\/>/g

function getHtmlFileName (pathName) {
  if (isHtmlRegx.test(pathname)) {
    var temp = pathname.match(htmlFileRegx)
    if (temp) {
      return temp[1]
    } else {
      return pathname
    }
  }
  return pathname
}

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
  // console.log('pathname: ' + pathname)
  var realPathName = '/'
  if (pathname !== '/') {
    realPathName = pathname.replace(replaceRegx, '')
  }
  if (realPathName === 'favicon.ico') {
    return null
  }
  if (mockConfig.inject) {
    injector.inject(mockConfig.inject)
  }
  var config = mockConfig.api[realPathName]
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
      json[i] = 
        (isArray(infoType) || isObject(infoType)) 
            ? formatVal(info, handleConfig(info))
                : getValue(infoType, info)
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
    return Boolean(random.random(0, 1))
  } else {
    var field = info.field || 'random', 
        args = [], 
        val, 
        target = strings
    if (type === Number) {
      target = numbers
      if (info.range) {
        args = getRange(info.range)
      }
    }
    val = target[field].apply(null, args)
    return formatVal(info, val)
  }
}

/**
 * format value when formatter is overwrited is config
 * @param  {[type]} info [description]
 * @param  {[type]} val  [description]
 * @return {[type]}      [description]
 */
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