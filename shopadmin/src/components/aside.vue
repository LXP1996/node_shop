<template>
  <!-- 侧边栏导航 -->
  <div class="aside">
    <el-menu v-for="item in menuData" :key="item.index" :default-active="activeIndex">
      <el-menu-item class="menu-img" index="item.index" v-if="!(item.menuItem.length>0)">
        <img :src="item.imgurl" alt width="25" srcset>
        &nbsp;&nbsp;
        {{item.title}}
      </el-menu-item>
      <el-submenu v-if="item.menuItem.length>0" index="item.index">
        <template slot="title">
          <div class="menu-img">
            <img :src="item.imgurl" alt width="25" srcset>
            &nbsp;&nbsp;{{item.title}}
          </div>
        </template>
        <router-link v-for="items in item.menuItem" :key="items.title" :to="{name:items.src}">
          <el-menu-item  index="items.index">{{items.title}}</el-menu-item>
        </router-link>
      </el-submenu> 
    </el-menu>
  </div>
</template>

<script>
import welcome from "@/assets/welcome.png";
import goods from "@/assets/goods.png";
import order from "@/assets/order.png";
import user from "@/assets/user-name.png";
export default {
  data() {
    return {
      activeIndex: "1",
      menuData: [
        {
          src: "",
          imgurl: welcome,
          index: "1",
          title: "欢迎页",
          menuItem: []
        },
        {
          imgurl: goods,
          index: "2",
          title: "商品管理",
          menuItem: [
            {
              src: "goodsType",
              index: "2 - 1",
              title: "商品类型",
              url: ""
            },
            {
              src: "goodsOnline",
              index: "2 - 2",
              title: "商品发布",
              url: ""
            }, {
              src: "goodslist",
              index: "2 - 3",
              title: "商品列表",
              url: ""
            }
          ]
        },
        {
          imgurl: user,
          index: "3",
          title: "用户管理",
          menuItem: [
            {
              src: "userInfo",
              index: "3 - 1",
              title: "查询用户",
              url: ""
            }
          ]
        },
        {
          imgurl: order,
          index: "4",
          title: "订单管理",
          menuItem: [
            {
              src: "order",
              index: "4 - 1",
              title: "订单查询",
              url: ""
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.aside {
  .el-menu {
    background: #fff;
    border: 1px solid #e2e2e2;
  }
  .el-menu-item {
    border: 1px solid #e2e2e2 {
      bottom: 0px;
    }
  }
  .menu-img img {
    position: absolute;
    left: 30px;
    top: 15px;
  }
  a {
    color: black;
    text-decoration: none;
  }
}
</style>
