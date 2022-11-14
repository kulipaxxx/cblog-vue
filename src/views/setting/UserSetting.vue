<template>
    <div>
        <Header></Header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="text-align: center;margin: 0 auto;width: 660px">
            <el-form-item label="">
                <el-upload
                        class="avatar-uploade"
                        :multiple="true"
                        :action="actionPath"
                        accept="image/jpeg,image/gif,image/png,image/bmp"
                        :before-upload="beforeAvatarUpload"
                        :data="postData"
                        :on-success="handleAvatarSuccess">
                    <el-image v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100px; height: 100px" fit="cover">
                    </el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item style=" text-align: center;">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import {genUpToken} from "@/common/qiniuToken"

    export default {
        name: "UserSetting",
        components: {Header, Footer},
        data() {
            return {
                imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                postData: {
                    // 填写你的Token
                    token: ""
                },
                EncodedEntryURI: "",
                actionPath: "http://upload-z2.qiniup.com",
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:
            {
                handleAvatarSuccess(res, file) {//上传成功之后的操作
                    this.imageUrl = "http://rl8colubh.hn-bkt.clouddn.com/" + res.key;
                    this.EncodedEntryURI = res.key;
                    if (this.imageUrl != null){//更换头像
                        let userInfo = this.$store.getters.getUser;
                        userInfo.avater = this.imageUrl;
                        this.$store.commit("SET_USERINFO", userInfo);
                    }
                }
                ,
                beforeAvatarUpload(file) {//上传之前的操作
                    const isJPG = (file.type === 'image/jpeg');
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                        this.$message.error('上传头像图片只能是 JPEG 格式!');
                    }
                    if (!isLt2M) {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                },
                submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                           this.$axios.post("/user/save", this.ruleForm).then(res=>{

                           })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                }
            },
        created() {
            let token;
            let policy = {};
            let bucketName = 'cblog723';
            let AK = 'IlJlS8lfjC-vYZMSnWl1E-AYtsKZTiSxSfnNw-tP';
            let SK = 'vIbWy_9UMf2bfCHovLdMVHBkJHmZuBODj_vvVujE';
            let deadline = Math.round(new Date().getTime() / 1000) + 3600;
            if (this.$store.getters.getUser.avatar != null)
                this.imageUrl = this.$store.getters.getUser.avatar
            policy.scope = bucketName;
            policy.deadline = deadline;
            token = genUpToken(AK, SK, policy);
            this.postData.token = token;
        }
    }


</script>

<style scoped>

</style>
