<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商品信息" name="first">
      <app-goodsinfo @goodsInfo="test" @next="next">
        
      </app-goodsinfo>
    </el-tab-pane>
    <el-tab-pane label="商品规格" name="second">商品规格</el-tab-pane>
    <el-tab-pane label="商品详情" name="fourth">商品详情</el-tab-pane>
  </el-tabs>
</template>
<script>
import goodsinfo from "@/views/goods/goodsInfo"
  export default {
    components:{
      "app-goodsinfo":goodsinfo
    },
    data() {
      return {
        msg:"",
        activeName: 'first'
      };
    },
    methods: {
      test(data){
     this.msg=data;
      },
      next(data){
        this.activeName=data;
      }
    }
  };
</script>
<style lang="scss" scoped>
.el-tabs{
 margin: 15px;
}
</style>

