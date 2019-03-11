import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import './plugins/element.js'
Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
