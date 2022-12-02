<!-- 吸顶 -->
<template>
    <div class="about">
        <!-- 导航 -->
        <div class="box">
            <!--<div class="wrap">-->
                <ul>
                    <li @click="skipTo('#profile')">公司简介</li>
                </ul>
            <!--</div>-->
        </div>
    </div>

</template>

<script>
    export default {
        mounted () {
            // 监听滚动事件
            // 监听事件
            window.addEventListener('scroll', function(){
                let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
                if(t>0){
                    $('.box').addClass('box-active')
                }else{
                    $('.box').removeClass('box-active')
                }
            })
            this.getData()
        },
    }

</script>
<style scoped>
    .box{
        position: fixed;
        height: 80px;
        width: 100%;
        z-index: 999;
        min-height: 1000px;
    }
    /*监听到滚动条开始滚动后的样式*/
       .box-active{
           position: fixed;
           top: 0;
       }

</style>
