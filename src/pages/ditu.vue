<template>
  <div class="content">
    <Header bg="map"></Header>
    <se  @chuan="check" title="ditu"></se>
    <baidu-map
      class="map"
      :center="center"
      :scroll-wheel-zoom="true"
      :zoom="zoom"
      :min-zoom="10"
      :max-zoom="20"
      :map-click=false
      @moveend="moveEnd"
      @zoomend="zoomHandler"
      @load="loadHandler"
      @ready="handler"
    >
      <bm-control class="search_box">
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-col :span="5">
            <label for="区域">区域:</label>
            <el-select
              v-model="qy"
              style="width: 126px;"
              size="mini"
              placeholder="请选择"
              @change="chooseqy"
            >
              <el-option
                v-for="item in quyu_filter"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled=false
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <label for="区域">面积:</label>
            <el-select
              v-model="mianji"
              style="width: 126px;"
              size="mini"
              placeholder="请选择"
              @change="choosemj"
            >
              <el-option
                v-for="item in mianjiArr"
                :key="item.lxid"
                :label="item.lxming"
                :value="item.lxid"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <label for="区域">价位:</label>
            <el-select
              v-model="jiage"
              style="width: 126px;"
              size="mini"
              placeholder="请选择"
              @change="choosejw"
            >
              <el-option
                v-for="item in jiageArr"
                :key="item.lxid"
                :label="item.lxming"
                :value="item.lxid"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-button size="mini" class="" @click="fan">返回列表</el-button>
          </el-col>
        </el-row>
      </bm-control>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <my-overlay
        v-if="content.length"
        v-for="(item, index) in content"
        :key="index"
        :id="item.id"
        :position="{lng: item.lng, lat: item.lat}"
        :type="item.type"
        :name="item.name"
        :num="item.total"
        :active="item.id == current_id"
        @click.native="toSq(item)"
        @mouseover.native="addActive(item.id)"
        @mouseleave.native="delActive(item.id)"
      ></my-overlay>
      <overlay2
        ref="customOver"
        v-if="content2.length"
        v-for="(item, index) in content2"
        :key="index"
        :id="item.id"
        :position="{lng: item.lng, lat: item.lat}"
        :name="item.name"
        :isshow="item.id == current_id"
        @dblclick.native="storageDetail(item.id)"
        @mouseover.native="addActive(item.id)"
        @mouseleave.native="delActive(item.id)"
      ></overlay2>
    </baidu-map>
  </div>
</template>

