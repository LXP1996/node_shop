<template>
  <div id="app">
      <!-- 页面头部导航区域 -->
      <app-header></app-header>
        <!-- 路由Home组件 -->
        <i v-if="state" class="el-icon-loading"></i>
        <router-view></router-view>
  </div>
</template>

<script>
import header from '@/components/header'
export default {
  name: 'app',
  components: {
      "app-header":header
  },
  data(){
    return {
    state:true
    }
  },
  beforeCreate(){
    
  },
  mounted(){
   this.state=false;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0px;
}
</style>
