import request from '@/utils/request'
//登录
export function login(account, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}
//获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/session',
    method: 'get'
  })
}
//退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
//获取用户列表
export function getList(params) {
  return request({
    url: '/user/getList',
    method: 'get',
    params: params
  })
}
//添加用户
export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    data: params
  })
}
//获取单个用户信息
export function viewUser(id) {
  return request({
    url: '/user/view',
    method: 'get',
    params: {
      id
    }
  })
}
//编辑用户
export function editUser(params) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: params
  })
}