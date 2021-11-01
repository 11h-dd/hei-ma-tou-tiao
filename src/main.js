import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vant,{Lazyload} from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
 import '@/index.less'
 import dayjs from 'dayjs'
 import relativeTime from 'dayjs/plugin/relativeTime'
 import zh from 'dayjs/locale/zh-cn'
// import VueRouter from 'vue-router'
 dayjs.extend(relativeTime)
 dayjs.locale(zh)
 Vue.filter('dateFormat',dt => dayjs().to(dt))
//  import initState from './store/hei's


Vue.use(Vant)
Vue.use(Lazyload)
//关掉控制台中的 '请使用production版本的vue提示'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

