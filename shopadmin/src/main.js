import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './plugins/element.js'
// import axios from '@/plugins/axios'
import VueQuillEditor from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  Vue.use(VueQuillEditor);
Vue.config.productionTip = false
// Vue.prototype.$axios=axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
