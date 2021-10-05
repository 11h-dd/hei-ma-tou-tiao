import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
 import '@/index.less'

Vue.use(Vant)
//关掉控制台中的 '请使用production版本的vue提示'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')