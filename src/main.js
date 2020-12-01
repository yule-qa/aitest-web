// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {Notification} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$notify=Notification
Vue.prototype.$api = api       // 将api对象，放入Vue的$api 这个属性里
Vue.config.productionTip = false
Vue.use(Vuetify)     //这里声明用什么组件

/* eslint-disable no-new */
new Vue({             //new 出一个Vue 对象 ，这里开始了vue的生命周期
  el: '#app',         
  router,             //引入路由
  vuetify : new Vuetify(),  //实例化组件
  components: { App },    //App.vue
  template: '<App/>'
})
