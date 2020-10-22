// 文章请求相关的地址
import axios from 'axios'

export const getArticleLists = (authorization)=>{
  return axios ({
    methods: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles?page=1&per_page=20',
    headers: {
      Authorization: authorization
    }
  })
}
