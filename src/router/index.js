import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/provide/user',
    component: Layout,
    meta: { title: 'api用户', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/provide/user/index'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'relation',
        component: () => import('@/views/provide/user/relation/index'),
        meta: { title: '用户拥有接口', icon: 'user' }
      },
      {
        path: 'dispatchApi',
        component: () => import('@/views/provide/user/dispatch/index'),
        meta: { title: '分配接口', icon: 'user' }
      }
    ]
  },
  {
    path: '/provide/api',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/provide/api/index'),
        meta: { title: 'api信息', icon: 'tree' }
      }
    ]
  },
  {
    path: '/provide/statistics',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/provide/statistics/index'),
        meta: { title: 'api统计', icon: 'table' }
      }
    ]
  },
  {
    path: '/web/user',
    component: Layout,
    meta: { title: 'web用户', icon: 'user' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/web/user/index'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'authBook',
        component: () => import('@/views/web/authBook/index'),
        meta: { title: '查看授权', icon: 'user' }
      }
    ]
  },
  {
    path: '/utils',
    component: Layout,
    meta: { title: '工具', icon: 'el-icon-box' },
    children: [
      {
        path: 'finance',
        component: () => import('@/views/utils/finance/index'),
        meta: { title: '财务数据', icon: 'el-icon-money' }
      },
      {
        path: 'transmission',
        component: () => import('@/views/utils/transmission/index'),
        meta: { title: '文件传输', icon: 'el-icon-folder' }
      },
      {
        path: 'invoice',
        component: () => import('@/views/utils/invoice/index'),
        meta: { title: '发票授权', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'zhaotoubiao',
        component: () => import('@/views/utils/zhaotoubiao/index'),
        meta: { title: '会客招投标', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/log/index'),
        meta: { title: '日志查询', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
