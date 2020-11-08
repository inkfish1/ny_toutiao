import Vue from 'vue'
import Router from 'vue-router'
// 在vuecli创建的项目中@表示src目录，它是src目录的路径别名，好处不受当前文件路径影响
// import Login from '@/view/login'
import Login from './views/login/'
import Layout from './views/layout'
import Nprogress from 'nprogress'
import Home from './views/home/'
import Article from './views/article'
import Publish from './views/publish'
import Material from './views/material'
Vue.use(Router)

const router= new Router({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'layout', component: Layout,
    children:[
      { path: '', name: 'home', component: Home },
      { path: '/article', name: 'article', component: Article},
      { path: '/publish', name: 'publish', component: Publish},
      { path: '/image', name: 'material', component: Material}
    ] }
  ]
})

// 路由前置钩子
router.beforeEach((to, from, next) =>{
  Nprogress.start()
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

// 路由后置钩子
router.afterEach((to,from) => {
  Nprogress.done()
})



export default router
