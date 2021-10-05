import axios from 'axios'
// 调用 axios.create() 方法，创建 axios 的实例对象
export default axios.create({
    // 请求根路径
    baseURL: 'http://www.liulongbin.top:8000'
  })
  
