import request from '@/utils/request'

//获取品牌列表
export function getList(params) {
	return request({
		url: '/brand/getList',
		method: 'get',
		params: params
	})
}

//获取单个品牌信息
export function viewBrand(id) {
	return request({
		url: '/brand/view',
		method: 'get',
		params: {
			id
		}
	})
}
//添加品牌
export function addBrand(params) {
	return request({
		url: '/brand/add',
		method: 'post',
		data: params
	})
}
//编辑品牌
export function editBrand(params) {
	return request({
		url: '/brand/edit',
		method: 'post',
		data: params
	})
}
//删除品牌
export function delBrand(params) {
	return request({
		url: '/brand/delete',
		method: 'post',
		data: params
	})
}