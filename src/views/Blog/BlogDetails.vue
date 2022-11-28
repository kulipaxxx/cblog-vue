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
            <el-backtop></el-backtop>
            <div>
                <button class="like" v-show="!hasLike" @click="click">
                    <svg t="1669551787932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2895" width="48" height="48"><path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="2896"></path></svg>
                    <p v-bind="count">{{count}}</p>
                </button>
                <button class="like" v-show="hasLike" @click="click">
                    <svg t="1669551787932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2895" width="48" height="48"><path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="2896" fill="#d81e06"></path></svg>
                    <p v-bind="count">{{count}}</p>
                </button>
            </div>

        </div>

        <Footer></Footer>
    </div>
</template>

<script>
    import 'github-markdown-css'
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import {getDetail} from "../../api/reception/blog/blog";
    import {getRelation,clickLike} from "../../api/reception/blog/like";
    import {likeCount} from "../../api/reception/blog/like";

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
                ownBlog: false,
                hasLike: false,
                count: 0
            }
        },
        methods: {
            click(){
                this.haslike = !this.haslike;
                let status;
                if (this.hasLike === true)
                    status = 1;
                else
                    status = 0;
                console.log(this.$store.getters.getUser.id);
                const userId = this.$store.getters.getUser.id
                clickLike(this.blog.id,userId,status).then(res => {
                    location.reload()
                })
            }
        },
        created() {
            const id = this.$route.params.blogId
            console.log("博客id:" + id);
            getDetail(id).then(res => { //查询博客详情
                console.log("进入博客详情")
                const blog = res.data.data
                this.blog.id = blog.id
                this.blog.title = blog.title

                var MardownIt = require("markdown-it")
                var md = new MardownIt()

                var result = md.render(blog.content)
                this.blog.content = result
                if(this.$store.getters.getUser != null)
                    this.ownBlog = (blog.userId === this.$store.getters.getUser.id)
            })
            if(this.$store.getters.getUser != null){
                getRelation(id,this.$store.getters.getUser.id).then(res=>{ //查询当前用户是否点赞
                console.log(id);
                console.log(this.$store.getters.getUser.id);
                console.log("是否点赞：" + res.data.data);
                const data = res.data.data;
                if (data === true){
                    this.hasLike = true;
                }
                else
                    this.hasLike = false;
            });
            }
            likeCount(id).then(res=>{ //查询点赞数量
                console.log(res)
                if (res.data.data.count != null)
                    this.count = res.data.data.count
                console.log(this.count)
            })
        }
    }
</script>

<style scoped>
    .mblog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        min-height: 700px;
        padding: 20px 15px;
        width: 960px;
        background-color: white;
        margin: 0 auto;
    }
    .like {
        border: 0;
        background-color: white;
        width: 960px;
        margin: 0 auto;
    }

</style>
