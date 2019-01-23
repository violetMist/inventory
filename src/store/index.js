import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import util from './modules/util'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		permission,
		tagsView,
		util,
		user
	},
	getters
})

export default store