import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueSwal from 'vue-swal'

Vue.config.productionTip = false
Vue.use(VueSwal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
