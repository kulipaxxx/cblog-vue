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
import getPwd from '@/views/getPwd'
import archivePage from '@/views/file/archivePage'
import test from '@/views/test'
/* Layout */
import Layout from '@/adminViews/layout'

Vue.use(VueRouter);
export const routes = [
    //  后台路径
    {
        path: '/404',
        name: 'NotFound',
        meta: {
            title: 'Page not found',
            isLogin: false
        },
        component: () => import('@/adminViews/404.vue')
    },
    // 所有未定义路由，全部重定向到404页
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/admin',
        name: 'adminLogin',
        component: adminLogin
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout
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
                component: () => import('@/adminViews/404.vue')
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: test
    },
    //前台路径
    {
        path: '/',
        name: 'Index',
        redirect: { name: 'Blogs' }
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
        path: '/getPwd',
        name: 'findPwd',
        component: getPwd
    },
    {
        path: '/archivePage',
        name: 'archivePage',
        component: archivePage
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
    routes: routes
});
export default router




