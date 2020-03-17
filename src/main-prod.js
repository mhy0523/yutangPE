// import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';
axios.defaults.baseURL = 'http://www.yutang.online/public/index.php/api/';
Vue.prototype.$http = axios;

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import "amfe-flexible";
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

Vue.config.productionTip = false

// 路由请求拦截器 
axios.interceptors.request.use(
  config => {
    NProgress.start()
     let token = sessionStorage.getItem("token");
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = 'Bearer '+token;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

  axios.interceptors.response.use(config =>{
    //当进入response拦截器，表示请求已经结束，我们就结束进度条
    NProgress.done()
    return config
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

console.log('prod');


