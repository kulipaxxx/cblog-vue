<template>
    <div>
        <Header></Header>

        <div class="mblog">
            <h2>{{ about.title }}</h2>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="about.content"></div>
            <el-backtop></el-backtop>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import "github-markdown-css";
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    import ArticleComment from "@/components/Comment";

    export default {
        name: "AboutPage",
        components: {Header, Footer, ArticleComment},

        data() {
            return {
                about: {
                    id: 0,
                    title: "",
                    content: "",
                },
                ownBlog: false,
                hasLike: false,
                count: 0,
                commentList: {},
                hasLogin: false,
            };
        },
        methods: {

        },
        created() {

        },
    };
</script>

<style scoped>
    .mblog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        min-height: 200px;
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
