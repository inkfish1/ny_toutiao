import request from '@/utils/request'
import axios from 'axios'

export const login = () => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/captchas/13922222222'
  })
}

// http://ttapi.research.itcast.cn/mp/v1_0/user/profile
export const getUserInfo = () => {
  return axios({
            methods: 'GET',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/profile',
            headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDM2MDE4MTIsInVzZXJfaWQiOjExNTcyODY5NjkyNjk1NTExMDQsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.Th2sD1ViOODwy1Oe-PzpJJsJjKfKdzrcdARLfAgupJw'
            }
         })
}
