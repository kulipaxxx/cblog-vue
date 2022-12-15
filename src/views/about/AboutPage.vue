<template>
    <b-container class="main">
        <b-row>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                <b-media>
                    <template>
                        <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
                    </template>
                    <h5 class="mt-0">芊雨</h5>
                    <p>大三狗一枚，对java后端开发具有浓厚的兴趣。</p>
                </b-media>
            </b-col>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                <h5>内心独白</h5>
                <p>
                    内容
                </p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "AboutPage"
    };
</script>

<style scoped>
    .main {
        margin-top: 10px;
        padding: 20px;
        min-height: 100%;
        background-color: #fff;
        /*background-image: url("@/assets/logo.gif");*/
        background-size: cover;
        background-repeat: no-repeat;
    }
    h5 {
        margin-top: 20px;
        text-align: left;
        font-size: 20px;
    }
</style>

