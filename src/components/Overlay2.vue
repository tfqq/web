<template>
  <bm-overlay ref="customOverlay" class="sample" :class="isshow?'active':''" pane="labelPane" @draw="draw" >
    <div class="triangle"></div>
    <div v-if="isshow" class="show_box" @click="loudetail(id)">
      <p style="color:#212121">{{name}}</p>
      <div style="margin:3px 0">{{result.quming}} {{result.sqming}}</div>
      <img
        class="img_class"
        :src="lpImg||'../../static/zhutu.png'"
        :alt="name"
        :title="name"
        @error="errImg()"
      >
    </div>
    <div class="name_class">{{name}}</div>
  </bm-overlay>
</template>

<script>
import {lpDetailApi} from '@/request/api'

export default {
  props: ['id', 'name', 'position', 'isshow'],
  data () {
    return {
      result: {
        image: ['']
      },
      lpImg:'',
      fangyuan: []
    }
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload() // 当位置发生变化时，重新渲染，内部会调用draw
      },
      deep: true
    },
    isshow(newValue,oldValue){
      if(newValue){
        this.detail()
      }
    }
  },
  mounted () {},
  methods: {
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    detail () {
      var id=this.id
      lpDetailApi({ loupan_id: id }).then(res => {
        if (res) {
          this.result = res.data.result
          this.lpImg=this.result.image[0]
        }
      })
    },
    loudetail (id) {
      let {href} = this.$router.resolve({
          path: "/lpdetail",
          query: {id}
      });
      window.open(href, '_blank');
    },
    errImg(){
      this.lpImg='../../static/fail.png'
    }
  }
}
</script>

<style lang="less" scoped>
.sample {
  position: absolute;
  width: 120px;
  height: 35px;
  background-color: #4B6DFF;
  border-radius: 5px;
  cursor: pointer;
}
.triangle{
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%,100%);
  width: 0; 
  height: 0;
  border-width: 7px;
  border-style: solid;
  border-color:#4B6DFF transparent transparent transparent;
}
.active {
  background-color: #FF9F2E;
  .triangle{
      border-color:#FF9F2E transparent transparent transparent;
  }
  z-index: 10
}
.name_class {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translate(-50%);
  font-size: 14px;
  color: #fff;
  width: 95%;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.show_box {
  position: absolute;
  bottom: 35px;
  left: 0px;
  width:180px;
  background: #ffffff;
  cursor: pointer;
  color: #9999;
  font-size: 9px;
  padding: 0.083333rem;
  box-sizing: border-box;
}
.img_class {
  width: 100%;
  height: 1rem;
  border-radius: 3px;
}
</style>
