// create random stuff

/**
 * [random description]
 * @param  {number} start start position
 * @param  {number} end   end position
 * @return {number}       random number of the range from start to end
 */
function random(min, max) {
  var min = min || 0
  var max = max || 8
  return Math.round( Math.random() * (max - min) + min )
}

/**
 * get one value of an array randomly
 * @param  {Array} array the array
 * @return {any}       random value of array
 */
function randomValueOfArray (array) {
  return array[random(0, array.length - 1)]
}

var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
var charArray = chars.split('')
var textTransformRegx = /^(uppercase|lowercase|capitalize)$/
/**
 * create random string
 * @param  {number} len       random string length
 * @param  {string} transform uppercase|lowercase|capitalize
 * @return {string}           the random string you wanna get
 */
function randomString (len, transform) {
  var len = len || 8
  var ran = ''
  for (var i = 0; i < len; i ++) {
    ran += randomValueOfArray(charArray)
  }
  if (transform && textTransformRegx.test(transform)) {
    if (transform === 'uppercase')  {
      ran = ran.toUpperCase()
    } else if (transform === 'lowercase') {
      ran = ran.toLowerCase()
    } else if (transform === 'capitalize') {
      ran = ran[0].toUpperCase() + ran.substring(1).toLowerCase()
    }
  }
  return ran
}

module.exports = {
  random,
  randomValueOfArray,
  randomString
}

/**
 * 判断两个金额是否相等
 * @param  {string|number} money1 第一个金额
 * @param  {string|number} money2 当然是第二个金额
 * @return {boolean}        是否相等
 */
function is2MoneyEqual(money1, money2) {
  return parseFloat(money1).toFixed(2) === parseFloat(money2).toFixed(2)
}

