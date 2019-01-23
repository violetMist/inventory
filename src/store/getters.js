const getters = {
	sidebar: state => state.app.sidebar,
	device: state => state.app.device,
	visitedViews: state => state.tagsView.visitedViews,
	cachedViews: state => state.tagsView.cachedViews,
	token: state => state.user.token,
	name: state => state.user.name,
	roles: state => state.user.roles,
	systemRoles: state => state.util.systemRoles,
	bearingType: state => state.util.bearingType,
	commercialType: state => state.util.commercialType,
	permission_routers: state => state.permission.routers,
	addRouters: state => state.permission.addRouters
}
export default getters