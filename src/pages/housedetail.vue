<template>
  <div :class="isFixed?'warn':'Box'" >
    <Header @dialog="isLogin"></Header>
    <Search  @chuan="check"></Search>
    <div class="doc_title">
      <div class="main">
        <span class="curhover" @click="goWrite(0)">七七找房新房出售 </span>>
        <span class="curhover" @click="goWrite(1)">{{result.quming}} 新房</span>
      </div>
    </div>
    <div class="main">
      <div class="imp">
        <div class="imp_cen">
            <div class="imp_cen_l">
                <span>{{result.name}}</span> 
                <div class="collect" :class="iscollect==1?'active':''"  @click="collect"> <img :src="iscollect=='1'?'../../static/focus.png':'../../static/focus_no.png'" alt=""> {{iscollect=='1'?'已收藏':'收藏'}}</div>
            </div>
            <div class="imp_cen_r">咨询电话： {{$bus.kfPhone}} </div>
        </div>
      </div>
      <!-- 大图 -->
      <div class="room">
        <!-- 左侧图片部分 -->
        <div class="room_l">
          <div class="content" @mouseover="showControl=true" @mouseleave="showControl=false">
              <el-carousel trigger="click" height="400px" arrow="never" indicator-position='none' :autoplay="false" ref="carousel">
                <el-carousel-item v-for="(item,index) in imgList" :key="index">
                  <div class="divImg">
                      <img :src="item" alt="" @click="showImg(index)" @error="errImg(index)">
                  </div>
                </el-carousel-item>
              </el-carousel>
              <template v-if="showControl&&imgList.length>1">
                <div class="direction_l" @click="changeImg(1)"><span></span></div>
                <div class="direction_r" @click="changeImg(-1)"><span></span></div>
              </template>
              <div class="content_num">{{initialIndex+1}} / {{imgList.length}}</div>
          </div>
          <Swiper :sliders="imgList" :currentIndex="initialIndex" @chooseImg="chooseImg" ref="swiper"></Swiper>
        </div>
        <!-- 右侧部分 -->
        <div class="room_r">
          <div class="room_r_con price_box">
              <span>均价</span> <div class="price"><i>{{result.min_price}}-{{result.max_price}}</i> <span>{{result.price_unit}}</span>  </div>
          </div>
          <div class="room_r_con" style="margin-top:.416667rem">
              <span>可售户型</span> <div style="font-weight:600;font-size:.166667rem"> <i style="font-size:.233333rem">{{result.min_mianji}}-{{result.max_mianji}}</i> ㎡</div>
          </div>
          <div class="room_r_con" style="margin:.166667rem 0;">
              <span>位置</span> <div style="font-size:14px">{{result.house_address|| '未知'}}</div>
          </div>
          <div class="appointment">
              <div class="appoint_hd">预约看房</div>
              <div class="appointment_inp">
                <input
                type="number"
                placeholder="请输入手机号码"
                class="input"
                v-model="phone1"
                @keyup.enter="appointment(phone1)"
                >
                <div class="quickly" @click="appointment(phone1)">立即预约</div>
              </div>
              <div style="color:#999999;font-size:.108333rem;">最近已有{{result.rd_ren || 0}}人预约</div>
          </div>
        </div>
      </div>
      <!-- 主体 -->
      <div class="importantBox">
          <div ref="importantBox" :class="isFixChoose?'fixBox':''">        
              <div class="import_hd main">
                  <div class="import_hd_l">
                      <span v-for="(item,index) in baseType" :key="index" :class="hd_index==index?'active':''" @click="chooseBase(index)">{{item}}</span>
                  </div>
                  <div class="import_hd_r">咨询电话: {{$bus.kfPhone}} </div>
              </div>
          </div>
          <div class="import_con" :style="{'padding-top':isFixChoose?'35px':''}">
              <!-- 左侧部分 -->
              <div class="import_con_l">
                  <!-- 基本信息 -->
                  <div id="baseInfo" style="padding-top: 68px;">                
                      <div class="import_con_lhd">基本信息</div>
                      <div class="baseInfo">
                          <div class="base_con">
                              <div>项目名</div>
                              <span>{{result.name}}</span>
                          </div>
                          <div class="base_con">
                              <div>可售户型</div>
                              <span>{{result.min_mianji}}-{{result.max_mianji}} ㎡</span>
                          </div>
                          <div class="base_con">
                              <div>类型</div>
                              <span>{{result.yongtu|| '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>位置</div>
                              <span>{{result.house_address || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>交付标准</div>
                              <span>{{result.zhuangxiu}}</span>
                          </div>
                          <div class="base_con">
                              <div>开发商</div>
                              <span>{{result.kaifashang || '未知'}}</span>
                          </div>
                      </div>
                  </div>
                  <!-- 介绍 -->
                  <div class="introduce" id="introduce">
                    <div class="import_con_lhd">介绍</div>
                    <div class="introduce_con">{{desc || '暂无介绍'}}</div>
                    <template v-if="showMore>0">
                      <div class="openMore" v-if="showMore==1" @click="showMore=2">
                          <div>展开 <img src="../../static/down.png" alt=""></div>
                      </div>
                      <div class="openMore" v-else @click="showMore=1">
                          <div>收起 <img src="../../static/down.png" alt="" style="transform:rotate(180deg)"></div>
                      </div>
                    </template>
                  </div>
                  <!-- 实景图 -->
                  <div class="reality" id="reality" style="padding-top: 68px;">
                    <div class="import_con_lhd">实景图</div>
                    <div class="reality_con">
                      <div :class="imgList.length>4?(imgList.length>5?'img_6':'img_5'):'reality_con_img'" v-for="(item,index) in imgList" :key="index" @click="showImg(index)">
                          <img :src="item" alt="" class="large_img" >
                      </div>
                    </div>
                  </div>
                  <!-- 规划信息 -->
                  <div id="information" style="padding-top: 68px;">                
                    <div class="import_con_lhd">规划信息</div>
                    <div class="baseInfo">
                        <div class="base_con">
                            <div>占地面积</div>
                            <span>{{result.zdmianji}} ㎡</span>
                        </div>
                        <div class="base_con">
                            <div>建筑面积</div>
                            <span>{{result.mianji}}  ㎡</span>
                        </div>
                        <div class="base_con">
                            <div>建筑结构</div>
                            <span>{{result.jiegou || '未知'}}</span>
                        </div>
                        <div class="base_con">
                            <div>总层数</div>
                            <span>{{result.cengshu}} 层</span>
                        </div>
                        <div class="base_con">
                            <div>层高</div>
                            <span>{{result.xmgaodu}} m</span>
                        </div>
                        <div class="base_con">
                            <div>绿化率</div>
                            <span>{{result.lvhualv}} %</span>
                        </div>
                        <div class="base_con">
                            <div>容积率</div>
                            <span>{{result.rongjilv}} %</span>
                        </div>
                        <div class="base_con">
                            <div>产权年限</div>
                            <span>{{result.chanquan?result.chanquan+'年': '未知'}}</span>
                        </div>
                    </div>
                  </div>
                  <!-- <div class="licence">
                      <div class="licence_l">
                          <div>预售许可证</div>
                          {{result.yushouxkz}}
                      </div>
                      <div class="licence_r">{{result.fzshijian}}</div>
                  </div> -->
                  <!-- 物业配套 -->
                  <div id="matching" style="padding-top: 68px;">                
                      <div class="import_con_lhd">物业配套</div>
                      <div class="baseInfo matching">
                          <div class="base_con">
                              <div>物业公司</div>
                              <span>{{result.wuyemc || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>物业费</div>
                              <span>{{result.wuyefei || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>燃气</div>
                              <span>{{result.is_ranqi || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>供电</div>
                              <span>{{result.gongdianlx_name || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>供水</div>
                              <span>{{result.gongshuifs_name || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>供暖</div>
                              <span>{{result.cainuanfs || '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>车位数</div>
                              <span>{{result.tingchewei|| '未知'}}</span>
                          </div>
                          <div class="base_con">
                              <div>电梯</div>
                              <span>{{result.dianti|| '未知'}}</span>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- 右侧部分 -->
              <div class="import_con_r" ref="appointment">
                <div class="import_con_rBox" :class="isFixChoose?'fixImport_right':''" v-if="!hiddenRight">
                    <div class="import_con_r_hd">
                        <div class="import_con_r_hd_l">{{result.name}}</div>
                        <div class="import_con_r_hd_r">
                            <div style="margin-bottom:10px">
                              均价 <span style="font-size:.158333rem;color:#FF3A00;margin-left:10px;font-weight:550">{{result.min_price}}-{{result.max_price}} {{result.price_unit}}</span>
                            </div>
                            <div>
                              可售户型 <span style="font-size:.158333rem;color:#111111;margin-left:10px;font-weight:550">{{result.min_mianji}}-{{result.max_mianji}}㎡</span>
                            </div>
                        </div>
                    </div>
                    <!-- 预约 -->
                    <div class="appointment_inp">
                        <input
                        type="number"
                        placeholder="请输入手机号码"
                        class="input"
                        v-model="phone2"
                        @keyup.enter="appointment(phone2)"
                        >
                        <div class="quickly" @click="appointment(phone2)">立即预约</div>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <!-- 地图 -->
      <div id="map" style="padding-top: 68px;" ref="matching" >                
          <per-map :center="center" :zhoubianfy="zhoubianfy"></per-map>
      </div>
      <!-- 周边配套 -->
      <div id="periphery" style="padding-top: 68px;">                
          <div class="import_con_lhd">周边配套</div>
          <div class="periphery">
            <div class="base_con">
                <span class="periphery_title">交通</span>
                <div class="periphery_r">{{result.jiaotong|| '未知'}}</div>
            </div>
            <div class="base_con">
                <span class="periphery_title">购物</span>
                <div class="periphery_r">{{result.gouwu|| '未知'}}</div>
            </div>
            <div class="base_con">
                <span class="periphery_title">小区</span>
                <div class="periphery_r">{{result.xiaoqu|| '未知'}}</div>
            </div>
            <div class="base_con">
                <span class="periphery_title">医院</span>
                <div class="periphery_r">{{result.hospital|| '未知'}}</div>
            </div>
          </div>
      </div>
      <!-- 推荐楼盘 -->
      <div class="origin" id="origin">
        <div class="import_con_lhd">推荐楼盘</div>
        <div class="other">
          <div
            v-for="(item,index) in tjfyList"
            :key="index"
            v-if="index<4"
            class="rec_room"
            @click="otherRoom(item.id)"
          >
            <div class="other_img_con">
              <img :src="item.image || '../../static/zhutu.png'" :alt="item.name" class="other_img large_img" @error="errImg(item,1)" :title="item.name">
            </div>
            <div class="other_title">
                <div class="limit_title">{{item.name}}</div>
                <span>{{item.quming}}</span>
            </div>
            <div class="other_title">
                <div style="color:#FF3A00">{{item.min_price}}-{{item.max_price}} {{item.price_unit}}</div>
                <div><span>可售户型 </span>{{item.min_mianji|| ''}}-{{item.max_mianji}} {{item.mianji_unit}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mengBox" v-if="isFixed">
      <img src="../../static/close.png" alt="" class="close" @click="isFixed=false">
      <el-carousel  indicator-position='none'  arrow="never" ref="carousel2" type="card" :initial-index='showInitialIndex'  height="60vh" class="carousel" :autoplay="false" @change="changeCarousel">
        <el-carousel-item v-for="(item,index) in imgList" :key="index" :class="showInitialIndex==index?'':'opc'">
          <div class="divImg">
            <img :src="item" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
      <img src="../../static/left.png" alt="" class="m_left" @click="changeImg2(1)">
      <img src="../../static/right.png" alt="" class="m_right" @click="changeImg2(-1)">
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import Search from '../components/search'
import Swiper from '../components/swiper'
import perMap from '../components/permap'
import {yyzfApi,cancel_collectApi,goCollectApi,saledetailApi,saletjfyApi} from '@/request/api'
export default {
  metaInfo: {
    meta: [
      {
        name: 'keywords',
        content: '新房出售,门面出售,店铺出售,旺铺转让'
      }
    ]
  },
  components: {
    Header,
    Footer,
    Search,
    Swiper,
    perMap
  },
  data () {
    return {
      showInitialIndex:0,
      initialIndex:0,
      isFixed:false,
      id: '',
      center: {
        lng:'',
        lat:''
      },
      result: { image: [] }, // 详情
      current: 0,
      dialogTableVisible: false,
      iscollect: 0,
      phone1: '',
      phone2:"",
      desc:"",
      imgList:[],
      tjfyList: [], // 推荐楼盘，
      top:'',
      limitheight:'',
      isFixChoose:false,
      hiddenRight:false,
      showControl:false,
      showMore:0,
      hd_index:0,
      baseType:['基本信息','介绍','实景图','规划信息','物业配套','地图','周边配套','推荐楼盘'],
      zhoubianfy:[]
    }
  },
  watch:{
    showMore(newValue,oldValue){
      var {desc}=this.result
      if(newValue==1){
        this.desc=desc.substring(0,220)+'......'
      }else{
        this.desc=desc
      }
    }
  },
  methods: {
    check(data){
      this.$router.push({ name: 'house', params: { search:data } })
    },
    goWrite(type){
      var qid=this.result.area_id
      if(type==0){
        // this.$router.push({ name: 'house'})
        var {href} = this.$router.resolve({path: "/house"});
      }else{
        // this.$router.push({ name: 'house',params:{qid}})
        var {href} = this.$router.resolve({path: "/house",query:{qid}});
      }
      window.open(href, '_blank');
    },
    errImg(item,type){
      if(type==1){
        this.$set(item,'image','../../static/fail.png')
      }else{
        this.$set(this.imgList,item,'../../static/fail.png')
      }
    },
    // 详情列表
    getList () {
      var id=this.id
      var token = localStorage.getItem('token') || ''
      saledetailApi({
        fysale_id: id,
        token: token,
        client: 'pc'
      }).then(res => {
        if (res) {
          this.result = res.data.result
          this.imgList=this.result.images || ['../../static/zhutu.png']
          this.iscollect = this.result.collect
          var {desc}=this.result
          this.desc=desc
          if(desc.length>220){
            this.showMore=1
          }
          var location=this.result.dituzb
          var zb=location.split(',')
          var position={
            lat:zb[1],
            lng:zb[0]
          }
          this.center=position
          this.zhoubianfy=this.result.zhoubianfy || []
        } else {
          this.$router.go(-1)
        }
      })
    },
    //推荐房源
    tuijian () {
      saletjfyApi().then(res => {
        if (res) {
          this.tjfyList = res.data.result || []
        }
      })
    },
    // 滑动
    chooseBase(index){
        this.hd_index=index
        switch(index){
            case 0 :
                document.getElementById("baseInfo").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            case 1 :
                document.getElementById("introduce").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            case 2 :
                document.getElementById("reality").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            case 3 :
                document.getElementById("information").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            case 4 :
                document.getElementById("matching").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            case 5 :
                document.getElementById("map").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            case 6 :
                document.getElementById("periphery").scrollIntoView({block: "start", behavior: "smooth"});
                break;
            default:
                document.getElementById("origin").scrollIntoView({block: "start", behavior: "smooth"});
        }
    },
    chooseMapType(index){
      this.current_type=index
      switch(index){
          case 0 :
              this.iconStyle.url='../../static/house_32.png'
              this.typeUrl='../../static/house_24.png'
              break;
          case 1 :
              this.iconStyle.url='../../static/bus_32.png'
              this.typeUrl='../../static/bus_24.png'
              break;
          case 2 :
              this.iconStyle.url='../../static/foods_32.png'
              this.typeUrl='../../static/foods_24.png'
              break;
          case 3 :
              this.iconStyle.url='../../static/bank_32.png'
              this.typeUrl='../../static/bank_24.png'
              break;
          default:
              this.iconStyle.url='../../static/hotel_32.png'
              this.typeUrl='../../static/hotel_24.png'
      }
        console.log(this.iconStyle.url)
      
    },
    // 跳转房源页面
    otherRoom (id) {
      this.$router.push({ name: 'housedetail', query: { id:id } })
      location.reload()
    },
    // 更换图片
    chooseImg (index) {
      this.$refs.carousel.setActiveItem(index)
      this.initialIndex=index
    },
    showImg (index) {
      this.isFixed = true
      this.showInitialIndex=index
    },
    changeCarousel(key1,key2){
      this.showInitialIndex=key1
    },
    changeImg(direction){
      this.$refs.swiper.move(direction)
    },
    changeImg2(type){
      if(type==1){
        this.$refs.carousel2.prev()
      }else{
        this.$refs.carousel2.next()
      }
    },
    isLogin () {
      location.reload()
    },
    collect () {
      var token = localStorage.getItem('token') || ''
      var data = {
        token: token,
        client: 'pc',
        collect_id:this.id,
        type: 3
      }
      if(!token){
          this.$message.error('请先登录')
          return false
      }
      // 取消收藏
      if (this.iscollect == 1) {
        cancel_collectApi(data).then(res => {
          this.$message.success(res.data.msg)
          this.iscollect = 0
        })
      } else {
        // 收藏
        goCollectApi( data).then(res => {
          this.iscollect = 1
          this.$message.success(res.data.msg)
        })
      }
    },
    // 预约看房
    appointment (phone) {
      var params={
          phone,
          name: '',
          remarks: '',
          type: '2',
          lpid:'',
          fyid: this.id,
      } // 参数
      var mobileReg=/^1[34578]\d{9}$/;
      if(phone==''){
          this.$message.error('手机号码不能为空')
          return false
      }
      if(! mobileReg.test(phone)){
          this.$message.error('请输入正确的手机号')
          return false
      }
      yyzfApi(params).then(res => {
        var data = res
        if (res) {
          this.$message.success(data.msg)
          this.mes = '已预约'
        } else {
          this.phone=''
        }
      })
    },
    handleScroll() {
      const top= document.documentElement.scrollTop || document.body.scrollTop;
      var limitTop=this.$refs.matching.offsetTop-200
      if(top >= this.top){
          this.isFixChoose=true
          if(top>=limitTop){
            this.hiddenRight=true
          }else{
            this.hiddenRight=false
          }
      }else{
          this.isFixChoose=false
      }
    },
  },
  created () {
  },
  mounted () {
    var that=this
    this.id = this.$route.query.id
    this.getList()
    this.tuijian()
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(()=>{
      this.top=this.$refs.importantBox.offsetTop
    })
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.Box{
  color: #111;
  background-color: #fff;
}
/deep/ .el-carousel__mask{
  opacity: 0;
}
.fixBox{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #F6F6F6;
}
.fixImport_right{
  position: fixed;
  top: 58px;
  z-index: 10;
  background-color: #fff;
}
.video_img {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  
}
.noRecode{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center; 
  img{
    width: 1.666667rem;
    height: 1.25rem
  }
}
.curhover:hover{
  color: #071733;
  cursor: pointer;
}
.warn{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
.m_left {
  position: absolute;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
  width:40px;
  height:40px;
  z-index: 10;
  cursor: pointer;
}
.m_right {
  position: absolute;
  top: 50%;
  right: 0.2rem;
  transform: translateY(-50%);
  width:40px;
  height:40px;
  z-index: 10;
  cursor: pointer;
}
.large_img{
  transform:scale(1.0);
  transition:transform 0.5s ease;
}
.large_img:hover{
  transform:scale(1.1)
}
.mengBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background:rgba(0, 0, 0);
  z-index: 1000;
  .carousel{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    .opc{
       opacity: 0.3;
    }
  }
  .close{
    position: absolute;
    top: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
  }
}
.divImg{
  height: 100%;
  width: 100%;
  img{
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
}
.doc_title {
  font-size: .116667rem;
  color:#909399;
  padding-bottom: .2rem;
  background-color: #F6F6F6;
}
.imp {
  .imp_cen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:.175rem;
    margin: .333333rem 0 .566667rem;
    .imp_cen_l{
        display: flex;
        align-items: center;
        span{
            font-weight:600;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-size:.241667rem;
        }
        .collect{
            cursor: pointer;
            border-radius:17px;
            border:1px solid rgba(227,230,239,1);
            width:.666667rem;
            height:28px;
            font-size:.1rem;
            color: #999;
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 14px;
                height: 14px;
                margin-right: 3px;
            }
        }
        .active{
          color: #fff;
          border:none;
          background:linear-gradient(180deg,rgba(255,101,92,1) 0%,rgba(255,58,0,1) 100%);
        }
    }
    .imp_cen_r{
        font-weight:550;
        font-family:PingFangSC-Medium,PingFang SC;
    }
  }
  .imp_dizhi{
      font-size: 0.12rem;
      margin-bottom:.083333rem;
      cursor:pointer
  }
  .imp_dizhi span:hover{
      color:#4b6dff;
  }
}
.room {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.2rem;
    background-color: #fff;
    box-sizing: border-box;
    .room_l {
        width:600px;
        .content{
            position: relative;
            cursor: pointer;
            border-radius: 10px;
            margin-bottom: .066667rem;
            .content_num{
              position: absolute;
              right: 16px;
              bottom: 16px;
              font-size:.133333rem;
              color: #fff;
              height:28px;
              line-height:28px;
              background:rgba(0,0,0,0.6);
              border-radius:14px;
              padding: 0 20px;
              z-index: 10;
            }
        }
    }
    .room_r {
        flex: 1;
        margin: 0.233333rem .4rem 0;
        color: #999;
        font-size:.141667rem;
        font-family:PingFangSC-Semibold,PingFang SC;
        .price_box{
          padding-block-end: .208333rem;
          border-bottom: 1px solid #E3E6EF;
        }
        .room_r_con{
            display: flex;
            align-items: center;
            span{
                width: 110px;
            } 
            div{
                flex: 1;
                margin-left: 10px;
                color: #111;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
                overflow: hidden;
            }
            .price{
                color: #FF3A00;
                font-weight:550;
                font-size:.166667rem;
                height:46px;
                display: flex;
                align-items: flex-end;
                i{
                  font-size:.333333rem;
                  line-height:46px;
                }
                span{
                  display: inline-block;
                  margin-bottom: 4px;
                }
            }
        }
        // 预约
        .appointment{
            padding: .166667rem;
            box-sizing: border-box;
            text-align: center;
            border: 1px solid #E3E6EF;
            margin-top: .266667rem;
            .appoint_hd{
                font-weight:550;
                color: #111;
            }
        }
    }
}
// 预约
.appointment_inp{
    width: 100%;
    display: flex;
    margin: .166667rem 0 .083333rem;
    display: flex;
    font-size: .125rem;
    input{
      flex: 1;
      height:.333333rem;
      outline: none;
      border: none;
      padding: 0 .083333rem;
      background-color: #F6F6F6;
    }
    .quickly{
      cursor: pointer;
      background-color: #1989FA;
      width:.916667rem;
      height:.333333rem;
      line-height:.333333rem;
      text-align: center;
      color: #fff;
    }
}
// 信息栏
.importantBox{
  font-family:PingFangSC-Medium,PingFang SC;
  .import_hd{
    background-color: #F6F6F6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:58px;
    font-weight:550;
    font-size:.133333rem;
    padding: 0 .166667rem;
    .import_hd_l{
      span{
        display: inline-block;
        height:58px;
        line-height:58px;
        margin-left: .333333rem;
        cursor: pointer;
      }
      span:first-child{
          margin-left:0
      }
      .active{
            border-bottom: 3px solid #1989FA;
      }
    }
  }
  .import_con{
      display: flex;
      .import_con_l{
          flex: 1;
          min-height: 100vh;
          margin-right: .166667rem;
      }
      .import_con_r{
          width:3rem;
          .import_con_rBox{
              width:3rem;
              margin-top: 32px;
          }
          .import_con_r_hd{
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #999;
              font-size:.116667rem;
              border-bottom: 1px solid #E3E6EF;
              padding-bottom: .166667rem;
              .import_con_r_hd_l{
                font-size:.158333rem;
                color:#111;
                font-weight:550;
                width: 160px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;

              }
              .import_con_r_hd_r{
                flex: 1;
                div{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
              }
          }
      }
  }
}
// 标题
.import_con_lhd{
    font-size:.2rem;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:550;
    margin-bottom:.333333rem;
}
// 基本信息
.baseInfo{
    display: flex;
    flex-wrap: wrap;
    font-size:.125rem;
    .base_con{
        width: 48%;
        margin-right: 2%;
        margin-bottom: .125rem;
        display: flex;
        div{
            width: .833333rem;
            color: #999
        }
        span{
            flex: 1;
            font-weight: 550
        }
    }
}
// 物业配套
.matching{
  .base_con{
      div{
        width: .6rem;
        color: #999
      }
      span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
      }
  }
}
// 周边配套
.periphery{
    margin-right: 0.333333rem;
    font-size:.125rem;
    .base_con{
        width: 100%;
        margin-right:0;
        margin-bottom: .125rem;
        display: flex;
        .periphery_title{
          width: .5rem;
          color: #999
        }
        .periphery_r{
          flex: 1;
          color: #111;
        }
        
    }
    .base_con:nth-last-of-type(1){
        margin-top: .125rem;
    }
}
// 介绍
.introduce{
    padding-top: 68px;
    .introduce_con{
        line-height: 25px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-size:.125rem;
    }
    .limit{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:5;
        overflow: hidden;
    }
    .openMore{
        height:.25rem;
        div{
          float: right;
          display: flex;
          align-items: center;
          justify-content: center;
          width:.608333rem;
          border-radius:3px;
          border:1px solid rgba(227,230,239,1);
          font-size:.083333rem;
          height:.25rem;
          line-height:.25rem;
          margin-top:.2rem;
        }
        img{
          margin-left: 4px
        }
        div:hover{
          color: #1989FA;
          border:1px solid #1989FA;
          cursor: pointer;
        }
    }
}
// 实景图
.reality_con{
    display: flex;
    flex-wrap: wrap;
    div{
      margin-bottom: .125rem;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
}
// 预售许可证
.licence{
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size:.083333rem;
    margin-top: .55rem;
    .licence_l{
        background-color: #F6F6F6;
        flex: 1;
        height:50px;
        line-height:50px;
        div{
            display: inline-block;
            padding: 0 .208333rem;
            margin-right: .25rem;
            background-color: #1989FA;
            color: #fff;
        }
    }
    .licence_r{
        height:50px;
        line-height:50px;
        text-align: center;
        background-color: #F6F6F6;
        padding:0 10px;
        margin-left: 10px
    }
}
// 推荐楼盘
.origin {
  padding-top: 68px;
  box-sizing: border-box;
  margin-bottom: 0.416667rem;
  .other {
    display: flex;
    flex-wrap: wrap;
    .rec_room {
      cursor: pointer;
      flex: 1;
      font-size: 0.116667rem;
      margin-right:.225rem;
      font-size:12px;
      .other_title{
        display: flex;
        justify-content: space-between;
        font-weight: 550;
        margin-bottom: 10px;
        font-size:16px;
        div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .limit_title{
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .other_img_con{
        position: relative;
        margin-bottom: 0.1rem;
        height: 180px;
        overflow: hidden;
        border-radius: 4px;
        .other_img{
          width: 100%;
          height:100%;
          
        }
      }
      span {
        font-size:.116667rem;
        color: #999;
        font-weight: 400
      }
    }
    .rec_room:nth-of-type(4n) {
      margin-right: 0;
    }
  }
}
</style>
