import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/main/main.vue'

Vue.use(VueRouter)
const routes = [{ path: '/login', component: () => import('@/views/login/login.vue'), name: 'login' },  // 登录的路由规则
// 主页的路由规则
{ path: '/', component: Main }]

export default new VueRouter({
    routes
})
