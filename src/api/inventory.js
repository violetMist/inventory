import request from '@/utils/request'

//获取库存列表
export function getList(params) {
	return request({
		url: '/inventory/getList',
		method: 'get',
		params: params
	})
}