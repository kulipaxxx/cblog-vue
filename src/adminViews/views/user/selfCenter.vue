<template>
    <div>
        <Header></Header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                 style="text-align: center;margin: 0 auto;width: 660px">
            <el-form-item label="">
                <el-upload
                        class="avatar-uploade"
                        :multiple="true"
                        :action="actionPath"
                        accept="image/jpeg,image/gif,image/png,image/bmp"
                        :before-upload="beforeAvatarUpload"
                        :data="postData"
                        :on-success="handleAvatarSuccess">
                    <el-image v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100px; height: 100px"
                              fit="cover">
                    </el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item style=" text-align: center;">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <Footer></Footer>
    </div>
</template>

<script>
    import {genUpToken} from "@/common/qiniuToken"
    import {index,save} from "../../../api/admin/user/userSeeting";

    export default {
        name: "selfCenter",
        data() {
            return {
                imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                postData: {
                    // 填写你的Token
                    token: ""
                },
                EncodedEntryURI: "",
                actionPath: "http://upload-z2.qiniup.com",
                ruleForm: {},
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    age: [
                        { type: 'date', required: true, message: '请输入年龄', trigger: 'change' }
                    ],
                    email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                }
            }
        },
        methods:
            {
                handleAvatarSuccess(res, file) {//上传成功之后的操作
                    console.log(res)
                    console.log(file)
                    this.imageUrl = "http://rmeura0wj.hn-bkt.clouddn.com/" + res.key;
                    console.log("imageUrl" + this.imageUrl)
                    this.EncodedEntryURI = res.key;
                    if (this.imageUrl != null) {//更换头像
                        this.ruleForm.avatar = this.imageUrl;
                        let userInfo = this.$store.getters.getAdmin;
                        userInfo.avatar = this.imageUrl;
                        this.$store.commit("SET_ADMININFO", userInfo);
                        console.log("adminInfo")
                        console.log(userInfo)
                        console.log(this.$store.getters.getAdmin)
                    }
                },
                beforeAvatarUpload(file) {//上传之前的操作
                    const isPNG = (file.type === 'image/png');
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isPNG) {
                        this.$message.error('上传头像图片只能是 PNG 格式!');
                    }
                    if (!isLt2M) {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isPNG && isLt2M;
                },
                submitForm() {
                    save(this.ruleForm.id,this.ruleForm.username
                        ,this.ruleForm.avatar,this.ruleForm.email
                        ,this.ruleForm.gender,this.ruleForm.age).then(res => {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                    })
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                }
            },
        created() {
            const id = this.$store.getters.getAdmin.id;
            console.log("用户id:" + id);
            index(id).then(res => {
                this.ruleForm = res.data.data;
                console.log(this.ruleForm)
                if (this.ruleForm.avatar != null &&this.ruleForm.avatar !== ""){
                    this.imageUrl = this.ruleForm.avatar
                }
            })
            let token;
            let policy = {};
            let bucketName = 'cblog123';
            let AK = 'IlJlS8lfjC-vYZMSnWl1E-AYtsKZTiSxSfnNw-tP';
            let SK = 'vIbWy_9UMf2bfCHovLdMVHBkJHmZuBODj_vvVujE';
            let deadline = Math.round(new Date().getTime() / 1000) + 3600;
            policy.scope = bucketName;
            policy.deadline = deadline;
            token = genUpToken(AK, SK, policy);
            this.postData.token = token;
        }
    }


</script>

