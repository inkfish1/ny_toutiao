import request from '@/utils/request'

export const login = () => {
  return request({
    methods:'POST',
    url:'/mp/v1_0/captchas/13911111111'
  })
}
