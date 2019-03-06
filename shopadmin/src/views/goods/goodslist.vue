<template>
  <div class="goodslist">
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goodsType.tname" label="商品类型"></el-table-column>
      <el-table-column prop="goodsState" label="商品状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" @click="editor(scope.row)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="tatol">
    </el-pagination>
  </div>
    </template>
    <!-- 查看商品详情 -->
    <el-dialog v-if="dialog" title="商品详情" :visible.sync="dialog">
      <el-row>
        <el-col :span="3">商品名称:</el-col>
        <el-col :span="10">{{data.goodsName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">商品状态:</el-col>
        <el-col :span="10">{{data.goodsState='true'?'已上架':'已下架'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">商品类型:</el-col>
        <el-col :span="10">{{data.goodsType.tname}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">商品规格:</el-col>
        <el-row v-for="(item,index) in goodsguige" :key="index">
          <el-row>
            <el-col :offset="2" :span="3">规格名称:</el-col>
            <el-col :span="10">{{item.goodsName}}</el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="3">成本价格:</el-col>
            <el-col :span="10">{{item.costPrice}}</el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="3">销售价格:</el-col>
            <el-col :span="10">{{item.salesPrice}}</el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="3">库存:</el-col>
            <el-col :span="10">{{item.inventory}}</el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="3">库存预警:</el-col>
            <el-col :span="10">{{item.inventoryWarning}}</el-col>
          </el-row>
          <el-row>
            <el-col :offset="2" :span="3">规格图片:</el-col>
          </el-row>
          <el-row>
            <el-col :offset="6" v-for="(img,i) in item.goodsImg.split(',')" :key="i">
              <img :src="img" alt srcset>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tatol:null,
      dialog: false,
      tableData: [],
      data: null,
      goodsguige: null
    };
  },
  created() {
    //初始化数据
    axios
      .get("/apis/api/goodsProduct/serach", {
        params: {
          limit: 10,
          offset: 0
        }
      })
      .then(res => {
        this.tableData = res.data.data;
        this.tatol=res.data.count
      });
  },
  methods: {
    handleSizeChange(e){
     console.log(e)
    },
    handleCurrentChange(e){
      //处理分页
     axios
      .get("/apis/api/goodsProduct/serach", {
        params: {
          limit: e*10,
          offset: (e-1)*10
        }
      })
      .then(res => {
        this.tableData = res.data.data;
        this.tatol=res.data.count
      });
    },
    handleClick(row) {
      //根据商品ID获取商品信息
      axios
        .get("/apis/api/goodsProduct/serachall", {
          params: {
            id: row.id
          }
        })
        .then(res => {
          this.data = res.data.data[0];
          this.goodsguige = this.data.productSpecs;

          this.dialog = true;
        });
    },
    //修改商品数据
    editor(row){
     //跳转到商品发布组件修改商品数据
      axios
        .get("/apis/api/goodsProduct/serachall", {
          params: {
            id: row.id
          }
        })
        .then(res => {
          this.$router.push({name:'goodsOnline',params:{
       data:res.data.data[0]//将商品ID传过去
     }})
        });
    
    }
      }
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 15px;
}
img {
  width: 30%;
}
.block{
  position: absolute;
  bottom: -30px;
  overflow: hidden;
}
</style>
