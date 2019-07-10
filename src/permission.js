import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken,getRootList,setRootList } from '@/utils/auth' // getToken from cookie
import { filterAsyncRouter } from '@/utils/routerListTo.js' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
debugger
router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      //如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done() 
    } else {
      //确定用户是否通过getInfo获得了他的权限角色
      if (store.getters.roles.length === 0 && !getRootList()) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const roles = res.data.role;
          setRootList(res.data.routs);
          routerGo(to, next,res.data.routs);
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})


function routerGo(to, next, getRouter) {
  
  const getRouter1 = filterAsyncRouter(getRouter); //过滤路由
  debugger
  console.log(router);
  router.addRoutes(getRouter1); //动态添加路由
  for(let i=0;i<getRouter1.length;i++){
    debugger
    router.options.routes.push(getRouter1[i])
  }
  console.log(router);
  next({ ...to, replace: true });

}

 

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

 

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));
}