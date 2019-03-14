import request from '@/utils/request'

//获取库存列表
export function getList(params) {
	return request({
		url: '/inventory/getList',
		method: 'get',
		params: params
	})
}

//获取库存数量
export function getNumber(params) {
	return request({
		url: '/inventory/getNumber',
		method: 'get',
		params: params
	})
}