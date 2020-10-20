import Vue from 'vue'
import Router from 'vue-router'
// 在vuecli创建的项目中@表示src目录，它是src目录的路径别名，好处不受当前文件路径影响
// import Login from '@/view/login'
import Login from './views/login/'
// import Home from './views/home/'
import Layout from './views/layout'

Vue.use(Router)

const router= new Router({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Layout }
  ]
})


router.beforeEach((to, from, next) =>{
  //路由导航守卫
  const message = JSON.parse(window.localStorage.getItem('message'))
  if (to.path !=='/login') {
    if (message) {
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router
