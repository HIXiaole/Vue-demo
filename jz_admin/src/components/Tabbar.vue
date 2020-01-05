

<template>
  <mt-tabbar v-model="selected">
    <mt-tab-item id="index" class="tab-item">
      <i class="iconfont icon-shouye" style="font-size:24px"></i>
      <div>主页</div>
    </mt-tab-item>
    <div id="add" class="tab-item center" v-on:click="$router.push('/add')">
      <div>
        <i class="iconfont icon-tianjia" style="font-size:28px"></i>
      </div>
    </div>
    <mt-tab-item id="me" class="tab-item">
      <i class="iconfont icon-yonghu" style="font-size:24px"></i>
      <div>我的</div>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {

  data(){
    return {
      selected:"index"
    }
  },

  created(){
    this.selected = this.$route.path.replace("/", "");
  },

  watch:{
    selected(val,oldVal){
      this.$router.push(val);
    }
  }


};
</script>

<style>
.tab-item {
  min-height: 1.8rem;
}
.tab-item.center{
  background-color: #fafafa;
  box-shadow: 0 -3px 2px rgb(34, 32, 32);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  flex: none;
  margin-top: -10px;
  padding: 0;
}
.tab-item.center>div{
  background-color: #26a2ff;
  color: #fff;
  width: 80%;
  height: 80%;
  margin-left:10%;
  margin-top: 10%;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;;
}

</style>