<script>
import Header from '../components/header'
import se from '../components/search.vue'
import MyOverlay from '../components/MyOverlay'
import Overlay2 from '../components/Overlay2'
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'zQ0lT9jZT2TUIbqu4nGZDUVbuksHZzLW'
})
import {mapApi,mianjiApi,jiageApi} from '@/request/api'
export default {
  metaInfo: {
      meta: [
        {
          name: 'keywords',
          content: '写字楼出租地图,办公室出租电子地图,写字楼出租'
        }
      ]
  },
  components: {
    Header,
    se,
    MyOverlay,
    Overlay2
  },
  data () {
    return {
      active: false,
      content: [], // 获取地图数据
      current_id: 0, // 当前选中的id
      qy: '',
      quyu_filter:[],
      mianji: '',
      mianjiArr: [],
      jiage: '',
      jiageArr: [],
      zoom: 13,
      center: {
        lng:120.20523,
        lat: 30.25727
      },
      id: '',
      zd: 0.0,
      xd: 0.0,
      ne: 0.0,
      je: 0.0,
      content2: [],
      params: {
        type: 1,
        id: 0,
        zd: 0.0,
        xd: 0.0,
        ne: 0.0,
        je: 0.0,
        sh_id: '',
        zj_id: '', // 租价id
        lng: '', //  经度
        lat: '', // 纬度
        offset: '', // 偏移
        mj_id: '', // 面积id
        qu_id: '', // 区id
        search:''
      } // 地图参数
    }
  },
  mounted () {
    // 开启鼠标滚轮缩放
    var default1 = JSON.parse(localStorage.getItem('default_shi'))
    this.params.sh_id = default1 === null ? 26: default1.id ||26
    this.params.id = this.params.sh_id
    this.getBaseInfo()
  },
  methods: {
    // 地图
    getMap () {
      mapApi(this.params).then(res => {
        var result=res.data.result
        if(result.length){
          if(result[0].type!='L'){
            this.content = result
            this.content2 = []
          }else{
              this.content2 = result
              this.content = []
          }
        }else{
          this.content2 = []
          this.content = []
        }
        
        //加入区域选择
        if (this.content.length>0 && this.content[0].type == "P") {
          this.quyu_filter = this.content.slice(0)
          this.quyu_filter.unshift({ id: 0, name: '不限', lng:this.center.lng, lat:this.center.lat})
        }
      })
    },
    // 基本配置
    getBaseInfo(){
        // 面积
        mianjiApi().then(res => {
          this.mianjiArr = res.data.result
        })
        // 价格
        jiageApi().then(res => {
          this.jiageArr = res.data.result
        })
    },
    addActive (id) {
      this.current_id = id
    },
    delActive () {
      this.current_id = 0
    },
    toSq (item) {
      if (item.type === 'P') {
        this.params.qu_id = item.id
        this.zoom = 14
      } else if (item.type === 'S') {
        this.params.sq_id = item.id
        this.zoom = 16
      }else{
        this.zoom = 16
      }
      this.set_quyu_center_point(item.lat,item.lng)
      this.getMap()
      this.delActive()
    },
    zoomHandler (e) {
      var area = e.target.getBounds()
      this.params.zd = area.Zd
      this.params.xd = area.Xd
      this.params.ne = area.Ne
      this.params.je = area.Je
      var zoom = e.target.getZoom()
      if (zoom <= 13) {
        this.params.id = this.params.sh_id
        this.params.type = 1
        this.getMap()
      } else if (zoom === 14 || zoom === 15) {
        this.params.type = 2
        this.getMap()
      } else {
        this.params.type = 3
        this.getMap()
      }
      this.zoom = zoom
    },
    loadHandler (e) {
    },
    handler ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
    },
    // 双击事件
    storageDetail(id){
      let {href} = this.$router.resolve({
          path: "/lpdetail",
          query: {id}
      });
      window.open(href, '_blank');
    },
    // 搜索框
    check (data) {
      this.$router.push({
        name: 'write',
        params:{search:data}
      })
    },
    // 移动地图
    moveEnd (e) {
      var area = e.target.getBounds()
      this.params.zd = area.Zd
      this.params.xd = area.Xd
      this.params.ne = area.Ne
      this.params.je = area.Je
      this.getMap()
    },
    // 移动到中心点
    set_quyu_center_point(lat,lng) {
      if(lat){
        var lat=lat
        var lng=lng
      }else{
        var content=this.content.length?this.content:this.content2
        // 先设置默认值
        var lng=120.20523
        var lat=30.25727
        if(content.length){
          var middle=content.length/2
          if(content.length%2!=0){
              var index=(content.length-1)/2
              lat=content[index]['lat']
              lng=content[index]['lng']
          }else{
              var index=(content.length)/2
              lat=content[index]['lat']
              lng=content[index]['lng']
          }
        }
      }
      let z = this.zoom>=15? this.zoom:15
      this.map.centerAndZoom(new BMap.Point(lng, lat), z)
    },
    // 选择面积
    choosemj (e) {
      this.params.mj_id = e
      this.params.type = 3
      this.getMap()
      this.zoom = 16
      this.set_quyu_center_point()
    },
    // 选择单价
    choosejw (e) {
      this.params.zj_id = e
      this.params.type = 3
      this.getMap()
      this.zoom = 16
      this.set_quyu_center_point()
    },
    // 选择区域
    chooseqy (e) {
      this.params.qu_id = e
      var item = this.quyu_filter.find(function (obj) {
        return obj.id == e
      })
      if (this.params.zj_id>0 || this.params.mj_id>0) {
        this.params.type = 3
        this.zoom = 16
      } else {
        this.params.type = 2
        this.zoom = 15
      }
      this.getMap()
      this.set_quyu_center_point(item.lat,item.lng)
    },
    // 返回列表
    fan () {
      this.$router.push({ name: 'good' })
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: calc(100vh - 132px);
}
/deep/ .ui_city_change_top {
  display: none;
}
.search_box {
  position: relative;
  width: 1010px;
  height: 64px;
  background: #fff;
  margin-top: 0.333333rem;
  margin-left: calc(50% - 505px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 5px;
}
.el-select-dropdown__item {
  padding: 0 0.125rem !important;
}
</style>
