import request from '@/untils/request'
export const getUserChannelAPI = () => {
    return request.get('/v1_0/user/channels')
  }
  export const getArticleListAPI = (id,time) => {
    return request.get('/v1_0/articles',{
      params:{
        channel_id:id,
        timestamp:time
      }
    })
  }