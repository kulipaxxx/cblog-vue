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
    import {getPage} from "../../api/admin/blog/aboutConsole";

    export default {
        name: "AboutPage",
        components: {Header, Footer},

        data() {
            return {
                about: {
                    id: 0,
                    title: '',
                    content: ''
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
            console.log("进入关于页面")
            const id = this.$store.getters.getUser.id;
            console.log(id);
            getPage(id).then( res => {
                this.about = res.data.data
                var MardownIt = require("markdown-it");
                var md = new MardownIt();

                var result = md.render(this.about.content);
                console.log()
                this.about.content = result;
                console.log(this.about)
            })
        },
    };
</script>

<style scoped lang="less">
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

    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }

</style>
