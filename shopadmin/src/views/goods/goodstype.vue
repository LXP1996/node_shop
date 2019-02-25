<template>
  <div class="goodstype">
    <el-row>
      <el-col :span="2" :offset="1">
        <!-- 添加商品类型按钮 -->
        <el-button type="primary" @click="add_visbile" icon="el-icon-plus">添加商品类型</el-button>
      </el-col>
    </el-row>
    <!-- 点击添加商品类型按钮渲染添加类型相关视图 
          顶级分类的value是0
    -->
    <el-row v-if="addState">
      <!-- 顶级分类 -->
      <el-col :span="3" :offset="1">
        <el-select @change="((val)=>{oneType_(val)})" v-model="oneType.value" placeholder="请选择分类">
          <el-option :label="'顶级分类'" :value="0"></el-option>
          <el-option v-for="i in optionData" :key="i.id" :label="i.tname" :value="i.id"></el-option>
        </el-select>
      </el-col>

      <!-- 二级分类 -->
      <el-col v-if="oneType.state" :span="3" :offset="1">
        <el-select @change="twoType_" v-model="twoType.value" placeholder="请选择分类">
          <el-option :label="'二级分类'" :value="0"></el-option>
          <el-option v-for="i in twoOptionData" :key="i.id" :label="i.tname" :value="i.id"></el-option>
        </el-select>
      </el-col>

      <!-- 三级分类 -->
      <!-- <el-col v-if="twoType.state" :span="3" offset="1">
        <el-select v-model="selectValue" placeholder="请选择分类">
          <el-option :label="'三级分类'" :value="0"></el-option>
          <el-option v-for="i in optionData" :key="i.id" :label="i.tname" :value="i.id"></el-option>
        </el-select>
      </el-col>-->
      <!-- 商品类型输入框 -->
      <el-col :span="3" :offset="1">
        <el-input v-model="addValue" clearable></el-input>
      </el-col>
      <!-- 新增按钮 -->
      <el-col :span="3" :offset="1">
        <el-button @click="add" type="success" icon="el-icon-plus">添加商品类型</el-button>
      </el-col>
    </el-row>
    <!-- 查询商品类型数据 -->
    <hr>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-tree :data="treeData" :props="defaultProps" accordion></el-tree>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isType: 0, //判断当前添加的是几级分类 0是顶级分类 1 是二级分类 2是三级分类
      f_id: "",
      addValue: "",
      oneType: {
        text: "",
        value: "",
        state: false
      },
      twoType: {
        text: "",
        value: "",
        state: false
      },
      threeType: {
        value: "",
        state: false
      },
      addState: false,
      optionData: null, //顶级分类数据
      twoOptionData: null,

      treeData: null, //树型结构数据
      defaultProps: {
        children: "children",
        label: "tname"
      }
    };
  },
  created() {
    //准备顶级分类数据
    this.getTopType();
    //准备树型结构数据
    this.getTreeData();
  },
  methods: {
    getTopType() {
      //准备顶级分类数据
      axios
        .get("/apis/api/goodsType/serach", {
          params: {
            fid: 0
          }
        })
        .then(res => {
          this.optionData = res.data.data;
        });
    },
    getTreeData() {
      //准备树型结构数据
      axios.get("/apis/api/goodsType/serach").then(res => {
        //给数据加上children
        res.data.data.forEach(val => {
          val.children = [];
        });
        //按照父子关系整理数据
        res.data.data.forEach(val => {
          res.data.data.forEach(v2 => {
            if (val.id == v2.fid) {
              val.children.push(v2);
            }
          });
        });
        //过滤数据
        let newData = res.data.data.filter(v => {
          return v.fid == 0;
        });
        this.treeData = newData;
      });
    },
    getData(fid = null, this_, data_) {
      //根据fid获取数据
      axios
        .get("/apis/api/goodsType/serach", {
          params: {
            fid: fid
          }
        })
        .then(res => {
          this_[data_] = res.data.data;
        });
    },
    oneType_() {
      if (this.oneType.value == 0) {
        this.$message("你选择了顶级分类");
        this.f_id = 0;
        this.oneType.state = false;
        this.twoType.value = "";
        this.isType = 0;
      } else {
        this.twoType.value = "";
        this.oneType.state = true;
        this.f_id = this.oneType.value;
        this.$options.methods.getData(this.f_id, this, "twoOptionData");
      }
    },
    twoType_() {
      if (this.twoType.value == 0) {
        this.$message("你选择了二级分类");
        this.twoType.state = false;
        this.f_id = this.oneType.value;
        this.isType = 1;
      } else {
        this.twoType.state = true;
        this.f_id = this.twoType.value;
      }
    },
    add_visbile() {
      //每次点击添加商品类型按钮初始化数据
      this.oneType.value = "";
      this.twoType.value = "";
      this.oneType.state = false;
      this.twoType.state = false;
      this.addValue = "";
      this.f_id = "";
      this.addState = !this.addState;
    },
    add() {
      if (this.f_id === "") {
        this.$message({
          message: "分类没有选择",
          type: "error"
        });
      } else {
        this.$confirm(`你确定要提交-->${this.addValue}`, "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = new FormData();
            data.append("tname", this.addValue);
            data.append("fid", this.f_id);
            axios.post("/apis/api/goodsType/add", data).then(res => {
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "提交成功"
                });
                //实时添加数据
                if (this.isType == 0) {
                  this.optionData.push(res.data.data);
                } else if (this.isType == 1) {
                  this.twoOptionData.push(res.data.data);
                }

                this.getTreeData();
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.goodstype {
  .el-row {
    margin-top: 15px;
  }
  hr {
    margin-top: 50px;
  }
}
</style>

