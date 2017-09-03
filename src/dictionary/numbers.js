
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
  id,
  randomValueOfArray
}
