<template>
  <div id="app">
    <keep-alive include="venue,addActive">
      <router-view/>
    </keep-alive>
    <van-tabbar v-model="active" route v-if="showTabBar">
            <van-tabbar-item icon="home-o" to='/venue'>场馆</van-tabbar-item>
            <van-tabbar-item icon="search" to='/game'>活动</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to='/find'>发现</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to='/about' >关于</van-tabbar-item>
        </van-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:0,
      showTabBar:true,
      }
  },
  watch:{

    $route(to,from){
       //console.log(to);
       let whiteList = ['venue','game','find','about'];
       if(whiteList.indexOf(to.name) == -1){
          this.showTabBar = false;
       }else{
          this.showTabBar = true;
       }
    }

  }
}
</script>
<style lang="less">


</style>
