import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/Blog/BlogDetails.vue'
import BlogEdit from '../views/Blog/BlogEdit.vue'
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
        path: '/layout',//根目录路由为/
        component: Layout,//指定使用Layout组件布局
        redirect: '/home',//重定向至/home页面
        children: [{//子菜单信息
            path: '/home',//路径
            name: 'home',
            component: () => import('@/adminViews/views/home'),//指定组件
            meta: {title: '首页', access: 0, affix: true}
        }]
    },
    {
        path: '/userConsole',
        component: Layout,
        children: [{
            path: "/userConsole/roles",
            name: 'roles',
            component: () => import('@/adminViews/views/user/roles'),
            meta: {title: '用户角色管理', access: 0}
        },
            {
                path: "/userConsole/auths",
                name: 'auths',
                component: () => import('@/adminViews/views/user/auths'),
                meta: {title: '用户权限管理', access: 0}
            },
            {
                path: "/userConsole/toMe",
                name: 'toMe',
                component: () => import('@/adminViews/views/user/selfCenter.vue'),
                meta: {title: '用户个人管理', access: 0}
            }]
    },
    {
        path: '/blogConsole',
        component: Layout,
        children: [{
            path: "/blogConsole/article",
            name: 'article',
            component: () => import('@/adminViews/views/blog/HomeArticle'),
            meta: {title: '用户文章管理', access: 0}
        },
            {
                path: "/blogConsole/comment",
                name: 'comment',
                component: () => import('@/adminViews/views/blog/comment'),
                meta: {title: '文章公告管理', access: 0}
            },
            {
                path: "/blogConsole/edit",
                name: 'edit',
                component: () => import('@/views/Blog/BlogEdit'),
                meta: {title: '文章编辑', access: 0}
            },
            {
                path: "/blogConsole/noticeEdit",
                name: 'edit',
                component: () => import('@/components/NoticeEdit'),
                meta: {title: '公告编辑', access: 0}
            }]
    },
    {
        path: '/pageConsole',
        component: Layout,
        children: [{
            path: "/pageConsole/aboutMe",
            name: 'aboutMe',
            component: () => import('@/adminViews/views/blog/aboutPage.vue'),
            meta: {title: '用户文章管理', access: 0}
        },
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
        redirect: {name: 'Blogs'}
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
    // {
    //     path: '/setting',
    //     name: 'Seeting',
    //     component: UserSeeting
    // },
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
        path: '/aboutPage',
        name: 'aboutPage',
        component: () => import('@/views/about/AboutPage'),
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




