var random = require('./random')

function age (start, end) {
  return random.random(start || 18, end || 99)
}

function price () {
  return 3
}

function id () {
  return 1
}

module.exports = {
  age,
  price,
  id
}
