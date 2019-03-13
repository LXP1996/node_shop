<template>
  <div class="confirmOrder">
    <div class="title">核对订单信息</div>
    <!-- 默认地址 -->
    <div class="GainInformation">
      <div class="p">收货人信息</div>
      <div class="defaultAddress" v-if="data.length=0">
        <div class="top">
          <span>{{'刘鑫鹏'}}</span>
          <span>{{18191031209}}</span>
        </div>
        <div class="content">{{"陕西省 西安市 未央区 西安市"}}</div>
      </div>

      <!-- 增加收获地址 -->
      <div class="add_address">
        <div @click="model">+</div>
        <p>添加收获地址</p>
      </div>
    </div>
    <!-- 弹出层 -->
    <div v-if="maskFlge" class="mask">
      <div class="mask_">
        <div class="top" @click="maskFlge=false">&times;</div>
        <p>新建收获地址</p>
        <div class="content">
          <div>
            <span>*收货人:</span>
            <input v-model="username" type="text">
          </div>
          <div>
            <span>*手机号码:</span>
            <input v-model="phone" type="text">
          </div>
          <div>
            <span>*收货地区：</span>
            <select @change="getC" v-model="pID" name id placeholder="选择省">
                <option :value="item.provinceid" v-for="(item,index) in P" :key="index">
                  {{item.province}}
                </option>
            </select>
            <select @change="getA" v-if="cIDflge" v-model="cID" name id>
                <option :value="item.cityid" v-for="(item,index) in C" :key="index">
                  {{item.city}}
                </option>
            </select>
            <select v-if="aIDflge" v-model="aID" name id>
                <option :value="item.areaid" v-for="(item,index) in A" :key="index">
                  {{item.area}}
                </option>
            </select>
          </div>
          <div>
            <span>*详细地址：</span>
            <input v-model="DetailedAddress" type="text">
          </div>
          <div class="checkbox">
            <div
              @click="checkBoxflge=!checkBoxflge"
              :class="{'checkbox_':!checkBoxflge,'checkboxed':checkBoxflge}"
            ></div>
            <div>设为默认地址</div>
          </div>
          <button class="save" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      maskFlge: false,
      checkBoxflge: false,
      username:"",
      phone:"",
      pID:"",
      cID:"",
      aID:"",
      DetailedAddress:"",
      cIDflge:false,
      aIDflge:false,
      P:[],
      C:[],
      A:[],
      pid:"",
      cid:"",
      aid:""
    };
  },
  created() {
      console.log(this.$store.getters.token)
    axios
      .get("/apis/api/query_address", {
        params: {
          token: this.$store.getters.token
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code == 1) {
          this.data = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
  },
  methods:{
      save(){
        let data=new FormData();
        data.append("username",this.username);
        data.append("phone",this.phone);
        data.append("pID",this.pID);
         data.append("cID",this.cID);
          data.append("aID",this.aID);
          if(this.checkBoxflge){
         data.append("defaultAddress","true");
          }else{
            data.append("defaultAddress","false");  
          }
          data.append("token",this.$store.getters.token)
          data.append("DetailedAddress",this.DetailedAddress)
        axios.post("/apis/api/address_add",data).then(res=>{
            console.log(res)
        })
      },
      model(){
          this.maskFlge=true;
         axios.get("apis/api/query_p").then(res=>{
            this.P=res.data.data
         })
      },
      getC(){
         this.cIDflge=true;
         axios.get("/apis/api/query_c",{
             params:{
                 provinceid:this.pID
             }
         }).then(res=>{
             console.log(res)
            this.C=res.data.data
         })
      },
      getA(){
          this.aIDflge=true;
         axios.get("/apis/api/query_a",{
             params:{
                 cityid:this.cID
             }
         }).then(res=>{
             console.log(res)
            this.A=res.data.data
         })
      }
  }
};
</script>
<style lang="scss">
.confirmOrder {
  background: whitesmoke;
  min-height: 80vh;

  .mask {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    top: 0px;
    .mask_ {
      z-index: 9999;
      position: absolute;
      width: 50vw;
      height: 70vh;
      background: white;
      top: calc(50% - 35vh);
      left: calc(50% - 25vw);
      .top {
        font-size: 3rem;
        float: right;
        margin-right: 2vw;
        cursor: pointer;
      }
      p {
        clear: both;
        font-size: 2.5rem;
      }
      div {
        overflow: hidden;
        margin-top: 3vh;
        span {
          position: relative;
          float: left;
          font-size: 2rem;
          margin-left: 7vw;
        }
        input {
          position: relative;
          float: right;
          height: 5vh;
          width: 25vw;
          margin-right: 7vw;
        }
        select {
          width: 5vw;
          margin-right: 4vw;
          height: 3vh;
        }
        .checkbox {
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          .checkbox_ {
            background: url("./../assets/bg.png") no-repeat -10px -237px;
            width: 2vw;
          }
          .checkboxed {
            background: url("./../assets/bg.png") no-repeat -10px -205px;
            width: 2vw;
          }
        }
        .save {
          border: 0.1rem solid blue;
          outline: none;
          background: blue;
          color: white;
          width: 10vw;
          height: 5vh;
          border-radius: 0.4rem;
          cursor: pointer;
          margin-top: 3vh;
        }
      }
    }
  }
  .title {
    height: 10vh;
    background: #ffffff;
    line-height: 10vh;
    font-size: 2rem;
    margin-left: 10vw;
    margin-right: 10vw;
  }
  .GainInformation {
    background: #ffffff;
    margin-top: 5vh;
    margin-left: 10vw;
    margin-right: 10vw;
    min-height: 30vh;
    padding-top: 5vh;
    text-align: start;
    .p {
      text-align: start;
      font-size: 2rem;
      margin-top: 1vh;
      margin-left: 3vw;
    }
    .defaultAddress {
      border: 0.1rem solid black;
      width: 20vw;
      min-height: 25vh;
      display: inline-block;
      margin-left: 3vw;
      margin-top: 3vh;
      .top {
        margin-top: 1vh;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-around;
      }
      .content {
        margin-top: 5vh;
        font-size: 1.5rem;
        margin-left: 1vw;
      }
    }
    .add_address {
      border: 0.1rem solid black;
      width: 20vw;
      min-height: 25vh;
      display: inline-block;
      margin-left: 3vw;
      margin-top: 3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      div {
        border: 0.1rem solid black;
        height: 5vh;
        width: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5vh;
        cursor: pointer;
      }
    }
  }
}
</style>

