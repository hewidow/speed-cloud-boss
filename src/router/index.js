import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import File from '../components/filemanage/file.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/users',
    children:[
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path:'/users',
        component: Users
      },
      {
        path:'/roles',
        component: Roles
      },
      {
        path:'/rights',
        component: Rights
      },
      {
        path:'/file',
        component: File
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   // to   将要访问的路径
//   // from 代表从按个路径跳转而来
//   // next 是一个函数, 表示放行
//   //      next() 放行  next('/login') 强行跳转
//   if (to.path === '/login') {
//     return next()
//   }
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   }
//   next()
// })

export default router
