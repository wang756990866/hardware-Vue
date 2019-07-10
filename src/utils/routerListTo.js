function _import(process){
  return require.context('@', true, /\.vue$/)(`./${process}.vue`);//获取组件的方法
}  

import Layout from '@/views/layout/Layout' //Layout 是架构组件，不在后台返回，在文件里单独引入

 

export function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象

  const accessedRouters = asyncRouterMap.filter(route => {
    
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
        //route.component = () => dynamicRouterMap[route.component]
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

const dynamicRouterMap = {
  'section/index.vue': () => import('@/views/section/index.vue'),
  'nested/menu1/index': () => import('@/views/nested/menu1/index.vue'),
  'nested/menu2/index': () => import('@/views/nested/menu2/index.vue')
}