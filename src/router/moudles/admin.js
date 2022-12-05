import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/adminViews/layout'

export const routes = [  //这里需要导出，vuex那需要获取
  {
    path: '/',
    component: Layout,
    name: '主页'
    // component: () => import('@/views/home/index')
  },
  {
    path: '/dog',
    component: Layout,
    name: '狗子世界',
    // component: () => import('@/views/home/index')
    children: [
      {
        path: '/erha',
        name: '哈士奇',
        component: () => import('@/views/test')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
