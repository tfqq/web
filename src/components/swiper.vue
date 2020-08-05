<template>
  <div id="slider" ref="getWidth">
    <div class="jianTou"  @click="move(1)" v-if="sliders.length>3">
      <div class="jianTou_l"></div>
    </div>
    <div class="window" :class="sliders.length>3?'marLeft':''">
       <ul class="container" :style="containerStyle">
        <li  v-for="(item, index) in sliders" :key="index" :style="{width:imgWidth+'px'}" :class="currentIndex==index?'active':''" @click="showImg(index)">
          <div v-if="item.type==2">
              <img src="../../static/video.png" alt="" class="videoImg" style="width:40px;height:25px">
          </div>
          <img :src="item.image|| item" alt=""  v-else>
        </li>
      </ul>
    </div>
    <div class="jianTou" v-if="sliders.length>3" @click="move(-1)">
      <div class="jianTou_r"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'slider',
  props: {
    sliders: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      imgWidth:0,
      distance:0,
      transitionEnd: true,
      currentIndex:0
    }
  },
  computed:{
    containerStyle() {
      return {
        transform:`translate(${this.distance}px, 0)`
      }
    }
  },
  watch:{
    sliders(newValue,oldValue){
      if(newValue.length>3){
        var width=(this.$refs.getWidth.offsetWidth-80)/3
      }else{
        var width=(this.$refs.getWidth.offsetWidth)/3
      }
      this.imgWidth=width
    }
  },
  mounted() {
  },
  methods:{
    move(direction,type) {
      var offset=this.imgWidth
      var length=this.sliders.length  
      if (!this.transitionEnd) return
      this.transitionEnd = false
      if(direction==-1){
        var currentIndex=this.currentIndex + 1
      }else{
        var currentIndex=this.currentIndex -1
      }
      if(currentIndex==length){
        var currentIndex =0
        this.distance =0
      }else{
        if(currentIndex>2){
          var destination = this.distance + offset * direction
          this.distance =destination
        }else{
          if(currentIndex==2){
            this.distance =0
          }
          if(currentIndex <0){
            var currentIndex = length-1
            var transitionIndex=length-3//移动的个数    
            const destination = offset*transitionIndex*(-1)
            this.distance =destination
          }
        }
      }
      
      this.$emit('chooseImg', currentIndex)
      this.transitionEnd = true
      this.currentIndex=currentIndex
    },
    showImg(index){
      this.currentIndex=index
      this.$emit('chooseImg',index)
    }
  }
}
</script>
<style lang="less" scoped>
ol,ul{
  list-style: none;
}
#slider{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.window{
  flex:1;
  position:relative;
  overflow:hidden;
  height: 110px;
}
.marLeft{
  margin-left:10px
}
.container{
  display:flex;
  position:absolute;
  height: 100%;
  transition: transform .5s;
  li{
    opacity: .6;
    height: 100%;
    cursor: pointer;
    border-radius: 5px;
    div{
      position: relative;
      height: 100%;
      width: 95%;
      float: left;
      border-radius: 5px; 
      background:linear-gradient(270deg,rgba(70,70,70,1) 0%,rgba(102,102,102,1) 100%);
      color: #fff;
      img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          width: 40px;
          height: 40px;
      }
    }
    img{
        width: 95%;
        height: 100%;
        float: left;
        border-radius: 5px;
    }
  }
  .active{
      opacity: 1;
  }
}
.left, .right{
  width:35px;
  height:35px;
  cursor:pointer;
  user-select: none;
}
</style>
