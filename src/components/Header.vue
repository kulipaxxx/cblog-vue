<template>
    <div class="m-content">
        <el-backtop></el-backtop>
        <el-menu mode="horizontal">
            <el-menu-item index="1"><a href="/"><img src="../assets/logo.gif" alt="" style="height: 50px"></a>
            </el-menu-item>
            <el-menu-item index="2"><a href="/blogs">首页</a></el-menu-item>
            <el-menu-item index="6" style="float: right;">
                <div v-show="!hasLogin">
                    <span><el-link href="/login">登录</el-link></span>
                </div>
                <div v-show="hasLogin">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :size="50" :src="user.avatar"></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="width: 100px;margin-right: -20px;text-align: center;">
                            <el-dropdown-item>
                                <el-link>
                                    <el-link href="/index">我的主页</el-link>
                                </el-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-link>
                                    <el-link href="/setting">设置</el-link>
                                </el-link>
                            </el-dropdown-item>
                            <!-- <el-dropdown-item>
                                <el-link>
                                    <el-link href="/man">管理博客</el-link>
                                </el-link>
                            </el-dropdown-item> -->
                            <el-dropdown-item>
                                <el-link @click="logout">退出</el-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-menu-item>
        </el-menu>


        <div class="maction">
            <!--<div class="block">-->
            <!--<h1>欢迎你{{ user.username }}</h1>-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
    import {logout} from "../api/reception/login";

    export default {
        name: "Header",
        data() {
            return {
                user: {
                    username: '请先登录',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                hasLogin: false
            }
        },
        methods: {
            logout() {
                const _this = this
                logout().then(res => {
                    _this.$store.commit("REMOVE_INFO")
                    _this.$router.push("/login")
                })
            }
        },
        created() {
            if (this.$store.getters.getUser.username) {
                this.user.username = this.$store.getters.getUser.username;
                if (this.$store.getters.getUser.avatar != null)
                    this.user.avatar = this.$store.getters.getUser.avatar

                this.hasLogin = true
            }

        }
    }
</script>

<style scoped>

    .m-content {
        max-width: 100%;
        margin: 0 auto;
        text-align: center;
    }

    .maction {
        margin: 10px 0;
    }

    .el-dropdown-link {
        margin-left: 10px;
        cursor: pointer;
        color: #409EFF;
    }

</style>
