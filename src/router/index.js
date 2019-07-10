import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue'

Vue.use(Router)

import Login from '@/views/login/index.vue'
import Vue404 from '@/views/404.vue'
/* Layout */
import Layout from '@/views/layout/Layout.vue'

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Vue404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'example' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/items',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Items',
        component: () => import('@/views/items/index'),
        meta: { title: '项目列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/section1',
    component: Layout,
    redirect: '/year20191',
    name: 'Section',
    meta: { title: '技术一部', icon: 'example' },
    children: [
      {
        path: 'year20191',
        name: 'Year20191',
        component: () => import('@/views/section/index'),
        meta: { title: '2019' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList1',
                itemId : "001",
                hidden: true,
                meta: { title: '项目列表' }
              }
            ]
      },
      {
        path: 'year20181',
        name: 'Year20181',
        component: () => import('@/views/section/'),
        meta: { title: '2018' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList2',
                hidden: true,
                meta: { title: '项目列表' }
              }
            ]
      },
      {
        path: 'yearList1',
        name: 'YearList1',
        component: () => import('@/views/section/'),
        meta: { title: '更早' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList3',
                hidden: true,
                meta: { title: '项目列表' }
              }
            ]
      },
      {
        path: 'hardware1/:num',
        name: 'Hardware1',
        component: () => import('@/views/section/itemsList'),
        meta: { title: '硬件产品' },
        children: [
              {
                path: 'hardwareList1/:num',
                component: () => import('@/views/section/itemsList'),
                name: 'HardwareList1',
                hidden: true,
                meta: { title: '硬件产品' }
              }
            ]
      }
    ]
  },
  {
    path: '/section2',
    component: Layout,
    redirect: '/section2',
    name: 'Section2',
    meta: { title: '技术二部', icon: 'example' },
    children: [
      {
        path: 'year20192',
        name: 'Year20192',
        component: () => import('@/views/section/index'),
        meta: { title: '2019' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList4',
                itemId : "001",
                 hidden: true,
                meta: { title: '项目列表' }
              }
            ]
      },
      {
        path: 'year20182',
        name: 'Year20182',
        component: () => import('@/views/section/'),
        meta: { title: '2018' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList5',
                 hidden: true,
                meta: { title: '项目列表' }
              }
            ]
      },
      {
        path: 'yearList2',
        name: 'YearList2',
        component: () => import('@/views/section/'),
        meta: { title: '更早' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList6',
                hidden: true,
                meta: { title: '项目列表' }
              }
            ]
      },
      {
        path: 'hardware2/:num',
        name: 'Hardware2',
        component: () => import('@/views/section/itemsList'),
        meta: { title: '硬件产品' },
        children: [
              {
                path: 'itemsList2/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'HardwareList2',
                hidden: true,
                meta: { title: '硬件产品' }
              }
            ]
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'tree' }
      },
      {
        path: 'data',
        name: 'Data',
        component: () => import('@/views/system/data'),
        meta: { title: '数据字段管理', icon: 'tree' }
      }
    ]
  },
  
  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const itemsTest = {
    path: '/section',
    component: Layout,
    redirect: '/section',
    name: 'Section',
    meta: { title: '技术一部', icon: 'example' },
    children: [
      {
        path: 'year2019',
        name: 'Year2019',
        component: () => import('@/views/section/index'),
        meta: { title: '2019' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList',
                itemId : "001",
                meta: { title: 'XX纪委项目' }
              },
              {
                path: 'itemsList1/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList',
                itemId : "002",
                meta: { title: 'XX检察院项目' }
              }
            ]
      },
      {
        path: 'year2018',
        name: 'Year2018',
        component: () => import('@/views/section/'),
        meta: { title: '2018' },
        children: [
              {
                path: 'itemsList/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList',
                itemId : "003",
                meta: { title: 'XX纪委项目' }
              },
              {
                path: 'itemsList1/:item',
                component: () => import('@/views/section/itemsList'),
                name: 'ItemsList',
                itemId : "004",
                meta: { title: 'XX检察院项目' }
              }
            ]
      }
    ]
  } 
  
  
 /* {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '例子', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '树形列表', icon: 'tree' }
      }
    ]
  },
  
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
      
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }, */