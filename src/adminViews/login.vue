<template>
    <div v-loading="loading" element-loading-text="登录中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)" class="login-container">

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <!-- 头像区域 -->
        <div v-if="TxStatus" class="avatar-box">
          <img src="@/assets/logo.gif" alt="">
        </div>

        <div class="title-container">
          <h3 class="title">后台管理系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <span class="svg-container">
            <i class="el-icon-magic-stick"></i>
          </span>
          <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 100px">
          </el-input>
          <div style="float: right;margin: 0 10px;">
            <img :src="src" @click="refreshCaptcha">
          </div>
        </el-form-item>
        <div>
          <el-button type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleLogin">登录</el-button>
        </div>

      </el-form>
    </div>
  </template>

  <script>
  // 引入去除空格工具
  import { validUsername } from '@/utils/validate'
  import {login,code} from "../api/reception/login";

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('用户名不能为空！'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码最少为6位字符！'))
        } else {
          callback()
        }
      }
      return {
        // 头像状态
        TxStatus: true,
        loginForm: {
          username: 'cblog',
          password: '111111',
          code: '',
          uuid: ''
        },
        // 登录规则
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          code: [{required: true, trigger: 'change', message: '验证码不能为空'}
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
        src: '',
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      // 登录业务
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          // 如果符合验证规则
          if (valid) {
            this.loading = true
            setTimeout(() => {
              const _this = this;
              login(this.loginForm.username,this.loginForm.password,this.loginForm.code,this.loginForm.uuid).then(res=>{
                const token = res.headers['authorization']
                _this.$store.commit('SET_ADMINTOKEN', token)
                _this.$store.commit('SET_ADMININFO', res.data.data)
                console.log("============");
                console.log(res);
                _this.$router.push("/layout")
              }).catch(e=>{
                this.loading = false;
              })}, 1500)
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      refreshCaptcha: function () {
        code("/auth/code").then((res) => {
          console.log("进入code");

          console.log(res);
          this.src = res.data.data.img;
          console.log(this.src);
          //这个 登录携带的参数 根据key 要从redis中  获取正确的验证码运算结果
          this.loginForm.uuid = res.data.data.key;
        });
      },
    },
    created() {
      this.refreshCaptcha()
    }
  }
  </script>

  <style lang="scss">
  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }
  .login-container {
    .el-input {
      display: inline-block;
      height: 37px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 37px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  </style>

  <style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    overflow: hidden;
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background: url(@/assets/admin/bg2.jpg);
    background-size: 100% 100%;
     // 头像
    .avatar-box {
      margin: 0 auto;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 1px solid #409eff;
      box-shadow: 0 0 10px #409eff;
      position: relative;
      bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 70px 35px 0;
      margin: 0 auto;
      overflow: hidden;

    }

    .tips {
      font-size: 18px;
      text-align: center;
      color: #000;
      margin-bottom: 10px;
      height: 14px;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 30px;
        color: $light_gray;
        margin: 0px auto 20px auto;
        text-align: center;
        font-weight: 500;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
  </style>
