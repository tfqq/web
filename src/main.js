import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入公共样式
import './assets/css/main.css'
import './utils/flexible'
import bus from './utils/bus'
Vue.prototype.$bus = bus
import './element'
import metaInfo from "vue-meta-info";
Vue.use(metaInfo);
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)  
  next();
})