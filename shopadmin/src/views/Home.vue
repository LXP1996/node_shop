<template>
  <div class="home">
    <el-row type="flex">
      <!-- 侧边栏导航组件放在这里 -->
      <el-col :span="4">
        <app-aside></app-aside>
      </el-col>
      <!-- 由侧边栏导航路由的组件放在这里 -->
      <el-col :span="20" class="content">
        <transition name="slide">
          <router-view></router-view>
        </transition>
       
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import aside from "@/components/aside";
export default {
  name: "home",
  data(){
    return{
    }
  },
  components: {
    "app-aside": aside
  }
};
</script>
<style lang="scss" scoped>
.content{
  min-height: 80vh;
}
</style>
