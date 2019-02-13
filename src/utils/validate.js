/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 数字*/
export function validateNumber(rule, value, callback) {
  if (_.isNaN(Number(value))) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}
/* 数字*/
export function validatePositiveNumber(rule, value, callback) {
  if (_.isNaN(Number(value)) || value < 0) {
    callback(new Error('请输入正数'))
  } else {
    callback()
  }
}

/* 整数*/
export function validateInteger(rule, value, callback) {
  if (_.isNaN(Number(value)) || value % 1 !== 0 || value <= 0) {
    callback(new Error('请输入正整数'))
  } else {
    callback()
  }
}

/* 身份证*/
export function valiadateIdentity(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确身份证号'))
  } else {
    callback()
  }
}

/* 手机*/
export function valiadatePhone(rule, value, callback) {
  const reg = /^1(3|4|5|7|8)\d{9}$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确手机号'))
  } else {
    callback()
  }
}