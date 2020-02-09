import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component:()=>import('../views/Main.vue'),
    children:[{
      name:'home',
      path:'/',
      component:()=>import('../views/Home.vue')
    },{
      name:'courses',
      path:'/courses/CoursesList',
      component:()=>import('../views/courses/CoursesList.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
