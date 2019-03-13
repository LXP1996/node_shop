<template>
  <div class="shoppingcart">
    <div class="top">
      <div>
        <span>我的购物车</span>
      </div>
      <div>
        <router-link tag="span" :to="{name:'index'}">继续购物></router-link>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="car">
      <div class="header_">
        <div @click="allselect_()">
          <i :class="{'checkbox':true,'checkboxed':allselect.flge}"></i>
          &nbsp;
          <span>全选</span>
        </div>
        <div>
          <span>商品名称</span>
        </div>
        <div>
          <span>价格（元）</span>
        </div>
        <div>
          <span>数量</span>
        </div>
        <div>
          <span>赠送积分</span>
        </div>
        <div>
          <span>小计（元）</span>
        </div>
        <div>
          <span>操作</span>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="content" v-for="(item,index) in data" :key="index">
        <div class="select">
          <i :class="{'checkbox':true,'checkboxed':item.chexkBox}" @click="select_(item)"></i>
        </div>

        <div class="goodsname">
          <img :src="item.productSpec.goodsImg.split(',')[0]" alt srcset>
          <span>
          {{item.good.goodsName}}  {{item.productSpec.goodsName}}
          </span>
        </div>

        <div class="price">
            <span>{{item.productSpec.salesPrice}}</span>
        </div>

        <div class="num">
            <div @click="reduce(item)">-</div>
            <div>{{item.goodsNum}}</div>
            <div @click="add(item)">+</div>
        </div>

        <div class="intergal">
           {{item.good.integral==null?"无积分":item.good.integral}}
        </div>

        <div class="subtotal">
            {{item.productSpec.salesPrice*item.goodsNum}}
        </div>
        <div>
            删除
        </div>
      </div>

       <!-- 总计 -->
    <div class="total">
       商品总价<span>&yen;{{totalMoney}}</span>
       &nbsp; &nbsp; &nbsp;
       <button @click="settlement">去结算</button>
    </div>
    </div>

   

  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
          index:0,//单选全部选择则全选选中
         allselect:{
          flge:false,
         },
         data:null,
         totalMoney:0

        }
    },
    created(){
    axios.get('/apis/api/car/serach',{
      params:{
        token:this.$store.getters.token
      }
    }).then(res=>{
      if(res.data.code==1){
        this.data=res.data.data;
      }
    })
    },
    methods:{
      //结算
      settlement(){
        let arr=[];
        //将选中的商品ID传到核对订单页面
         this.data.forEach((val)=>{
           if(val.chexkBox){
             arr.push(val.productSpec.id)
           }
         })
       this.$router.push({name:"confirmOrder",params:{
         id:arr
       }})
      },
        reduce(item){
         if(item.goodsNum<=1){
         item.goodsNum=1;
         }else{
             item.goodsNum=item.goodsNum-1;
         }
          if(item.chexkBox){
            this.totalMoney-=item.productSpec.salesPrice;
            }
        },
        add(item){
            item.goodsNum++
            if(item.chexkBox){
            this.totalMoney+=item.productSpec.salesPrice;
            }
        },
        select_(item){
            //修改选择框的背景颜色
            item.chexkBox=!item.chexkBox
            //计算总价
            if(item.chexkBox){
              this.index++
             this.totalMoney+=item.productSpec.salesPrice*item.goodsNum
            }else{
              this.index--
                this.totalMoney-=item.productSpec.salesPrice*item.goodsNum
            }
             //单选都选中则全选选中
            if(this.index==this.data.length){
             this.allselect.flge=true;
            }else{
              this.allselect.flge=false;
            }
            
        },
        allselect_(){
            this.allselect.flge=!this.allselect.flge;
            if(this.allselect.flge){
                this.data.forEach((val)=>{
                    val.chexkBox=true;
                    this.totalMoney+=val.productSpec.salesPrice*val.goodsNum
                })
            }else{
              this.data.forEach((val)=>{
                    val.chexkBox=false;
                     this.totalMoney-=val.productSpec.salesPrice*val.goodsNum
                })
            }
        }
    }
};
</script>

<style lang="scss">
.shoppingcart {
  background-color: whitesmoke;
  min-height: 70vh;
  padding: 0vh 10vw 5vh 10vw;
  .top {
    background: white;
    min-height: 10vh;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    align-items: center;
    div {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      span {
        cursor: pointer;
      }
    }
  }
  .car {
       overflow: hidden;
    margin-top: 5vh;
    background: #ffffff;
    .header_,
    .content {
      display: flex;
      justify-content: space-around;
      div {
          flex:1;
        padding: 1.5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        .checkbox {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("./../assets/bg.png") no-repeat -10px -237px;
        }
        .checkboxed {
          background: url("./../assets/bg.png") no-repeat -10px -205px;
        }
      }
    }
    .total{
       
        float: right;
        margin-top: 1.5rem;
        font-size: 1.5rem;
        background: #ffffff;
        button{
            cursor: pointer;
            border-radius: 3rem;
            outline: none;
            background: red;
            border: 0px;
            width: 5vw;
            height: 4vh;
            color: white;
            &:hover{
                color: black;
            }
        }
    }
    .content {
        div{
            padding: 0.5vw;
        }
      .goodsname {
        img {
          width: 5vw;
        }
      }
      .num{
          div{
              width: 1vw;
              display: flex;
              justify-content: center;
              border: 0.1rem solid black;
              cursor: pointer;
          }
      }
    }
  }
}
</style>
