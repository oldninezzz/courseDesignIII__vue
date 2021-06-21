// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import Message from "element-ui/packages/message/src/main";
Vue.prototype.$message = Message
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.config.productionTip = false
Vue.use(ElementUI)

// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem("token")){
//       config.headers.token = localStorage.getItem("token");
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
