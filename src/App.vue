<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'></router-view>
    <div v-if="showMeiQia">
      <iframe src="https://chatlink.mstatik.com/widget/standalone.html?eid=182761" id="meiqia_chat" scrolling="no" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script type='text/javascript'>
  export default {
    data() {
      return {
        showMeiQia:false
      }
    },

    methods: {
      
    },

    mounted() {
      var defCity = localStorage.getItem('default_shi')
      if(!defCity){
        var moren={ id: '26', xzqming: '杭州市'}
        localStorage.setItem('default_shi',JSON.stringify(moren))
      }
    }
  }
</script>
<style lang='less' scoped>
#meiqia_chat{
  width: 490px;
  height: 580px;
  position: fixed;
  bottom:0;
  right: 20px;
  overflow: hidden;
  z-index: 100
}
</style>
