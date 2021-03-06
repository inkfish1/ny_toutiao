import axios from 'axios'
//富文本编辑器上传图片接口

export const upLoadImage = (data) => {
  return axios ({
    method: 'POST',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/images',
    headers: {
      Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
    },
    // 一般文件上传的接口要求把请求头中的Content-type设置为multipart/form-data,但是我们使用axios时不需要手动设置
    // 只要给data一个Formdata对象即可
    data
  })
}

// 获取素材图片
// http://ttapi.research.itcast.cn/mp/v1_0/user/images
export const getImage = (currentpage, pageszie, collect = false) => {
  return axios ({
    method: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/images',
    headers: {
       Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
    },
    params: {
      collect,
      page: currentpage,
      per_page: pageszie
    }
  })
}

// 删除图片接口
export const deletImageMaterial = (id) => {
  return axios({
    method: 'DELETE',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/images/'+id,
    headers: {
       Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
    }
  })
}

// 收藏图片接口
export const collectImageMaterial = ( status, id ) => {
  return  axios ({
            method: 'PUT',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/images/'+id,
            headers: {
              Authorization :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
            },
            data: {
              collect: status
            }
          })
}
