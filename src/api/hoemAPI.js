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
// 文章不感兴趣
export const dislikeArticleAPI = id => request({
  method:'post',
  url:'/v1_0/article/dislikes',
  data:{
    target: id
  }
})
//举报文章API
export const reportArticleAPI = (target,type) => request({
  method:'post',
  url:'/v1_0/article/reports',
  data:{
    target,
    type
  }
})