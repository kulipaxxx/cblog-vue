<template>
    <div class="m">
        <Header></Header>
        <div class="content">
            <el-timeline>
                <el-timeline-item :timestamp="blog.created" placement="top" v-for="(blog,index) in blogs" :key="index">
                    <el-card style="width: 100%;height: 140px">
                        <div>
                            <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                 style="float: left;height: 100px;">
                        </div>
                        <div style="line-height: 18px;">
                            <h4>
                                <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                                    {{blog.title}}
                                </router-link>
                            </h4>
                            <p>
                                {{blog.description}}
                            </p>
                        </div>

                    </el-card>
                </el-timeline-item>
            </el-timeline>

            <el-pagination class="mpage"
                           background
                           layout="prev, pager, next"
                           :current-page="currentPage"
                           :page-size="pageSize"
                           :total="total"
                           @current-change=page>
            </el-pagination>
        </div>
        <Footer></Footer>
    </div>

</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import {getblogs} from "../../api/reception/blog/blog";

    export default {
        name: "Blogs.vue",
        components: {Header,Footer},
        data() {
            return {
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5
            }
        },
        methods: {
            page(currentPage) {
                const _this = this
                console.log("进入博客页面")
                getblogs(currentPage).then(res => {
                    console.log(res)
                    _this.blogs = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>

    .mpage {
        margin: 0 auto;
        text-align: center;
    }

    .content{
        max-width: 960px;
        background-color: white;
        height: 960px;
        margin: 0 auto;
    }
    .m {
        background-color: #f2f6fcaf;
    }
</style>
