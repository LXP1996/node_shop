<template>
  <div class="shoppingcart">
    <div class="top">
      <div>
        <span>我的购物车</span>
      </div>
      <div>
        <span>继续购物></span>
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
          <img src="@/assets/p1.png" alt srcset>
          <span>
            {{item.goodsName}}
          </span>
        </div>

        <div class="price">
            <span>{{item.price}}</span>
        </div>

        <div class="num">
            <div @click="reduce(item)">-</div>
            <div>{{item.count}}</div>
            <div @click="add(item)">+</div>
        </div>

        <div class="intergal">
           {{item.intergal}}
        </div>

        <div class="subtotal">
            {{item.price*item.count}}
        </div>
        <div>
            删除
        </div>
      </div>

       <!-- 总计 -->
    <div class="total">
       商品总价<span>&yen;{{totalMoney}}</span>
       &nbsp; &nbsp; &nbsp;
       <button>去结算</button>
    </div>
    </div>

   

  </div>
</template>
<script>
export default {
    data(){
        return{
          index:0,//单选全部选择则全选选中
         allselect:{
          flge:false,
         },
         data:[{
             chexkBox:false,
             goodsName:"Z3 全面屏 6GB+64GB 极光蓝 颜色：极光蓝",
             price:1798.00,
             count:1,
             intergal:1698,
             subtoal:0,

         },
         {
             chexkBox:false,
             goodsName:"Z3 全面屏 6GB+64GB 极光蓝 颜色：极光蓝",
             price:1798.00,
             count:1,
             intergal:1698,
             subtoal:0,

         }],
         totalMoney:0

        }
    },
    methods:{
        reduce(item){
         if(item.count<=1){
         item.count=1;
         }else{
             item.count=item.count-1;
         }
          if(item.chexkBox){
            this.totalMoney-=item.price;
            }
        },
        add(item){
            item.count++
            if(item.chexkBox){
            this.totalMoney+=item.price;
            }
        },
        select_(item){
            //修改选择框的背景颜色
            item.chexkBox=!item.chexkBox
            //计算总价
            if(item.chexkBox){
              this.index++
             this.totalMoney+=item.price*item.count
            }else{
              this.index--
                this.totalMoney-=item.price*item.count
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
                    this.totalMoney+=val.price*val.count
                })
            }else{
              this.data.forEach((val)=>{
                    val.chexkBox=false;
                     this.totalMoney-=val.price*val.count
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
