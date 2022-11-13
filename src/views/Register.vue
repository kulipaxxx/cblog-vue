<template>
    <div>
        <el-container>
            <el-header>
                注册
            </el-header>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <img
                                class="pointer"
                                :src="src"
                                alt=""
                                @click="refreshCaptcha"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "Register",

        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    key: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                },
                src: ''
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        this.$axios.post('/register',this.ruleForm).then(res=>{
                            _this.$router.push("/login")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            refreshCaptcha: function () {
                this.$axios.get("/code").then((res) => {
                    console.log(res);
                    this.src = res.data.data.img;
                    console.log(this.src);
                    //这个 登录携带的参数 根据key 要从redis中  获取正确的验证码运算结果
                    this.ruleForm.key = res.data.data.key;
                });
            },
        },
        created() {
            this.refreshCaptcha()
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        /*background-color: #D3DCE6;*/
        /*color: #333;*/
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        /*color: #333;*/
        text-align: center;
        line-height: 160px;
    }

    /*body > .el-container {*/
    /*margin-bottom: 40px;*/
    /*}*/

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
