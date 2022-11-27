<template>
    <div>
        <Header></Header>

        <div class="mblog">
            <h2> {{ blog.title }}</h2>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
                    编辑
                </router-link>
            </el-link>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
            <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
    import 'github-markdown-css'
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import {getDetail} from "../../api/reception/blog/blog";

    export default {
        name: "BlogDetail.vue",
        components: {Header,Footer},

        data() {
            return {
                blog: {
                    id: "",
                    title: "",
                    content: ""
                },
                ownBlog: false
            }
        },
        created() {
            const id = this.$route.params.blogId
            console.log(id)
            const _this = this
            getDetail(id).then(res => {
                console.log("进入博客详情")
                const blog = res.data.data
                _this.blog.id = blog.id
                _this.blog.title = blog.title

                var MardownIt = require("markdown-it")
                var md = new MardownIt()

                var result = md.render(blog.content)
                _this.blog.content = result
                _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)

            })
        }
    }
</script>

<style scoped>
    .mblog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        min-height: 700px;
        padding: 20px 15px;
        max-width: 960px;
        background-color: white;
        margin: 0 auto;
    }

</style>
