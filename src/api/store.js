import request from '@/utils/request'

//获取仓库列表
export function getList(params) {
	return request({
		url: '/store/getList',
		method: 'get',
		params: params
	})
}

//获取单个仓库信息
export function viewStore(id) {
	return request({
		url: '/store/view',
		method: 'get',
		params: {
			id
		}
	})
}
//添加仓库
export function addStore(params) {
	return request({
		url: '/store/add',
		method: 'post',
		data: params
	})
}
//编辑仓库
export function editStore(params) {
	return request({
		url: '/store/edit',
		method: 'post',
		data: params
	})
}
//删除仓库
export function delStore(params) {
	return request({
		url: '/store/delete',
		method: 'post',
		data: params
	})
}