import axios from 'axios'

//发布文章接口

export const publishArticle = ( data , authorization , draft ) => {
  return axios ({
    method: 'POST',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles',
    headers: {
      Authorization: authorization
    },
    params: {
      draft:draft
    },
    data:data
  })
}

//获取文章详情接口
export const getArticle = (authorization , id) => {
  return axios ({
    method: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles/'+id,
    headers: {
      Authorization: authorization
    }
  })
}

//修改文章接口
export const updateArticle = ( id , data , authorization , draft ) => {
  return axios ({
    method: 'PUT',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles/'+id,
    params: {
      draft:draft
    },
    headers: {
      Authorization:authorization
    },
    data:data
  })
}
