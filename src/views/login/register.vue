<template>
  <div class="login-container">
    <el-form class="login-form" :model="registerForm" :rules="registerRules" ref="registerForm">

        <!-- 标题 -->
        <div class="title-container">
          <h3 class="title">{{ $t('login.register') }}</h3>
          <!-- <lang-select class="set-language"/> -->
        </div>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="registerForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <!-- 密码框 -->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            v-model="registerForm.password"
            :placeholder="$t('login.password')"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item prop="phone">
          <span class="svg-container">
            <i class="el-icon-mobile-phone"></i>
          </span>
          <el-input
            type="tel"
            v-model="registerForm.phone"
            :placeholder="$t('login.phone')"
            name="phone"
            auto-complete="on"
            @keyup.enter.native="handleLogin" />
        </el-form-item>

        <!-- 注册按钮 -->
        <el-button type="primary" style="width:100%;margin-bottom:30px;margin-left:0" @click.native.prevent="handleRegister">{{ $t('login.register') }}</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      passwordType:"password",
      registerForm:{
        username:"Username",
        password:"Password",
        phone:"Phone"
      },
      // 校验
      registerRules:{
        username:[{required:true,trigger:"blur",message:"请输入用户名"}],
        password:[{required:true,trigger:"blur",message:"请输入密码"}],
        phone:[{required:true,trigger:"blur",message:"请输入手机号"}]
      }
    }
  },
  methods:{
    showPwd(){
      if (this.passwordType === "password") {
        // console.log(1)
        this.passwordType = ""
      } else {
        // console.log(2)
        this.passwordType = "password"
      }
    },
    // 点击注册去校验  
    // 当校验成功时，我们可以通过postman去测我们的接口，如果当时我们没有用md5加密，测接口时输入用户名和密码就用我们初始的
    handleRegister(){
      this.$refs.registerForm.validate(vaild => {
        if(vaild){
          console.log("校验成功")
          this.$store.dispatch("registerByUserName",this.registerForm).then(res=>{
            // 会出现域名不一样的地方，然后在config中dev.env.js改变域名
            console.log(res,"...res")
            // 注册成功之后弹框
            this.$message({
              message:"注册成功",
              center:true,
              type:"success"
            })
          }).catch(err=>{ // 捕获异常
          // 手机号重复的弹框
            this.$message({
              message:err,
              center:true,
              type:"error"
            })
          })
        } else{

        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
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

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
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
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
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
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>

