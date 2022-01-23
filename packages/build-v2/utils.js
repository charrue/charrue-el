const camelizeRE = /-(\w)/g
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}
const upperCaseFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

exports.camelize = camelize
exports.upperCaseFirst = upperCaseFirst