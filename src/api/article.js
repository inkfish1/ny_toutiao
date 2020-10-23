// 文章请求相关的地址
import axios from 'axios'

export const getArticleLists = (authorization,page)=>{
  return axios ({
    methods: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles',
    headers: {
      Authorization: authorization
    },
    params: {
      page,
      pre_page:10
    },

  })
}
