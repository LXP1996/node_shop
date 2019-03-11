<template>
  <div class="ppt">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="@/assets/A1.jpg" alt srcset>
        </div>
        <div class="swiper-slide">
          <img src="@/assets/A2.jpg" alt srcset>
        </div>
        <div class="swiper-slide">
          <img src="@/assets/A3.jpg" alt srcset>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 如果需要滚动条
      <div class="swiper-scrollbar"></div>-->
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
      autoplay: true,
      speed: 1000,
      loop: true,
      // 如果需要分页器
    //   pagination: ".swiper-pagination",
      // 如果需要前进后退按钮
     navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
      // 如果需要滚动条
      // scrollbar: '.swiper-scrollbar',
    });
  }
};
</script>
<style lang="scss">
.swiper-container {
  width: 100%;
  img {
    width: 100vw;
  }
}
</style>