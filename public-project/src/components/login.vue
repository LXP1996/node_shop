<template>
  <div class="login">
    <div class="login_box">
      <h1 class="title">LXP</h1>
      <h1 v-if="!login_flge">短信验证码登录</h1>
      <h1 v-else>账号登录</h1>
      <p @click="change" v-if="login_flge">短信登录</p>
      <p @click="change" v-else>账号登录</p>
      <div class="form">
        <div class="user">
          <div v-if="!login_flge">+86</div>
          <input v-model="username" type="text" placeholder="输入电话号码">
        </div>
        <div class="info" v-if="!login_flge">
          <input v-if="!login_flge" type="text" placeholder="输入验证码">
          <div v-if="!login_flge">获取验证码</div>
        </div>
        <div class="info1" v-if="login_flge">
      <input v-model="password"  type="text" placeholder="输入密码">
        </div>
      </div>

      <button class="login_" @click="login_user_pwd">登录</button>
      <button class="register" @click="register">注册账号</button>

      <div class="tip" v-if="!login_flge">
          短信可能会有延时，请耐心等待，如果长时间未收到短信，请60秒后重新获取

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      login_flge: false,
      username:null,
      password:null
    };
  },
  methods:{
      change(){
          this.login_flge=!this.login_flge;
      },
      register(){
          this.$router.push({name:"register"})
      },
      //账号密码登录
      login_user_pwd(){
        axios.get("/apis/api/user/userlogin",{
          params:{
            username:this.username,
            password:this.password,
          }
        }).then(res=>{
          if(res.data.code==1){
            window.sessionStorage.setItem("username",res.data.username);
            window.sessionStorage.setItem("token",res.data.token);
            this.$store.commit('set_username',res.data.username);
            this.$store.commit('set_token',res.data.token);
            this.$store.commit('set_login');
            this.$router.push({name:"index"})
          }else{
            this.$message({
              type:"error",
              messgae:res.data.msg
            })
          }
        })
      }
  }
};
</script>
<style lang="scss">
.login {
  min-height: 100vh;
  background: url("./../assets/login.jpg");
  background-size: 100% 100%;
  position: relative;
  .login_box {
    width: 30vw;
    min-height: 70vh;
    background-color: hsla(0, 0%, 100%, 0.97);
    position: absolute;
    right: 10vw;
    top: 10vh;
    .title {
      font-size: 3.5rem;
      color: blueviolet;
      margin-top: 3vh;
    }
    h1 {
      margin-top: 0.5vh;
      color: #000;
    }
    p {
      text-align: end;
      margin-right: 3vw;
      font-size: 2rem;
      color: #0091ff;
      cursor: pointer;
    }
    .form {
      margin-top: 1.5rem;
      text-align: center;
      .user {
        display: inline-block;
        width: 20vw;
        border: 0.1rem solid #d0d7dc;

        height: 5vh;
        div {
          display: inline-block;
          text-align: start;
          font-size: 1.5rem;
          position: relative;
          float: left;
          height: 5vh;
          line-height: 5vh;
        }
        input {
          width: 17vw;
          height: 5vh;
          border: 0px;
          outline: none;
        }
      }
      .info1{
          margin-top: 5vh;
        display: inline-block;
        width: 20vw;
        border: 0.1rem solid #d0d7dc;
        height: 5vh;
          input {
          width: 17vw;
          height: 5vh;
          border: 0px;
          outline: none;
        }
      }
      .info {
        margin-top: 5vh;
        display: inline-block;
        width: 20vw;
        border: 0.1rem solid #d0d7dc;
        height: 5vh;
        input {
          width: 14vw;
          height: 5vh;
          border: 0px;
          outline: none;
          border-right: 0.1rem solid #d0d7dc;
        }
        div {
          display: inline-block;
          font-size: 1.2rem;
          cursor: pointer;
          color: #0091ff;
          text-align: center;
          padding-left: 0.5vw;
        }
      }
    }
    .login_,
    .register {
      width: 20vw;
      height: 5vh;
      margin-top: 5vh;
      cursor: pointer;
    }
    .login_ {
      background-image: linear-gradient(90deg, #46a1fa, #067df8);
      border: 0px;
      outline: none;
      color: white;
    }
    .register {
      border: 1px solid #0091ff;
      color: #0091ff;
      font-size: 17px;
      background: white;
    }
    .tip{
        display: inline-block;
        width: 20vw;
        margin-top: 3vh;
        font-size: 1.3rem;
            color: #999;
    }
  }
}
</style>