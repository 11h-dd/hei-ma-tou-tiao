import Vue from 'vue'
import VueRouter from 'vue-router'
//导入需要的路由组件
import Login from '../views/Login'
//导入Main.vue页面组件
import Main from '../views/Main'
//导入Home.vue页面组件
import Home from '../views/Home'
//导入User.vue页面组件
import User from '../views/User'
//导入
import Search from '../views/Search'
// 导入搜索结果页
import SearchResult from '../views/SearchResult.vue'
// 导入文章详情组件
import ArticleDetail from '../views/ArticleDetail.vue'

import UserEdit from '../views/UserEdit.vue'
Vue.use(VueRouter)

//清空路由规则
const routes = [
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/',
        component: Main,
        // 为什么要删除还有子路由的父路由的名字
        // 含有子路由的路由 有默认的路由，不能加命名路由
        // name: 'main'
        children: [
            {
                path: '/',
                component: Home,
                name: 'Home'
            },
            {
                path: '/user',
                component: User,
                name: 'user'
            },
            {
                path: '/Search',
                component: Search,
                name: 'Search'
            },
            // 搜索结果页
            {
                path: '/search/:kw',
                component: SearchResult,
                name: 'search-result',
                props: true
            },
            // 文章详情的路由规则
            {
                path: '/article/:id',
                component: ArticleDetail,
                name: 'art-detail',
                props: true
            },
            // 编辑用户资料的路由规则
            {
                path: '/user/edit',
                component: UserEdit,
                name: 'user-edit'
            }
        ]
    },

]

const router = new VueRouter({
    routes

})

export default router