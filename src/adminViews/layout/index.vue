<template>
    <div class="layout">
        <div class="left-container" :style="{width: status.isCollapsed?'64px':'200px'}">
            <div class="logo-wrapper">
                <img style="width:50px;height:50px;" src="../../assets/logo.gif"/>
            </div>
            <div class="menu-wrapper">
                <el-menu
                        text-color="#000000"
                        active-text-color="#ffffff"
                        router
                        unique-opened
                        :collapse="status.isCollapsed"
                        :default-active="$route.path"
                >
                    <template v-for="(menu, index) in menu_list">
                        <el-menu-item class="menu-item" v-if="!menu.children" :index="menu.path" :key="index">
                            <i :class="menu.icon" style="font-size:24px;"></i>
                            <span slot="title">
                                {{menu.title}}
                            </span>
                        </el-menu-item>
                        <el-submenu v-else :index="menu.path">
                            <template slot="title">
                                <i :class="menu.icon" style="font-size:24px;"></i>
                                <span slot="title">
                                    {{menu.title}}
                                </span>
                            </template>
                            <el-menu-item
                                    class="menu-item"
                                    v-for="(subMenu, subIndex) in menu.children"
                                    :index="subMenu.path"
                                    :key="subIndex"
                            >
                                <span slot="title" style="margin-left:13px;">
                                    {{subMenu.title}}
                                </span>
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            </div>
        </div>
        <div class="topbar-container" :style="{left: this.status.isCollapsed?'64px':'200px'}">
            <div class="el-button el-button--default el-button--small" @click="collapsed"
                 style="float: left;margin-top: 5px">
                <i id="collapsedIcon" class="el-icon-s-fold"></i>
            </div>
            <div class="el-button el-button--default el-button--small" @click="refresh"
                 style="float:left;margin-top: 5px;margin-left: 10px">
                <i class="el-icon-refresh"></i>
            </div>
            <el-dropdown class="avatar">
                <span class="el-dropdown-link">
                    <el-avatar :size="48" :src="user.avatar"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 100px;margin-right: -20px;text-align: center;">
                    <el-dropdown-item>
                        <el-link @click="logout">退出</el-link>
                    </el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
        </div>
        <div class="content-container" :style="{left: this.status.isCollapsed?'64px':'200px'}">
            <div class="content" style="height: 100%;">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import {logout} from "../../api/reception/login";
    import $ from 'jquery'

    export default {
        data() {
            return {
                hasLogin: false,
                user: {
                    username: '请先登录',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                menu_list: [
                    {
                        path: "/home",
                        title: "首页",
                        icon: "el-icon-s-home"
                    },
                    {
                        path: "/userConsole",
                        title: "用户管理",
                        icon: "el-icon-user-solid",
                        children: [
                            {path: "/userConsole/roles", title: "用户角色"},
                            // { path: "/userConsole/auths", title: "用户权限" }
                        ]
                    },
                    {
                        path: "/blogConsole",
                        title: "博客管理",
                        icon: "el-icon-document-copy",
                        children: [
                            {path: "/blogConsole/article", title: "文章"},
                            {path: "/blogConsole/comment", title: "公告"},
                        ]
                    },
                    {
                        path: "/pageConsole",
                        title: "页面管理",
                        icon: "el-icon-thumb",
                        children: [
                            {path: "/pageConsole/aboutMe", title: "关于页面"},
                        ]
                    },
                    {
                        path: "/sys",
                        title: "系统管理",
                        icon: "el-icon-s-tools",
                        children: [
                            {path: "/sys/jobs", title: "定时任务"},
                        ]
                    },

                ],
                status: {
                    isCollapsed: false,
                    parentMenu: "用户管理"
                }
            };
        },
        methods: {
            collapsed: function () {
                if (this.status.isCollapsed) {
                    this.status.isCollapsed = false;
                    $("#collapsedIcon")
                        .removeClass("el-icon-s-unfold")
                        .addClass("el-icon-s-fold");
                } else {
                    this.status.isCollapsed = true;
                    $("#collapsedIcon")
                        .removeClass("el-icon-s-fold")
                        .addClass("el-icon-s-unfold");
                }
            },
            refresh() {
                this.$router.go(0);
            },
            logout() {
                const _this = this;
                logout().then(res => {
                    _this.$store.commit("REMOVE_ADMININFO")
                    _this.$router.push("/admin")
                })
            },
        },
        created() {
            if (this.$store.getters.getAdmin)
                this.hasLogin = true;
            if (!this.hasLogin) {
                this.$message({
                    message: '请先登录',
                    type: 'warning',
                    duration: 3 * 1000
                })
                this.$router.push("/admin")
            }

        }
    };
</script>
<style scoped>
    .left-container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: #f6f6f6;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 2px 4px 0 rgba(96, 125, 139, 0.9),
        0 0 6px 0 rgba(96, 125, 139, 0.4);
    }

    .logo-wrapper {
        display: block;
        margin: 20px 5px;
        text-align: center;
    }

    .topbar-container {
        position: fixed;
        right: 0;
        top: 0;
        height: 48px;
        line-height: 48px;
        padding: 0 10px;
        background-color: #f6f6f6;
        box-shadow: 0 2px 4px 0 rgba(96, 125, 139, 0.9),
        0 0 6px 0 rgba(96, 125, 139, 0.4);
        transition: all 0.3s ease-in-out;
        z-index: 99;
    }

    .content-container {
        position: fixed;
        right: 0;
        top: 48px;
        bottom: 0;
        padding: 16px;
        overflow: auto;
        transition: all 0.3s ease-in-out;
    }

    .menu-item.is-active {
        background-color: #28a745 !important;
    }

    .avatar {

        float: right;
        z-index: 99;
    }
</style>
