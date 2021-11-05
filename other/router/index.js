import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/main/main.vue'
import home from '@/views/home/home.vue'
import user from '@/views/user/user.vue'

Vue.use(VueRouter)
const routes = [{ path: '/login', component: () => import('@/views/login/login.vue'), name: 'login' },  // 登录的路由规则
// 主页的路由规则
{ path: '/', component: Main,children:[
    { path: '', component: home, name: 'home' },
    { path: '/user', component: user, name: 'user',children:[
       { path:'/user',component:()=>import('../views/login/login.vue'),props:true}
    ]}
] }]

export default new VueRouter({
    routes
})
