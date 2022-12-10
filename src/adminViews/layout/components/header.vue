<template>
    <div class="layout">


        <div class="left-container" :style="{width: status.isCollapsed?'64px':'200px'}">
            <div class="logo-wrapper">
                <img style="width:50px;height:50px;" src="./DigitalX1.png" />
            </div>
            <div class="menu-wrapper">
                <v-menu v-for="(menu,index) in this.menu_list" :key="index" :menu="menu" :status="status"></v-menu>
            </div>
        </div>
        <div class="topbar-container" :style="{left: this.status.isCollapsed?'64px':'200px'}">
            <div class="btn btn-mini btn-success" @click="collapsed">
                <i class="icon-exchange"></i>
            </div>
        </div>
        <div class="content-container" :style="{left: this.status.isCollapsed?'64px':'200px'}">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>
<script>
    import $ from "jquery";
    import MenuItem from "../menu/MenuItem";
    export default {
        components: {
            "v-menu": MenuItem
        },
        data() {
            return {
                menu_list: [
                    {
                        path: "/home",
                        title: "首页",
                        icon: "icon-home icon-large"
                    },
                    {
                        path: "/user",
                        title: "用户管理",
                        icon: "icon-user icon-large",
                        children: [
                            { path: "/user/roles", title: "用户角色" },
                            { path: "/user/auths", title: "用户权限" }
                        ]
                    },
                    {
                        path: "/sys",
                        title: "系统管理",
                        icon: "icon-heart icon-large",
                        children: [
                            { path: "/sys/jobs", title: "定时任务" },
                            { path: "/sys/menus", title: "菜单管理" }
                        ]
                    }
                ],
                status: {
                    isCollapsed: false,
                    currentMenu: "首页",
                    parentMenu: "首页"
                }
            };
        },
        methods: {
            collapsed: function() {
                if (this.status.isCollapsed) {
                    this.status.isCollapsed = false;
                    $(".l2").removeClass("hidden");
                } else {
                    this.status.isCollapsed = true;
                    $(".l2").addClass("hidden");
                }
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
    .avatar{
        position: fixed;
        z-index: 100;
        float: right;
    }
</style>
