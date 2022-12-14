<template>
    <div >
        <el-row :gutter="20">
            <!--<el-col :span="14">-->
                <!--<div style="width: 100%; display: inline-block; ">-->
                    <!--<h1>欢迎你</h1>-->
                    <!--<p></p>-->
                <!--</div>-->
                <!--<div style="width: 100%; display: inline-block; margin-top: 50px; ">-->

                <!--</div>-->

            <!--</el-col>-->
            <el-col style="float: right;">
                <el-card  shadow="hover"  style="width: 100%;">
                    <div slot="header" class="clearfix">
                        <span>文嘉《明日歌》</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="clickFn">暂停</el-button>
                    </div>
                    <div style="font-size: 18px;text-align: center; " >明日复明日</div>
                    <div style="font-size: 18px;text-align: center;" >明日何其多</div>

                    <div style="font-size: 18px;text-align: center;" >我生待明日</div>

                    <div style="font-size: 18px;text-align: center;" >万事成蹉跎</div>
                    <div style="margin-top: 40px;"></div>
                    <el-statistic ref="statistic" @finish="hilarity" format="HH:mm:ss" :value="deadline4" title="距离明日：" time-indices > </el-statistic>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                format:'HH小时:mm:ss:SSS',
                deadline: Date.now() + 1000 * 60 * 60 * 24 * 2,
                deadline2: Date.now() + 1000 * 60 * 60 * 8,
                deadline3: Date.now() + 1000 *  60 *30,
                deadline4: Date.now() + (new Date().setHours(23,59,59)-Date.now()) ,
            };
        },
        methods: {
            hilarity() {
                this.$notify({
                    title: '提示',
                    message: '时间已到，你可知寸金难买寸光阴？',
                    duration: 0
                });
            },
            clickFn(){
                this.$refs.statistic.suspend( this.stop)
                this.stop=!this.stop
            },
            add(){
                this.deadline3= this.deadline3+ 1000 * 10
            }
        }
    };
</script>
<style lang="scss" >
    .like {
        cursor: pointer;
        font-size: 25px;
        display: inline-block;
    }
</style>
