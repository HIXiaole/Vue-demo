<template>
  <div id="app">
    <!-- 头部组件 -->
    <Header></Header>

    <!-- 主体盒子 -->
    <div class="view-container">
      <!-- <transition name="slide-fade">
         <router-view></router-view>
      </transition> -->
      <router-view></router-view>
    </div>

    <!-- 底部组件 -->
    <Tabbar v-if="showTabbar"></Tabbar>

  </div>
</template>

<script>


import Header from "./components/Header";
import Tabbar from "./components/Tabbar"


export default {
  name:"app",
  components:{
    Header,
    Tabbar
  },
  data(){
    return {
      
    }
  },
  computed:{
    showTabbar(){
      return this.$route.meta.showTabbar;
    }
  }
}

</script>

<style>
html,body{
  height: 100%;
}
#app{
  height: 100%;
  padding-top: 40px;
  padding-bottom: 55px;
  box-sizing: border-box;
}
.view-container{
  height: 100%;
  overflow: scroll;
}

/*  */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}

</style>
