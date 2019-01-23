import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () =>
      import ('@/views/redirect/index')
  }]
}, {
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () =>
    import ('@/views/404'),
  hidden: true
}, {
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    component: () =>
      import ('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'ios-apps',
      noCache: true
    }
  }]
}]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/version',
  component: Layout,
  meta: {
    roles: [11]
  },
  children: [{
    path: 'index',
    name: 'Version',
    component: () =>
      import ('@/views/version/index'),
    meta: {
      title: '型号管理',
      icon: 'chart'
    }
  }]
}, {
  path: '/brand',
  component: Layout,
  meta: {
    roles: [21]
  },
  children: [{
    path: 'index',
    name: 'Brand',
    component: () =>
      import ('@/views/brand/index'),
    meta: {
      title: '品牌管理',
      icon: 'ios-flash'
    }
  }]
}, {
  path: '/commercial',
  component: Layout,
  meta: {
    roles: [31]
  },
  children: [{
    path: 'index',
    name: 'Property',
    component: () =>
      import ('@/views/commercial/index'),
    meta: {
      title: '商户管理',
      icon: 'chart'
    }
  }]
}, {
  path: '/store',
  component: Layout,
  redirect: '/store/inventory',
  meta: {
    title: '库存管理',
    icon: 'ios-copy',
    roles: [4, 51, 61]
  },
  children: [{
    path: 'inventory',
    name: 'Inventory',
    component: () =>
      import ('@/views/inventory/index'),
    meta: {
      roles: [4],
      title: '库存列表',
      icon: 'ios-flash'
    }
  }, {
    path: 'payOrder',
    name: 'PayOrder',
    component: () =>
      import ('@/views/payOrder/index'),
    meta: {
      roles: [51],
      title: '入库管理',
      icon: 'ios-flash'
    }
  }, {
    path: 'inStore',
    name: 'InStore',
    hidden: true,
    component: () =>
      import ('@/views/inStore/index'),
    meta: {
      roles: [51],
      title: '入库订单🔎'
    }
  }, {
    path: 'sellOrder',
    name: 'SellOrder',
    component: () =>
      import ('@/views/sellOrder/index'),
    meta: {
      roles: [61],
      title: '出库管理',
      icon: 'ios-water'
    }
  }, {
    path: 'outStore',
    name: 'OutStore',
    hidden: true,
    component: () =>
      import ('@/views/outStore/index'),
    meta: {
      roles: [61],
      title: '出库订单🔎'
    }
  }]
}, {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'ios-settings',
    roles: [71, 81]
  },
  children: [{
    path: 'user',
    name: 'User',
    component: () =>
      import ('@/views/user/index'),
    meta: {
      title: '用户管理',
      icon: 'peoples',
      roles: [71]
    }
  }, {
    path: 'store',
    name: 'Store',
    component: () =>
      import ('@/views/store/index'),
    meta: {
      title: '仓库管理',
      icon: 'table',
      roles: [81]
    }
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]