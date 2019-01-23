import request from '@/utils/request'

//获取入库订单列表
export function getList(params) {
	return request({
		url: '/outStore/getList',
		method: 'get',
		params: params
	})
}