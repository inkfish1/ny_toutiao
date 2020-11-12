import axios from 'axios'

export const login = () => {
  return axios({
    method: 'GET',
    url: 'http://api-toutiao-web.itheima.net/mp/v1_0/captchas/13911111111',
  })
}

// http://ttapi.research.itcast.cn/mp/v1_0/user/profile
export const getUserInfo = () => {
  return axios({
    methods: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
    }
  })
}

//用于更新个人头像接口
export const updataPhoto = (data) =>{
  return axios ({
    method: 'PATCH',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/photo',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzU5MDM3MDcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.4wW-rjS7HLN_-ED84t7ckdMfWskWTuQnz52JSQDrEz4'
    },
    data
  })
} 