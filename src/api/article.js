import axios from 'axios'
import JSONBig from 'json-bigint'
// 文章请求相关的地址
export const getArticleLists = (authorization,page,status,channel,date,responseType)=>{
  return axios ({
    method: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles',
    headers: {
      Authorization: authorization
    },
    params: {
      begin_pubdate: date ? date[0] : null,
      end_pubdate: date ? date[1] : null,
      channel_id:channel,
      status,
      page,
      pre_page: 10,
      response_type:responseType
    },
    // 因为获取的id值超过了int最大表示值,所以需要用bigint
    transformResponse: [function (data) {
      try{
        return JSONBig.parse(data)
      }catch(e){
        //TODO handle the exception
        console.log('转化失败',e)
        return data
      }

    }]

  })
}

// 删除文章访问接口
// http://ttapi.research.itcast.cn/mp/v1_0/articles/1320042621707485184
// http://ttapi.research.itcast.cn/mp/v1_0/articles/1319513134213365760
export const deletArticle = (id) => {
  return axios ({
    method: 'DELETE',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles/'+id,
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDM2MDE4MTIsInVzZXJfaWQiOjExNTcyODY5NjkyNjk1NTExMDQsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.Th2sD1ViOODwy1Oe-PzpJJsJjKfKdzrcdARLfAgupJw'
    }
  })
}
