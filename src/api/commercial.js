import request from '@/utils/request'

//获取商户列表
export function getList(params) {
	return request({
		url: '/commercial/getList',
		method: 'get',
		params: params
	})
}
//获取单个商户信息
export function viewCommercial(id) {
	return request({
		url: '/commercial/view',
		method: 'get',
		params: {
			id
		}
	})
}
//添加商户
export function addCommercial(params) {
	return request({
		url: '/commercial/add',
		method: 'post',
		data: params
	})
}
//编辑商户
export function editCommercial(params) {
	return request({
		url: '/commercial/edit',
		method: 'post',
		data: params
	})
}
//删除商户
export function delCommercial(params) {
	return request({
		url: '/commercial/delete',
		method: 'post',
		data: params
	})
}