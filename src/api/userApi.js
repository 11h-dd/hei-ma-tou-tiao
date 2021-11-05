import request from '../utils/request'
import Axios from 'axios'
//登录的API接口
export const loginAPI = (data) => {
    return request.post('/v1_0/authorizations', data)
}

// 请求用户基本信息的 API
export const getUserInfoAPI=()=>{
    return request.get('/v1_0/user')

}

export const exChangeToken = (refreshToken) => {
    return Axios({
      method: 'PUT',
      url: 'http://geek.itheima.net/v1_0/authorizations',
      headers: {
        // 在请求头中携带 Authorization 身份认证字段
        Authorization: 'Bearer ' + refreshToken
      }
    })
  }

  
  /**
   * 请求用户简介信息
   * @returns
   */
  export const getUserProfileAPI = () => {
    return request.get('/v1_0/user/profile')
  }