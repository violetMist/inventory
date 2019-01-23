const util = {
	state: {
		systemRoles: [], //权限
		bearingType: [], //轴承类型
		commercialType: [] //商户类型
	},
	mutations: {
		SET_SYSTEMROLES(state, systemRoles) {
			state.systemRoles = systemRoles
		},
		SET_BEARINGTYPE(state, bearingType) {
			state.bearingType = bearingType
		},
		SET_COMMERCIALTYPE(state, commercialType) {
			state.commercialType = commercialType
		}
	},
	actions: {
		//初始化
		GenerateUtil({
			commit
		}, res) {
			return new Promise(resolve => {
				const {
					systemRoles,
					bearingType,
					commercialType
				} = res.data
				commit('SET_SYSTEMROLES', systemRoles)
				commit('SET_BEARINGTYPE', bearingType)
				commit('SET_COMMERCIALTYPE', commercialType)
				resolve(res)
			})
		}
	}
}

export default util