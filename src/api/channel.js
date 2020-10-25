// 用来获取频道列表接口
import axios from 'axios'

export const getChannelLists = (authorization) => {
  return axios ({
    method:'GET',
    url:'http://ttapi.research.itcast.cn/mp/v1_0/channels',
    headers:{
      Authorization: authorization
    }
  })
}
