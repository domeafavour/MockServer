/**
 * [random description]
 * @param  {number} start start position
 * @param  {number} end   end position
 * @return {number}       random number of the range from start to end
 */
function random(start, end) {
  var start = start || 0
  var end = end || 8
  return Math.round(Math.random() * (end - start) + start )
}

/**
 * get one random value of an array
 * @param  {Array} array the array
 * @return {any}       random value of array
 */
function randomValueOfArray (array) {
  return array[random(0, array.length - 1)]
}

function age (start, end) {
  return random(start || 18, end || 99)
}

function price () {
  return 3
}

function id () {
  return 1
}

module.exports = {
  random,
  age,
  price,
  id
}
