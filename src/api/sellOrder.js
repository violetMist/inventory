import request from '@/utils/request'

//获取出库单列表
export function getList(params) {
	return request({
		url: '/sellOrder/getList',
		method: 'get',
		params: params
	})
}
//获取单个出库单信息
export function viewSellOrder(id) {
	return request({
		url: '/sellOrder/view',
		method: 'get',
		params: {
			id
		}
	})
}
//添加出库单
export function addSellOrder(params) {
	return request({
		url: '/sellOrder/add',
		method: 'post',
		data: params
	})
}
//编辑出库单
export function editSellOrder(params) {
	return request({
		url: '/sellOrder/edit',
		method: 'post',
		data: params
	})
}

//作废出库单
export function delSellOrder(params) {
	return request({
		url: '/sellOrder/delete',
		method: 'post',
		data: params
	})
}