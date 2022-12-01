<!-- 吸顶 -->
<template>
    <div class="scroll">
        <div class="nav" :class="navBarFixed == true ? 'navBarWrap' :''">吸顶导航</div>
        <div class="header">22</div>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data() {
            return {
                navBarFixed: false,
            };
        },

        components: {},

        mounted() {
            window.addEventListener("scroll", this.watchScroll);
        },

        methods: {
            watchScroll() {
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                console.log(scrollTop)
                //  当滚动超过 90 时，实现吸顶效果
                if (scrollTop > 20) {
                    this.navBarFixed = true;
                } else {
                    this.navBarFixed = false;
                }
            }
        }
    };
</script>
<style scoped>
    .scroll{
        height:1000px;
    }
    .nav{
        padding:15px;
        width:100%;
        box-sizing: border-box;
        background:greenyellow;
        text-align: center;
    }
    .navBarWrap {
        position: fixed;
        top:0;
        /*z-index:999;*/
    }

    .header {
        height: 90px;
        background: red;
        text-align: center;
        color: #fff;
    }
</style>
