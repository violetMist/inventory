import request from '@/utils/request'

//获取入库单列表
export function getList(params) {
	return request({
		url: '/payOrder/getList',
		method: 'get',
		params: params
	})
}
//获取单个入库单信息
export function viewPayOrder(id) {
	return request({
		url: '/payOrder/view',
		method: 'get',
		params: {
			id
		}
	})
}
//添加入库单
export function addPayOrder(params) {
	return request({
		url: '/payOrder/add',
		method: 'post',
		data: params
	})
}
//编辑入库单
export function editPayOrder(params) {
	return request({
		url: '/payOrder/edit',
		method: 'post',
		data: params
	})
}

//作废入库单
export function delPayOrder(params) {
	return request({
		url: '/payOrder/delete',
		method: 'post',
		data: params
	})
}