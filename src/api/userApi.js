import request from '@/untils/request'

// 登录的 API 接口
export const loginAPI = data => request.post('/v1_0/authorizations', data)

