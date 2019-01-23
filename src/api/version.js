import request from '@/utils/request'

//获取型号列表
export function getList(params) {
	return request({
		url: '/version/getList',
		method: 'get',
		params: params
	})
}

//获取单个型号信息
export function viewVersion(id) {
	return request({
		url: '/version/view',
		method: 'get',
		params: {
			id
		}
	})
}
//添加型号
export function addVersion(params) {
	return request({
		url: '/version/add',
		method: 'post',
		data: params
	})
}
//编辑型号
export function editVersion(params) {
	return request({
		url: '/version/edit',
		method: 'post',
		data: params
	})
}
//删除型号
export function delVersion(params) {
	return request({
		url: '/version/delete',
		method: 'post',
		data: params
	})
}