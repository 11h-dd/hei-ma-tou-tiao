import axios from 'axios'
import { Toast } from 'vant'
import store from '../store/hei'


 const instance =  axios.create({
    // 请求根路径
    baseURL: 'http://www.liulongbin.top:8000'
  })
  export default instance
  // 调用 axios.create() 方法，创建 axios 的实例对象
  instance.interceptors.request.use(
  config => {
    // 展示 loading 效果
    Toast.loading({
      message: '加载中...', // 文本内容
      forbidClick:true,
      duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    const tokenStr = store.state.tokenInfo.token
    console.log(tokenStr)
    if (tokenStr) {
      // 只有 tokenStr 的值存在，才有必要挂载到请求头的 Authorization 属性中
      config.headers.Authorization = 'Bearer ' + tokenStr
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么 
    Toast.clear()
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

  
