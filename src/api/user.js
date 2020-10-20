import request from '@/utils/request'
import axios from 'axios'

export const login = () => {
  return request({
    methods: 'POST',
    url: '/mp/v1_0/captchas/13911111111'
  })
}

export const getUserInfo = () => {
  return axios({
            methods: 'GET',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/profile',
            headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQ2MDI5NDIsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.mfO1Pydg0SKKqqBscFtt6-EdNlzEAhd3urCI9AtRiA0'
            }
         })
}
