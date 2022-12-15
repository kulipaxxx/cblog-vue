import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
//撑满全屏
import './styles/all.css'
//引入Bootstrap
// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue)

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

//引入markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引入bootstrap
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "element-ui/lib/theme-chalk/index.css"
import locale from 'element-ui/lib/locale/lang/zh-CN'
//引入axios前置后置拦截
import request from "./utils/request.js"

//引入权限拦截
import "./store/modules/permission.js"

Vue.use(Element,{locale})
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
