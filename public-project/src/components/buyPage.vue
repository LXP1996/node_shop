<template>
  <div class="buyPage">
    <div class="menu">
      <router-link :to="{name:'index'}">商城首页</router-link>
      <span>&gt;</span>
    </div>
    <div class="box">
      <div class="left">
        <div class="preview">
          <img :src="pre_img" alt>
        </div>
        <ul>
          <li
            @mouseenter="pre_img_(item)"
            v-for="(item,index) in guige.goodsImg.split(',')"
            :key="index"
          >
            <img :src="item" alt>
          </li>
        </ul>
      </div>
      <div class="right">
        <p></p>
        <h3>{{data.goodsName}}</h3>
        <p>{{data.desc}}</p>
        <hr>
        <div class="price">
          <div class="price_">价格:&nbsp;&nbsp;
            <span>&yen; {{guige.salesPrice}}</span>
          </div>|
          <div class="integral">积分:&nbsp;&nbsp;
            <span>{{data.integral}}</span>
          </div>
        </div>
        <hr>
        <!-- 版本 -->
        <div class="version">
          <p>版本</p>
          <div
            @click="version(item)"
            v-for="(item,index) in data.productSpecs"
            :key="index"
          >{{item.goodsName}}</div>
        </div>
        <!-- 数量 -->
        <hr>
        <div class="num">
          <div class="reduce" @click="reduce">-</div>
          <div class="count">{{count}}</div>
          <div @click="add">+</div>
        </div>
        <hr>
        <!-- 已选 -->
        <div class="select">
          <span>已选:</span>
          <span>&yen; {{guige.salesPrice}}</span>
          <span>{{guige.goodsName}}</span>
        </div>
        <hr>
        <div class="btn-group">
          <button class="btn-car" @click="add_car">加入购物车</button>
          <button class="btn-buy">立即购买</button>
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
      data: "",
      pre_img: "",
      guige: "",
      count: 1
    };
  },
  async created() {
    await axios
      .get("/apis/api/goodsProduct/serachall", {
        params: {
          id: window.sessionStorage.getItem("goodsID")
        }
      })
      .then(res => {
        this.data = res.data.data[0];
        this.pre_img = this.data.productSpecs[0].goodsImg.split(",")[0];
        this.guige = this.data.productSpecs[0];
      });
  },
  methods: {
    pre_img_(e) {
      this.pre_img = e;
    },
    version(item) {
      this.guige = item;
    },
    reduce() {
      if (this.count <= 1) {
        this.count = 1;
      } else {
        this.count--;
      }
    },
    add() {
      this.count = this.count + 1;
    },
    //加入购物车
    add_car() {
      let data = new FormData();
      data.append("goodsID", this.guige.goodsID);
      data.append("goodsNum", this.count);
      data.append("goods_ID", this.guige.id);
      data.append("token",this.$store.getters.token)
      axios.post("/apis/api/car/add", data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: "成功加入购物车"
          });
        }else{
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.buyPage {
  padding-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: black;
  }
  .box {
    margin-top: 4.5rem;
    width: 70vw;
    display: flex;
    .left {
      width: 30vw;

      flex-wrap: wrap;
      .preview {
        img {
          width: 30vw;
        }
      }
      ul {
        display: flex;
        overflow: hidden;
        width: 30vw;
        list-style: none;

        img {
          width: 7vw;
          cursor: pointer;
        }
      }
    }
    .right {
      width: 40vw;
      text-align: center;
      font-size: 1.7rem;
      p {
        margin-top: 1.5rem;
      }
      hr {
        margin-top: 1.5rem;
      }
      .price {
        font-size: 1.5rem;
        font-size: 3rem;
        margin-top: 4.5rem;
        margin-bottom: 4.5rem;
        display: flex;
        justify-content: space-around;
        .price_ {
          span {
            color: red;
          }
        }
      }
      .version {
        text-align: start;
        div {
          cursor: pointer;
          margin-top: 4.5rem;
          margin-bottom: 4.5rem;
          width: 10vw;
          padding: 1rem;
          text-align: center;
          border: 0.1rem solid black;
        }
      }
      .num {
        display: flex;
        width: 40vw;
        justify-content: center;
        margin-top: 4.5rem;
        margin-bottom: 4.5rem;
        div {
          font-size: 1.5rem;
          cursor: pointer;
          width: 4vw;
          border: 1px solid black;
          height: 2vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .select {
        display: flex;
        justify-content: space-between;
        margin-top: 4.5rem;
      }

      .btn-group {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-around;
        button {
          border-radius: 2rem;
          width: 10vw;
          height: 4rem;
          cursor: pointer;
          border: 0px;
          &:focus {
            border-style: none;
            outline-style: none;
          }
        }
        .btn-car {
          background: #ff9536;
          color: #ffffff;
        }
        .btn-buy {
          background: red;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
