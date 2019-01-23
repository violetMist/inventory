import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import _ from 'lodash'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
// import "@/mock" //模拟数据,发布版本可以取消
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', {
	value: moment
})

Vue.use(ElementUI, {
	locale
})

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})