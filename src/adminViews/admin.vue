<template>
    <el-container class="container">
        <el-header>
            <navtop></navtop>
        </el-header>
        <el-container>
            <left-nav></left-nav>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import leftNav from '@/adminViews/components/nav';
    import navtop from '@/adminViews/components/nav_top';
    import Footer from '@/components/Footer';
    export default {
        name: "admin",
        components: {leftNav,navtop,Footer}
    }
</script>

<style scoped>

   .container{
        height: 100%;
       min-height: 650px;
   }
</style>
