<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商品信息" name="first">
      <app-goodsinfo :editorData="editorData" :editor1="editor" :flage="flage"  @goodsInfo="goodsInfo" @next="next"></app-goodsinfo>
    </el-tab-pane>
    <el-tab-pane label="商品规格" name="second">
      <app-goodsspec :editorData="editorData" :editor1="editor" @backindex="backindex" @back="back" :msg="msg"></app-goodsspec>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import goodsinfo from "@/views/goods/goodsInfo";
import goodsspec from "@/views/goods/goodsSpec";
export default {
  components: {
    "app-goodsinfo": goodsinfo,
    "app-goodsspec": goodsspec
  },
  data() {
    return {
      msg: "",
      activeName: "first",
      flage:true,//添加新的商品
      editor:false,//修改数据开关
      editorData:null
    };
  },
  methods: {
    goodsInfo(data) {
      this.msg = data;
    },
    next(data) {
      this.activeName = data;
    },
    back(data) {
      this.activeName = data;
    },
    backindex(data) {
      this.flage=false;
      this.activeName = data;
    }
  },
    created() {
    let editordata_= this.$route.params.data//获取商品列表修改数据时传递过来的数据
      if (editordata_!=undefined) {//传递进来data就是修改
        this.editor=true;
        this.editorData=editordata_;
      }
      }
    
};
</script>
<style lang="scss" scoped>
.el-tabs {
  margin: 15px;
}
</style>

