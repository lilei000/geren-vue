// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios/request.js'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.prototype.$ajax = axios//设置全局

Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
 if (to.path == '/'){ // 判断该路由是否需要登录权限
	 next();
 }
 else {
     if (localStorage.getItem("token")) { // 判断当前的token是否存在
	  next();
	 }
	 else {
		  next({path: '/'})
	 }
 }
});