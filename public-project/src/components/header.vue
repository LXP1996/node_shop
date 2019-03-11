<template>
  <div class="header">
    <!-- logo -->
    <div class="logo">lxp商城</div>
    <ul class="navbar" v-if="!serachFlge">
      <li v-for="(item,index) in headerDtata" :key="index">
        <router-link
          :class="{'changeColor':item.flage}"
          @click.native="changeColor1(item)"
          to
        >{{item.title}}</router-link>
      </li>
    </ul>
    <div class="serach" v-if="serachFlge">
      <input placeholder="请输入要搜索的内容" type="text">
    </div>
    <span @click="serachFlge=!serachFlge">
      <img src="@/assets/serach.png" alt>
    </span>
    <!-- 个人菜单 -->
    <ul class="user_menu">
      <li class="li" @mouseenter="flage=true" @mouseleave="flage=false">
        <img src="@/assets/user-name.png" alt>
        <transition name="fade">
          <ul v-show="flage" class="menu">
             <router-link tag="li" :to="{name:'shoppingcart'}"> <img src="@/assets/car.png" alt="">购物车</router-link>
            <li> <img src="@/assets/order.png" alt="">我的订单</li>
            <li> <img src="@/assets/shop.png" alt="">我的商城</li>
            <li>
              <img src="@/assets/user.png" alt="">
              登录/注册</li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serachFlge:false,
      flage: false,
      headerDtata: [
        {
          flage: false,
          title: "IQOO"
        },
        {
          flage: false,
          title: "NEX系列"
        },
        {
          flage: false,
          title: "X系列"
        },
        {
          flage: false,
          title: "Z系列"
        },
        {
          flage: false,
          title: "Y系列"
        },
        {
          flage: false,
          title: "U系列"
        },
        {
          flage: true,
          title: "商城"
        },
        {
          flage: false,
          title: "服务"
        },
        {
          flage: false,
          title: "社区"
        }
      ]
    };
  },
  mounted(){
   
  },
    methods: {
    //选中导航栏改变字体颜色
    changeColor1(item) {
      this.headerDtata.forEach(val => {
        val.flage = false;
      });
      item.flage = true;
    }
  }
};
</script>

<style lang="scss">
@mixin center {
  //水平居中
  display: flex;
  justify-content: center;
}
@mixin vertical {
  //垂直居中+水平居中
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin space-around {
  //环绕对齐
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@mixin space-bettwen {
  //
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.changeColor {
  color: gray !important;
}

.header {
  width: 100%;
  @include space-around;
  height: 44px;
  background-color: rgba(26, 26, 26, 0.9);
  .logo {
    width: 10vw;
    color: blueviolet;
    font-size: 1.7rem;
  }
  .serach{
    width: 70vw;
    input{
      width: 80%;
      border: 0.1rem solid lightblue;
      border-radius: 0.2rem;
      background: transparent;
      height: 30px;
    }
  }
  //中间导航栏样式
  .navbar {
    height: 44px;
    list-style: none;
    width: 70vw;
    @include space-around();
    li {
      a {
        font-size: 1.5rem;
        text-decoration: none;
        color: white;
        &:hover {
          color: rebeccapurple;
        }
      }
    }
  }
  // 搜索图标
  span {
    width: 5vw;
    img {
      width: 1.7rem;
      height: 1.7rem;
      cursor: pointer;
    }
  }
// 个人菜单样式
  .user_menu {
   z-index: 100;
    width: 5vw;
    list-style: none;
    img {
      width: 1.7rem;
      height: 1.7rem;
      cursor: pointer;
    }
    .li {
      position: relative;
      padding: 1rem;
    }
    // 下拉菜单样式
    .menu {
      list-style: none;
      justify-content: center;
      background: white;
      width: 15rem;
      right: 2rem;
      top:4.1rem;
      position: absolute;
      border: 0.1rem solid skyblue;
      color: black;
      box-sizing: border-box;
       li{
        @include space-around();
         padding: 1.5rem;
         &:hover{
           cursor: pointer;
           background: lightgray;
         }
       }
    }
  }
}
</style>