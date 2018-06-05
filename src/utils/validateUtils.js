export function validateName(rule, value, callback) {
  if(value !== '2') {
    callback('error')
  }else {
    callback()
  }
}