import axios from 'axios'
import { Toast } from 'vant'
// 1. 导入vuex的store文件
import store from '../store'
import router from '../router'
import { exChangeToken } from '../api/userAPI'
// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: 'http://geek.itheima.net'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('请求拦截器')
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁用背景点击
    duration: 0 // 持续展示 toast
  })

  // 2.从store中获取曾经登录的时候存到store中的token(令牌 票)
  const tokenStr = store.state.tokenInfo.token
  // console.log(tokenStr)
  // 3.判断，到底vuex的store中有没有token，如果有，那么把token放到请求头中，如果没有，则不管
  if (tokenStr) {
    config.headers.Authorization = 'Bearer ' + tokenStr

    // console.log(config)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对正常响应数据做点什么
  Toast.clear()
  return response
}, async (error) => {
  // 对错误响应数据做点什么
  Toast.clear()
  // 获取 tokenInfo
  const tokenInfo = store.state.tokenInfo
  // 1.监听 Token 过期的情况
  if (error.response && error.response.status === 401) {
    try {
      // 尝试这么干 但是最后发现失败了怎么办 跳到catch里面继续寻找解决方案
      const { data: res } = await exChangeToken(tokenInfo.refresh_token)
      console.log('失效', res)
      // 更新 Store 中的 Token
      // {"tokenInfo":{"token":"a3b4db4d-c7a2-4eeb-9109-9bf3d008f851","refresh_token":"b4971a15-9dca-441b-af37-5ff24c180342"}}
      store.commit('updateTokenInfo', { token: res.data.token })
      // 3.3 重新调用刚才“请求未遂”的接口
      // 3.3.1 如果在响应拦截器中 return 一个新的 Promise 异步请求，则会把这次请求的结果，当作上次请求的返回值
      return instance(error.config)
    } catch {
      // 清空 state里面存的所有数据
      store.commit('cleanTokenInfo')
      // 强制跳转到登录页面
      router.replace('/login?url=' + router.currentRoute.fullPath)
    }
  }

  return Promise.reject(error)
})

export default instance
