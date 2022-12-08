<template>
    <div id="app">
        <div id="admin">
            <div class="pos" v-loading="loading">
                <h1 class="adminh1">用户登录</h1>
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
                    <el-form-item prop="code" label="验证码">
                        <el-input v-model="ruleForm.code" auto-complete="off" placeholder="验证码" style="width: 250px">
                        </el-input>
                        <div>
                            <img :src="src" @click="refreshCaptcha">
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    <div class="tips">
                        <span style="margin-right:20px;font-size: 16px">如果您还没有账号请先 <button style="background-color: white;color:#409EFF;cursor:pointer;border: 0px" @click="Register">注册</button></span>
                        <span style="margin-right:20px;"><button style="background-color: white;color:#409EFF;cursor:pointer;border: 0px" @click="findPwd">忘记密码？</button></span>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {login,code} from "../api/reception/login";

    export default {
        name: "Login",

        data() {
            return {
                loading: false,
                ruleForm: {
                    username: 'cblog',
                    password: '111111',
                    code: '',
                    uuid: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                    code: [{required: true, trigger: 'change', message: '验证码不能为空'}
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
                        login(this.ruleForm.username,this.ruleForm.password,this.ruleForm.code,this.ruleForm.uuid).then(res=>{
                            const token = res.headers['authorization']
                            _this.$store.commit('SET_TOKEN', token)
                            _this.$store.commit('SET_USERINFO', res.data.data)
                            console.log("============")
                            console.log(res);
                            _this.$router.push("/blogs")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            Register(){
                this.$router.push("/register");
            },
            findPwd(){
                this.$router.push("/getPwd");
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            refreshCaptcha: function () {
                code("/auth/code").then((res) => {
                    console.log("进入code");

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
