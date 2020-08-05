<template>
  <bm-overlay
    ref="customOverlay"
    :id="id"
    class="sample"
    :class="{active}"
    pane="labelPane"
    @draw="draw">
    <div class="name_class" v-text="name" ></div>
  </bm-overlay>
  
</template>

<script>
export default {
  props: ['id', 'name', 'num', 'position', 'active'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  mounted() {
    
  },
  methods: {
    handleClick () {
      global.alert('Well done.')
    },
    draw ({el, BMap, map}) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style lang="css" scoped>

.sample {
  position: absolute;
  width: 102px;
  height: 102px;
  border-radius: 50%;
  background:rgba(75,109,255, .9);
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.active {
  background: #ff6224;
}

.name_class {
  position: relative;
  top: 30px;
  font-size: 20px;
}

.num_class {
  position: relative;
  top: 35px;
  font-size: 14px;
}
</style>