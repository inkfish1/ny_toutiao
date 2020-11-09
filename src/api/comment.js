import axios from 'axios'

// 控制评论的开关
export const handleComment = ( id, status ) => {
  return axios ({
            method: 'PUT',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/comments/status',
            headers: {
              Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDM2MDE4MTIsInVzZXJfaWQiOjExNTcyODY5NjkyNjk1NTExMDQsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.Th2sD1ViOODwy1Oe-PzpJJsJjKfKdzrcdARLfAgupJw'
            },
            params: {
              article_id: id.toString()
            },
            data: {
              allow_comment: status
            }
        })
}
