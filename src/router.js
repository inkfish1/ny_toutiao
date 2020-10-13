import Vue from 'vue'
import Router from 'vue-router'
// 在vuecli创建的项目中@表示src目录，它是src目录的路径别名，好处不受当前文件路径影响
// import Login from '@/view/login'   
import Login from './views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/login',name:'login',component:Login}
  ]
})
