import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store"
import axios from 'axios'
import qs from "qs"
//import "../static/LodopFuncs"

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://47.104.128.231:8080/crm';
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.common["token"]=localStorage.getItem("token")
    if(config.method === "post"){
    	config.data=qs.stringify(config.data);
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
