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
                            <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                                {{blog.title}}
                            </router-link>
                        </div>

                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <div v-show="!noPage" class="noPage">
                <h1>还没有发表文章哦</h1>
            </div>
            <el-pagination v-show="noPage" class="mpage"
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
    import {getIndex} from "../../api/reception/blog/blog";

    export default {
        name: "archivePage",
        components: {Header,Footer},
        data() {
            return {
                noPage: false,
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5
            }
        },
        methods: {
            page(id,currentPage) {
                const _this = this
                console.log("进入博客页面")
                getIndex(id,currentPage).then(res => {
                    console.log(res)
                    _this.blogs = res.data.data.records
                    if (_this.blogs.length !== 0){
                        _this.noPage = true;
                    }
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            }
        },
        created() {
            console.log("id", this.$store.getters.getUser.id)
            this.page(this.$store.getters.getUser.id,1)
        }
    }
</script>

<style scoped>

    .mpage {
        margin: 0 auto;
        text-align: center;
    }
    .noPage {
        margin: 0 auto;
        text-align: center;
    }
    .content{
        max-width: 960px;
        background-color: white;
        min-height: 200px;
        max-height: 970px;
        margin: 0 auto;
    }
    .m {
        background-color: #f2f6fcaf;
    }
</style>
