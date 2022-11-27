import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/Blog/BlogDetails.vue'
import BlogEdit from '../views/Blog/BlogEdit.vue'
import UserSeeting from '../views/setting/UserSetting'
import Man from '../views/setting/Manager'
import Register from "../views/Register"
import Index from '@/views/User/Index'
import adminLogin from '@/adminViews/login'

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' }
  },
  {
    path: '/admin',
    name: 'adminLogin',
    component: adminLogin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/Blog/Blogs.vue')
  },
  {
    path: '/setting',
    name: 'Seeting',
    component: UserSeeting
  },
  {
    path: '/man',
    name: 'Man',
    component: Man
  },
  {
    path: '/index',
    name: 'userIndex',
    component: Index
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
export default router
