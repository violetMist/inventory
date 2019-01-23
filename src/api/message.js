import request from '@/utils/request'

export function getAll(params) {
	return request({
		url: '/message/getAll',
		method: 'get',
		params
	})
}