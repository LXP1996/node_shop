<template>
  <div class="home">
    <!-- 头部导航栏 -->
    <App-header></App-header>
    <router-view></router-view>
  </div>
</template>

<script>
import header from '@/components/header'


export default {
  name: 'home',
  components: {

    "App-header":header,
  }
}
</script>

<style lang="scss">
   .home{
     width: 100%;
   }
</style>
