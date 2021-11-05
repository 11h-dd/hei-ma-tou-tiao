//导入请求数据的request模块
import request from '../utils/request'

// 请求用户频道列表数据的 API
export const getUserChannelAPI = () => {
    return request.get('/v1_0/user/channels')
  }

export const getArticleListAPI = (Id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: Id, // 频道的 Id
      timestamp: time // 时间戳
    }
  })
}

//将文章设置为不感兴趣（形参id是文章的id）
export const dislikeArticleAPI =(id)=> {
  return request.post('/v1_0/article/dislikes',{
    target:id
  })
}

// 举报文章的 API
export const reportsArticle = (id, type) => {
  return request.post('/v1_0/article/reports', {
    target:id, // 文章的 Id
    type:type // 举报的类型
  })
}

// 获取所有频道数据的 API
export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}

// 更新用户频道列表数据的 API
// 注意：形参 channels 是一个数组，格式： [ {id, seq} ]
export const updateUserChannelAPI = channels => {
  return request.put('/v1_0/user/channels', {
    channels
  })
}