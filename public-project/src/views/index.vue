<template>
  <div class="index">
    <!-- 头部导航栏 -->

    <App-ppt></App-ppt>
    <App-hot></App-hot>
  </div>
</template>
<script>
// @ is an alias to /src
import hotzoon from '@/components/hotZone'
import ppt from '@/components/ppt'

export default {
  components: {
    "App-hot":hotzoon,
    "App-ppt":ppt,
  }
}
</script>
<style lang="scss">
   .index{
     padding: 0rem;
     margin: 0rem;
     width: 100%;
     background: whitesmoke;
   }
</style>