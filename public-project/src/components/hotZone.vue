<template>
    <div class="hotZoon">
        <!-- 标题 -->
       <div class="title">
         <span>  {{title}}</span>
           <ul class="more">
               <li>更多></li>
           </ul>
       </div>
       <!-- 内容 -->
      <div class="content">
          <div v-if="content.length==0">
             <img src="@/assets/notData.png" alt="" srcset="">
             <p>暂无数据</p>
         </div>
         <div @click="buyPage(item)" v-else class="box" v-for="(item,index) in content" :key="index">
             <img v-lazy="item.productSpecs[0].goodsImg.split(',')[0]" alt="">
             <p>{{item.goodsName}}&nbsp;&nbsp;{{item.productSpecs[0].goodsName}}</p>
             <p class="price">&yen;{{item.productSpecs[0].salesPrice}}</p>
         </div>
      </div>


       <div class="title">
         <span>  {{'精品专场'}}</span>
           <ul class="more">
               <li>更多></li>
           </ul>
       </div>
       <div class="content">
         <div v-if="content.length==0">
             <img src="@/assets/notData.png" alt="" srcset="">
             <p>暂无数据</p>
         </div>
         <div v-else class="box" v-for="(item,index) in content" :key="index">
             
             <img  v-lazy="item.productSpecs[0].goodsImg.split(',')[0]" alt="">
             <p>{{item.goodsName}}&nbsp;&nbsp;{{item.productSpecs[0].goodsName}}</p>
             <p class="price">&yen;{{item.productSpecs[0].salesPrice}}</p>
         </div>
      </div>

    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            title:'热卖专区',
            content:[]
        }
       
    },
    created(){
      this.getGoodsData("热卖专场","content")
    },
    methods:{
        //获取商品数据
        getGoodsData(type,data){
          axios.get('/apis/api/goodsProduct/serach',{
           params:{
               type:type
           }
       }).then(res=>{
           if(res.data.code=="1"){
              this[data]=res.data.data;
           }
       })
        },
        buyPage(item){
            //跳转到购买页面
            window.sessionStorage.setItem("goodsID",item.id)
            this.$router.push({name:"buyPage"})
        }
    }
}
</script>
<style lang="scss">
   .hotZoon{
        text-align: center;
       padding-top: 2rem;
       margin-left: 5rem;
       margin-right: 5rem;
     .title{
         margin-top: 1.5rem;
         overflow: hidden;
         font-size: 2.2rem;
         .more{
             float:right;
             list-style: none;
             font-size: 1.7rem;
             &:hover{
                 cursor: pointer;
                 color:blue;
             }
         }
     }
     .content{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
        min-height: 50vh;
        img{
             margin-top:5rem;
        }
         .box{
             min-height: 30vh;
             margin-top:1.5rem; 
              text-align: center;
             background: white;
             width:26vw;
            
             img{
                
                width: 15vw;
             }
             p{
                 padding-top: 1.5rem;
                 font-size: 1.7rem;
             }
             .price{
                 color: red;
                  font-size: 1.7rem;
                  margin-bottom: 1.5rem;
             }
             &:hover{
                 cursor: pointer;
                 transform: translate3d(0,-0.2rem,0);
                 box-shadow: 0 1.5rem 3rem rgba(0,0,0,.1);
             }
         }
     }
   }
</style>


