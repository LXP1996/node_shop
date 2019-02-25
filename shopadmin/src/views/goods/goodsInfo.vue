<template>
  <div class="goodsinfo">
    <!-- 商品名称 -->
    <el-row>
      <el-col :span="15" :offset="4">
        <el-input v-model="goodsname" clearable placeholder="输入商品名称"></el-input>
      </el-col>
    </el-row>
    <!-- 商品是否上架和下架 -->
    <el-row>
      <el-col :span="2" :offset="4">商品状态:</el-col>
      <el-col :span="4">
        <el-radio-group v-model="goodsstate">
          <el-radio :label="true">上架</el-radio>
          <el-radio :label="false">下架</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 添加商品类型 -->
    <el-row>
      <el-col :span="13" :offset="4">
        <el-select @change="two" v-model="topData" placeholder="选择分类">
          <el-option disabled :value="0">顶级分类</el-option>
          <el-option v-for="item in topOption" :key="item.id" :label="item.tname" :value="item.id"></el-option>
        </el-select>
        <!-- 二级分类 -->
        <el-select @change="three" v-if="twoType.state" v-model="twoType.value" placeholder="选择分类">
          <el-option :value="0" disabled>二级分类</el-option>
          <el-option
            v-for="item in twoType.data"
            :key="item.id"
            :label="item.tname"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- 三级分类 -->
        <el-select
          @change="four"
          v-if="threeType.state"
          v-model="threeType.value"
          placeholder="选择分类"
        >
          <el-option :value="0" disabled>二级分类</el-option>
          <el-option
            v-for="item in threeType.data"
            :key="item.id"
            :label="item.tname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 图文混排 -->
    <el-row>
      <el-col :span="13" :offset="4">
        <quill-editor
          class="editor"
          ref="myTextEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="13" :offset="8">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { query_goodsType } from "@/api/goods.js";
export default {
  data() {
    return {
      goodsname: "", //商品名称
      goodsstate: 2, //商品是否上架
      goodstypeID: "", //商品类型ID
      topOption: "", //顶级分类数据
      topData: "", //顶级分类数据
      twoType: {
        state: false,
        data: "",
        value: ""
      },
      threeType: {
        state: false,
        data: "",
        value: ""
      },
      content: null, //富文本编辑
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: "请在这里添加产品描述", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  created() {
    this.getgoodsType(0).then(res => {
      this.topOption = res.data;
    });
  },
  methods: {
    //根据fid获取数据
    getgoodsType(fid) {
      return query_goodsType(fid);
    },
    two() {
      if (this.topData != 0) {
        this.twoType.value = "";
        this.threeType.value = "";
        //根据顶级分类ID查询二级分类
        this.getgoodsType(this.topData).then(res => {
          if (res.code == 1) {
            this.twoType.data = res.data;
            this.twoType.state = true;
            this.threeType.state = false;
          }
        });
        this.goodstypeID = this.topData; //获取类型ID
      }
    },
    three() {
      //根据二级分类ID查询三级分类
      this.getgoodsType(this.twoType.value).then(res => {
        this.threeType.data = res.data;
      });
      this.threeType.state = true;
      this.goodstypeID = this.twoType.value; //获取类型ID
    },
    four() {
      this.goodstypeID = this.threeType.value; //获取类型ID
    },
    // 失去焦点
    onEditorBlur() {},
    // 获得焦点
    onEditorFocus() {},
    // 开始
    onEditorReady() {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
    },
    //保存数据
    save() {
      this.$confirm("是否要保存", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            message: "success",
            type: "success"
          });
          this.$emit("goodsInfo", {
            goodsname: this.goodsname,
            goodsstate: this.goodsstate,
            goodstypeID: this.goodstypeID,
            content: this.content
          });
        })
        .catch(() => {
          this.$message({
            message: "已经取消",
            type: "error"
          });
        });
    },
    //下一步
    next() {
      if (this.validate()) {
        this.$emit("next", "second");
      }
    },
    validate() {
      let flage = false;
      if (this.goodsname == "") {
        this.$message({
          message: "商品名称不能为空",
          type: "error"
        });
      } else if (this.goodsstate == 2) {
        this.$message({
          message: "商品状态不能为空",
          type: "error"
        });
      } else if (this.goodstypeID == "") {
        this.$message({
          message: "商品类型不能为空",
          type: "error"
        });
      } else if (this.content == null) {
        this.$message({
          message: "商品详情不能为空",
          type: "error"
        });
      } else {
        flage = true;
      }
      return flage;
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo {
  .el-button {
    margin-top: 100px;
  }
  .el-row {
    margin-top: 30px;
  }
  .el-col {
    text-align: left;
  }

  .editor {
    line-height: normal !important;
    height: 50vh;
  }
  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }
}
</style>
