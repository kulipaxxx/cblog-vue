<template>
    <div id="app">
        <div id="admin">
            <div class="pos" v-loading="loading">
                <h1 class="adminh1">注册账号</h1>
                <el-form
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                >
                    <el-form-item label="用户名：" prop="username">
                        <el-input
                                prefix-icon="el-icon-user"
                                style="width: 250px"
                                type="text"
                                v-model="ruleForm.username"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密 码：" prop="password">
                        <el-input
                                prefix-icon="el-icon-menu"
                                style="width: 250px"
                                show-password
                                type="password"
                                v-model="ruleForm.password"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮 箱：" prop="email">
                        <el-input
                                prefix-icon="el-icon-s-comment"
                                style="width: 250px"
                                type="email"
                                v-model="ruleForm.email"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="code" label="验证码">
                        <el-input prefix-icon="el-icon-star-on" v-model="ruleForm.code" auto-complete="off" placeholder="验证码" style="width: 250px">
                        </el-input>
                        <div class="login-code">
                            <img :src="src" @click="refreshCaptcha">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    <div class="tips">
                        <span style="margin-right:20px;font-size: 16px">如果您已有账号请 <button style="background-color: white;color:#409EFF;cursor:pointer;border: 0px" @click="toLogin">登录</button></span>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {register,code} from "../api/reception/login";
    export default {
        name: "Register",

        data() {
            return {
                loading: false,
                ruleForm: {
                    username: '',
                    password: '',
                    email: '',
                    code: '',
                    uuid: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                    ],
                    email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    code: [{required: true, trigger: 'change', message: '验证码不能为空'}
                    ]
                },
                src: ''
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        register(this.ruleForm.username,this.ruleForm.password,this.ruleForm.email,this.ruleForm.code,this.ruleForm.uuid).then(res => {
                            _this.$router.push("/login")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            toLogin() {
                this.$router.push({
                    path: "/login",
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            refreshCaptcha: function () {
                code().then((res) => {
                    console.log(res);
                    this.src = res.data.data.img;
                    console.log(this.src);
                    //这个 登录携带的参数 根据key 要从redis中  获取正确的验证码运算结果
                    this.ruleForm.uuid = res.data.data.key;
                });
            },
        },
        created() {
            this.refreshCaptcha()
        }
    }

</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }
    body {
        background: rgb(135, 206, 235);
    }
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    #admin {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-top: -200px;
        margin-left: -250px;
        width: 500px;
        height: 550px;
        background: #fff;
        border-radius: 10%;
        box-shadow: 8px 10px 10px rgb(177, 223, 242);
    }
    .adminh1 {
        margin: 20px 0;
        text-shadow: 10px 13px 3px rgb(207, 207, 207);
        text-align: center;
    }
    .pos {
        width: 450px;
        height: 350px;
        position: absolute;
        top: 25px;
        left: 25px;
    }
    .tips {
        background-color: white;
        font-size: 18px;
        text-align: center;
        margin-bottom: 10px;
    }
</style>
