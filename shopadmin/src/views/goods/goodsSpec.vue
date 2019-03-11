<template>
  <div class="goodsspec">
    <el-button
      type="success"
      v-for="(item,index) in guigeArr"
      @click="editorGuige(item)"
      :key="index"
    >{{item.goodsName}}</el-button>
    <el-form status-icon :model="rulsForm" :rules="rules2" ref="rulsForm" label-width="100px">
      <el-form-item label="成本价格" prop="costPrice">
        <el-input v-model="rulsForm.costPrice" :clearable="true"></el-input>
      </el-form-item>

      <el-form-item label="销售价格" prop="salesprice">
        <el-input v-model="rulsForm.salesprice" :clearable="true"></el-input>
      </el-form-item>

      <el-form-item label="商品规格" prop="ProductSpecifications">
        <el-input v-model="rulsForm.ProductSpecifications" :clearable="true"></el-input>
      </el-form-item>

      <el-form-item label="库存" prop="inventory">
        <el-input v-model="rulsForm.inventory" :clearable="true"></el-input>
      </el-form-item>

      <el-form-item label="库存预警" prop="InventoryWarning">
        <el-input v-model="rulsForm.InventoryWarning" :clearable="true"></el-input>
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="/apis/api/upload"
          :multiple="true"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          :on-success="uploadsuccess"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传图片</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item v-if="editor1">
        <el-button type="primary" @click="editor_info">修改商品规格数据</el-button>
      </el-form-item>

      <el-form-item v-if="!editor1">
        <el-button v-if="flage" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button v-if="!(flage)" type="primary" @click="addguige">添加规格</el-button>
        <el-button v-if="flage" @click="back">上一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    msg: {},
    editor1: {},
    editorData: {}
  },
  data() {
    //成本价格正则验证
    var validatecostPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("成本价格不能为空"));
      } else if (!Number(value)) {
        return callback(new Error("成本价格必须是数字"));
      } else {
        callback();
      }
    };
    //销售价格正则验证
    var validatesalesprice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("销售价格不能为空"));
      } else if (!Number(value)) {
        return callback(new Error("销售价格必须为数字"));
      } else {
        callback();
      }
    };
    //商品规格正则验证
    var validateProductSpecifications = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("商品规格不能为空"));
      } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)) {
        return callback(new Error("商品规格格必须为数字或者中文或者英文组成"));
      } else {
        callback();
      }
    };
    //库存正则验证
    var validateinventory = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("库存不能为空"));
      } else if (!Number(value)) {
        return callback(new Error("库存必须为数字"));
      } else {
        callback();
      }
    };
    //库存预警正则验证
    var validateInventoryWarning = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("库存预警不能为空"));
      } else if (!Number(value)) {
        return callback(new Error("库存预警必须为数字"));
      } else {
        callback();
      }
    };
    return {
      flage: true, //判断是否再次添加规格
      goodsID: "",
      imgArr: [], //上传图片数组
      fileList2: [],
      specID: null,
      guigeArr: null, //修改规格的数组
      rulsForm: {
        costPrice: "", //成本价格
        salesprice: "", //销售价格
        ProductSpecifications: "", //商品规格
        inventory: "", //库存
        InventoryWarning: "" //库存预警
      },
      rules2: {
        //验证
        costPrice: [{ validator: validatecostPrice, trigger: "blur" }],
        salesprice: [{ validator: validatesalesprice, trigger: "blur" }],
        ProductSpecifications: [
          { validator: validateProductSpecifications, trigger: "blur" }
        ],
        inventory: [{ validator: validateinventory, trigger: "blur" }],
        InventoryWarning: [
          { validator: validateInventoryWarning, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    //判断是否修改数据
    if (this.editor1) {
      //数据回显
      this.guigeArr = this.editorData.productSpecs;
    }
  },
  methods: {
    handleRemove(file, fileList) {
      //将删除的图片从图片数组去除
      this.imgArr.forEach((val, index) => {
        if (val == file.url) {
          this.imgArr.splice(index, 1);
        }
      });
    },
    handlePreview(file, fileList) {},
    uploadsuccess(response, file, fileList) {
      this.imgArr.push(response.data.url); //上传成功添加到图片数组
      console.log(this.imgArr);
    },
    async onSubmit() {
      if (this.msg == "") {
        this.$message({
          message: "请完善商品基础信息--》或者没有保存",
          type: "error"
        });
      } else {
        //存储数据
        // axios.all([this.saveBaseGoods(), this.saveGoodsguige()]).then(
        //   axios.spread(function(one, two) {
        //     console.log(one, two);
        //   })
        // );
        await this.saveBaseGoods().then(res => {
          this.goodsID = res.data.data.id;
        });
        await this.saveGoodsguige().then(res => {
          if (res.data.code == 1) {
            this.$confirm("商品发布成功,是否要继续添加商品规格", "提示", {
              confirmButtonText: "继续添加规格",
              cancelButtonText: "返回继续添加商品",
              type: "success"
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "继续添加规格"
                });
                //初始化数据
                this.initdata(false);
              })
              .catch(() => {
                this.initdata(true);
                this.$emit("backindex", "first");
                this.$message({
                  type: "info",
                  message: "返回首页"
                });
              });
          }
        });
      }
    },
    //提交商品基础信息
    saveBaseGoods() {
      let data = new FormData();
      data.append("goodsName", this.msg.goodsname);
      data.append("goodsState", this.msg.goodsstate);
      data.append("goodsTypeID", this.msg.goodstypeID);
      data.append("imgText", this.msg.content);
      data.append("desc", this.msg.desc);
      data.append("integral", this.msg.integral);
      return axios.post("/apis/api/goodsBase/add", data);
    },
    //提交商品规格
    saveGoodsguige() {
      let data = new FormData();

      data.append("costPrice", this.rulsForm.costPrice);
      data.append("salesPrice", this.rulsForm.salesprice);
      data.append("goodsName", this.rulsForm.ProductSpecifications);
      data.append("inventory", this.rulsForm.inventory);
      data.append("inventoryWarning", this.rulsForm.InventoryWarning);
      data.append("goodsID", this.goodsID);
      data.append("goodsImg", this.imgArr);
      return axios.post("/apis/api/goodsProduct/add", data);
    },
    back() {
      //返回上一步
      this.$emit("back", "first");
    },
    initdata(flage) {
      this.flage = flage;
      this.rulsForm.costPrice = "";
      this.rulsForm.salesprice = "";
      this.rulsForm.inventory = "";
      this.rulsForm.InventoryWarning = "";
      this.rulsForm.ProductSpecifications = "";
      this.fileList2 = [];
      this.imgArr = [];
    },
    addguige() {
      //增加规格
      this.saveGoodsguige().then(res => {
        if (res.data.code == 1) {
          this.$confirm("商品发布成功,是否要继续添加商品规格", "提示", {
            confirmButtonText: "继续添加规格",
            cancelButtonText: "返回继续添加商品",
            type: "success"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "继续添加规格"
              });
              //初始化数据
              this.initdata(false);
            })
            .catch(() => {
              this.$emit("backindex", "first");
              this.$message({
                type: "info",
                message: "返回首页"
              });
            });

          this.initdata();
        }
      });
    },
    //规格修改
    editorGuige(item) {
      //切换商品规格图片数组初始化
      this.imgArr = [];
      this.rulsForm.costPrice = item.costPrice;
      this.rulsForm.salesprice = item.salesPrice;
      this.rulsForm.inventory = item.inventory;
      this.rulsForm.InventoryWarning = item.inventoryWarning;
      this.rulsForm.ProductSpecifications = item.goodsName;
      this.specID = item.id;
      let arr = [];
      let obj = {}; //存储图片
      for (let index = 0; index < item.goodsImg.split(",").length; index++) {
        obj.url = item.goodsImg.split(",")[index];
        arr.push(obj);
        obj = {};
        //图片放入图片数组准备修改
        this.imgArr.push(item.goodsImg.split(",")[index]);
      }
      this.fileList2 = arr;
    },
    editor_info() {
      //修改商品规格数据
      let data = new FormData();
      data.append("goodsName", this.rulsForm.ProductSpecifications);
      data.append("costPrice", this.rulsForm.costPrice);
      data.append("salesPrice", this.rulsForm.salesprice);
      data.append("inventory", this.rulsForm.inventory);
      data.append("inventoryWarning", this.rulsForm.InventoryWarning);
      data.append("goodsImg", this.imgArr);
      data.append("id", this.specID);

      axios.post("/apis/api/updata_productSpec", data).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: "success"
          });
        } else {
          this.$message({
            type: "error",
            message: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-form {
  margin-top: 15px;
}
</style>
