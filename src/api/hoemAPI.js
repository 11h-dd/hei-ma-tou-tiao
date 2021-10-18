import request from '@/untils/request'
//l列表
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}
//列表内容
export const getArticleListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id,
      timestamp: time
    }
  })
}