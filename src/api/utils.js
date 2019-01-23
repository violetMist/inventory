import request from '@/utils/request'
//登录
export function list() {
	return request({
		url: '/utils/list',
		method: 'get',
		params: {}
	})
}

export function list4Sell() {
	return request({
		url: '/utils/list4Sell',
		method: 'get',
		params: {}
	})
}