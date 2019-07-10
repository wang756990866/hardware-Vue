// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import App from './App'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import 'es6-promise/auto'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import '@/styles/index.scss' // global css
import '@/permission' // permission control
import '@/icons' // icon
import store from './store'

Vue.config.productionTip = false//阻止 vue 在启动时生成生产提示。
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
