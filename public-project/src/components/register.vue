<template>
    <div class="register">
        <div class="box">
           <span class="title">LXP</span>
           <div class="title_">账号注册</div>
          <div>
               <input v-model="username" type="text" placeholder="输入你的电话">
          </div>
           <div>
               <input v-model="password" type="password" placeholder="输入你的密码">
           </div>
           <button @click="register_">注册</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
         username:null,
         password:null
       }
    },
    methods:{
        register_(){
         let data=new FormData();
         data.append("username",this.username)
          data.append("password",this.password)
         axios.post('/apis/api/user/useradd',data).then(res=>{
             if(res.data.code==1){
                 this.$message({
                     type:"success",
                     message:"success"
                 })
             }else{
                 this.$message({
                     type:"success",
                     message:res.data.msg
                 })
             }
         })
        }
    }
}
</script>
<style lang="scss">
    .register{
        width: 100vw;
        height: 100vh;
        background: whitesmoke;
        .box{
            position: relative;
            width: 70vw;
            height: 70vh;
            left: calc(50% - 35vw);
            top: calc(50% - 35vh);
            background: #ffffff;
            .title{
                display: inline-block;
                font-size: 3rem;
                margin-top: 5vh;
                color: lightskyblue;
            }
            .title_{
                
                font-size: 3rem;
                margin-top: 1vh;
            }
            div{
                margin-top: 5vh;
                
                input{
                height: 5vh;
                width: 20vw;
            }
            }
            button{
                margin-top: 5vh;
                width: 20vw;
                height: 6vh;
                background: lightskyblue;
                outline: none;
                border: 0px;
                border-radius: 0.2rem;
                cursor: pointer;
            }
        }
            }
</style>
