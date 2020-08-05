<template>
   <div :class="isFixed?'warn':'Box'" >
    <Header @dialog="isLogin"></Header>
    <Search @chuan="check"></Search>
    <div class="doc_title">
      <div class="main">
        <span class="curhover" @click="goWrite(0)">七七找房 ></span>
        <span class="curhover" @click="goWrite(1)">{{result.quming}} 写字楼 </span>>
        <span class="curhover" @click="goWrite(2)">{{result.sqming}} 写字楼 </span>>
        <span>{{result.xiaoqum}}</span>
      </div>
    </div>
    <div class="main">
      <div class="imp">
        <div class="imp_cen"  style="margin-bottom:0">
          <div class="imp_cen_l">
              <span>{{result.xiaoqum}}</span> 
              <div class="collect" :class="iscollect==1?'active':''"  @click="collect"> <img :src="iscollect=='1'?'../../static/focus.png':'../../static/focus_no.png'" alt=""> {{iscollect=='1'?'已收藏':'收藏'}}</div>
          </div>
          <div class="imp_cen_r">咨询电话： {{$bus.kfPhone}} </div>
        </div>
        <div class="imp_ft" style="margin:25px 0 33px">
          <div><span @click="goWrite(1)">{{result.quming}}</span>-<span @click="goWrite(2)">{{result.sqming}}</span></div>
          <i>{{result.xiaoqudz}}</i>
          <div><img src="../../static/ditie.png" alt=""><span @click="goWrite(3)">{{result.line}}</span>-<span @click="goWrite(4)">{{result.exit}}</span></div>
          <div @click="map"><img src="../../static/map1.png" alt=""><em>查看地图</em></div>
        </div>
      </div>
      <!-- 大图 -->
      <div class="room">
        <!-- 左侧图片部分 -->
        <div class="room_l">
          <div class="content" @mouseover="showControl=true" @mouseleave="showControl=false">
              <el-carousel trigger="click" height="400px" arrow="never" indicator-position='none' :autoplay="false" ref="carousel" style="margin-bottom:20px">
                <el-carousel-item v-for="(item,index) in imgList" :key="index">
                  <div class="divImg">
                      <img :src="item" alt="" @click="showImg(index)" class="carouselImg" @error="errImg(index,1)">
                  </div>
                </el-carousel-item>
              </el-carousel>
              <template v-if="showControl&&imgList.length>1">
                <div class="direction_l" @click="changeImg(1)"><span></span></div>
                <div class="direction_r" @click="changeImg(-1)"><span></span></div>
              </template>
              <div class="content_num">{{initialIndex+1}} / {{imgList.length}}</div>
          </div>
          <Swiper :sliders="imgList"  @chooseImg="chooseImg" ref="swiper"></Swiper>
        </div>
        <!-- 右侧部分 -->
        <div class="room_r">
          <div class="price_box">
              <i>{{result.csjunjia}}</i>
              <span>&nbsp;{{result.unit}}起</span>
          </div>
          <div class="room_r_con">
            <div><div style="font-size:24px">{{result.fy_count}}套</div>在租</div>
            <div style="margin-left:-10px"><div style="font-size:24px">{{result.mianji_min*1}}-{{result.mianji_max*1}}m²</div>面积</div>
            <!-- <div></div> -->
          </div>
          <div class="room_r_adress flex_sb">
            <div class="adress_l">
              <div class="adress_l_wu">
                <span>物业费</span>
                {{result.wuyefei*1 || '未知'}} 
                <i v-if="result.wuyefei">&nbsp;元/m²/月</i>
              </div>
              <div class="adress_l_wu" style="margin:15px 0">
                <span>车位租金</span>
                {{result.dshangtcwzl*1 || '未知'}} 
                <i v-if="result.dshangtcwzl">&nbsp;元/月</i>
              </div>
              <div style="color:#1989FA;font-size:14px;">{{result.yyxx}}</div>
              <div class="zixun">免费咨询  {{$bus.kfPhone}}</div>
            </div>
            <div class="adress_r">
              <img src="../../static/xcx.jpg" alt="">
              <div>微信看房更方便</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 主干 -->
      <div class="import_con">
          <!-- 左侧部分 -->
          <div class="import_con_l">
              <!-- 出租房源 -->
              <div>
                <div class="import_con_lhd" style="margin:0">出租房源</div>
                <div class="lease">
                  <!-- fixed_left hiddenRight -->
                  <div class="lease_hd">
                    <i>面积：</i>
                    <span v-for="(item,index) in fang" :key="index" :class="current==index?'active':''" @click="chooseSeries(index)">{{item.lxming}}</span>
                  </div>
                  <div class="lease_box">
                    <div class="lease_box_title" :class="fangList.length>3&&hiddenLeft?'fixed_left':''">
                        <div class="photo">照片/视频</div>
                        <div :class="current_tab==1?'active':''" style="cursor: pointer;" @click="chooseTab(1)">
                          面积
                          <div class="lease_box_three">
                            <div class="lease_box_three_t" :class="mjFlag?'active_t':''"></div>
                            <div class="lease_box_three_b" :class="mjFlag?'':'active_b'"></div>
                          </div>
                        </div>
                        <div :class="current_tab==2?'active':''" style="cursor: pointer;" @click="chooseTab(2)">
                          单价
                          <div class="lease_box_three">
                            <div class="lease_box_three_t" :class="djFlag?'active_t':''"></div>
                            <div class="lease_box_three_b" :class="djFlag?'':'active_b'"></div>
                          </div>     
                        </div>
                        <div :class="current_tab==3?'active':''" style="cursor: pointer;" @click="chooseTab(3)">
                          总价
                          <div class="lease_box_three">
                            <div class="lease_box_three_t" :class="zjFlag?'active_t':''"></div>
                            <div class="lease_box_three_b" :class="zjFlag?'':'active_b'"></div>
                          </div> 
                        </div>
                        <div>类型</div>
                    </div>
                    <template v-if="fangList.length">
                      <div class="lease_box_list" v-for="(item,index) in fangList" :key="index" @click="otherRoom(item.id,1)" v-if="index<limitNum">
                        <div class="photo">
                          <img :src="item.image|| '../../static/zhutu.png'" alt="" class="large_img photo_img" @error="errImg(item)">
                          <img src="../../static/shipin.png" class="video_img" alt="" v-show="item.shipin_url">
                        </div>
                        <div><i style="color:#191919">{{item.mianji}}</i>㎡</div>
                        <div><i style="color:#FF3A00">{{item.price}}</i> {{item.lxming}}</div>
                        <div><i style="color:#191919">{{item.total_price}}</i> 元/月</div>
                        <div>{{item.leixing}}/{{item.zhuangxiu}}</div>
                      </div>
                    </template>
                    <!-- 没有数据 -->
                    <div class="noRecord" v-else>
                      <img src="../../static/kong.png" alt="">
                      <div class="noRecord_r">啊哦，暂未找到您要的内容～</div>
                    </div>
                    <div  v-if="fangList.length>6" >
                      <div class="more" @click="checkMore(1)" v-if="limitNum==6">
                        查看所有出租房源
                        <img src="../../static/down.png" alt="">
                      </div>
                      <div class="more" @click="checkMore(2)" v-else>
                        收起所有出租房源
                        <img src="../../static/down.png" alt="" style="transform:rotate(180deg)">
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
              <!-- 基本信息 -->
              <div ref="baseInfo">                
                <div class="import_con_lhd">基本信息</div>
                <div class="baseInfo">
                    <div class="base_con">
                        <div>所属商圈</div>
                        <span>{{result.quming}} - {{result.sqming}}</span>
                    </div>
                    <div class="base_con">
                        <div>地址</div>
                        <span>{{result.xiaoqudz}}</span>
                    </div>
                    <div class="base_con">
                        <div>建筑年代</div>
                        <span>{{result.jianzaond}}年</span>
                    </div>
                    <div class="base_con">
                        <div>层高</div>
                        <span>{{result.xmgaodu ?result.xmgaodu*1+'m' :'未知'}} </span>
                    </div>
                    <div class="base_con">
                        <div>总层数</div>
                        <span>{{result.cengshu ?result.cengshu*1+'层' :'未知'}} </span>
                    </div>
                    <div class="base_con">
                        <div>物业</div>
                        <span>{{result.wuyemc?result.wuyemc:'未知'}}</span>
                    </div>
                    <div class="base_con">
                        <div>物业费</div>
                        <span>{{result.wuyefei ?result.wuyefei*1+'元/m²/月' :'未知'}}</span>
                    </div>
                    <div class="base_con">
                        <div>车位租金</div>
                        <span>{{result.dshangtcwzl ?result.dshangtcwzl*1+'元/月' :'未知'}}</span>
                    </div>
                    <div class="base_con">
                        <div>电梯详情</div>
                        <span>{{result.diantixq ? result.diantixq : '未知'}}</span>
                    </div>
                </div>
                <div class="brief">
                  <span style="color:#999">楼盘简介</span>
                  <div class="brief_box">{{desc || '暂无介绍'}}</div>
                  <template v-if="showMore>0">
                    <div class="openMore" v-if="showMore==1" @click="showMore=2">
                        <div>展开 <img src="../../static/down.png" alt=""></div>
                    </div>
                    <div class="openMore" v-else @click="showMore=1">
                        <div>收起 <img src="../../static/down.png" alt="" style="transform:rotate(180deg)"></div>
                    </div>
                  </template>
                </div>
              </div>
          </div>
          <!-- 右侧部分 -->
          <div class="import_con_r" ref="appointment">
            <div class="import_con_rBox" :class="hiddenRight?'fixed_right':''">                
              <div class="import_con_r_hd">
                <div class="limit_2">{{result.xiaoqum}}</div>
                <span>{{result.csjunjia}} <i>{{result.unit}}</i> </span>
              </div>
              <div style="color:#191919;font-weight:550;font-size:.116667rem">免费咨询 {{$bus.kfPhone}}</div>
              <div class="subscribe">
                <input type="number" v-model="phone" placeholder="请输入手机号码" @keyup.enter="appointment">
                <div @click="appointment">预约看房</div>
              </div>
              <div style="color:#909399;font-size:.116667rem;text-align:center">最近已有{{result.rd_ren || 0}}人预约</div>
            </div>
          </div>
      </div>
      <!-- 地图 -->
      <div style="padding-top:64px" id="map" ref="map">                
        <per-map :center="center" :zhoubianfy="zhoubianfy"></per-map>
      </div>
      <!-- 推荐楼盘 -->
      <div class="origin" id="origin">
        <div class="import_con_lhd">推荐楼盘</div>
        <div class="other">
          <div
            v-for="(item,index) in otherList"
            :key="index"
            v-if="index<4"
            class="rec_room"
            @click="otherRoom(item.id)"
          >
            <div class="other_img_con">
              <img :src="item.lptp || '../../static/zhutu.png'" :alt="item.lpming" :title="item.lpming" class="other_img large_img" @error="errImg(item,2)">
            </div>
            <div class="other_title">
                <h4 class="limit_title">{{item.lpming}}</h4>
                <span><img src="../../static/location.png" alt="">{{item.dizhi}}</span>
            </div>
            <div class="other_title">
                <div style="color:#FF3A00;">{{item.lpzj}} <span style="color:#303133">{{item.lpzj?item.unit:'未知'}}</span> </div>
                <!-- <div>800㎡</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mengBox" v-if="isFixed">
      <img src="../../static/close.png" alt="" class="close" @click="isFixed=false">
      <el-carousel  indicator-position='none'  arrow="never" ref="carousel2" type="card" :initial-index='showInitialIndex'  height="60vh" class="carousel" :autoplay="false"  @change="changeCarousel">
        <el-carousel-item v-for="(item,index) in imgList" :key="index" :class="showInitialIndex==index?'':'opc'">
          <div class="divImg">
            <img :src="item" alt="" class='carouselImg'>
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

import {yyzfApi,cancel_collectApi,goCollectApi,lpDetailApi,tjlpApi,lpFangyuanApi} from '@/request/api'
export default {
  metaInfo: {
      meta: [
        {
          name: 'keywords',
          content: '写字楼出租,办公室出租,写字楼出租价格,办公室租赁，写字楼租赁信息网'
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
      center:{
        lng:'',
        lat:''
      },//中心点
      limitNum:6,
      id: '', // 楼盘id
      result:{}, // 详情
      fang: '', // 房源
      current: 0,
      current_tab:0,
      fangList: [],
      imgList:[],
      initialIndex:0,
      showInitialIndex:0,
      isFixed: false,//蒙城固定
      showControl:false,
      hiddenRight:false,
      hiddenLeft:false,
      showMore:0,
      desc:"",
      phone: '',
      otherList: [], // 推荐楼盘
      iscollect: 0,
      zhoubianfy:[],//地图房源
      mjFlag:true,
      djFlag:true,
      zjFlag:true,
    }
  },
  watch:{
    showMore(newValue,oldValue){
      var desc=this.result.jianjie
      if(newValue==1){
        this.desc=desc.substring(0,220)+'......'
      }else{
        this.desc=desc
      }
    },
  },
  methods: {
    check(data){
      this.$router.push({
        name: 'write',
        params:{search:data}
      })
    },
    goWrite(type){
      var {sspianqu,ssxuexiao,ditiekou,ditielx}=this.result
      if(type==0){
        var {href} = this.$router.resolve({path: "/index"});
      }else if(type==1){
        // this.$router.push({
        //   name: 'write',
        //   params:{qid:sspianqu}
        // })
        var {href} = this.$router.resolve({path: "/write",query:{qid:sspianqu}});
      }else if(type==2){
        // this.$router.push({
        //   name: 'write',
        //   params:{qid:sspianqu,sq_id:ssxuexiao}
        // })
        var {href} = this.$router.resolve({path: "/write",query:{qid:sspianqu,sq_id:ssxuexiao}});
      }else if(type==3){
        // this.$router.push({
        //   name: 'write',
        //   params:{dt_id:ditielx}
        // })
        var {href} = this.$router.resolve({path: "/write",query:{dt_id:ditielx}});
      }else{
        // this.$router.push({
        //   name: 'write',
        //   params:{dt_id:ditielx,dtk_id:ditiekou}
        // })
        var {href} = this.$router.resolve({path: "/write",query:{dt_id:ditielx,dtk_id:ditiekou}});
      }
      window.open(href, '_blank');
    },
    errImg(item,type){
      if(type==1){
        this.$set(this.imgList,item,'../../static/fail.png')
      }else if(type==2){
        this.$set(item,'lptp','../../static/fail.png')
      }else{
        this.$set(item,'image','../../static/fail.png')
      }
    },
    checkMore(type){
      if(type==1){
        this.limitNum=1000*1000
        return
      }
      this.limitNum=6
    },
    // 进行排序
    sort(){
      var {fangList}=this
      function compare(property,reorder){
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          if(reorder){
            return value2 - value1;
          }
          return value1 - value2;
        }
      }
      if(this.current_tab==1){
        var name='mianji'
        var reorder=this.mjFlag
      }else if(this.current_tab==2){
        var name='price'
        var reorder=this.djFlag
      }else{
        var name='total_price'
        var reorder=this.zjFlag
      }
      fangList.sort(compare(name,reorder))
    },
    // 详情列表
    getList () {
      var id=this.id
      var token = localStorage.getItem('token') || ''
      lpDetailApi({
        loupan_id: id,
        token: token,
        client: 'pc'
      }).then(res => {
        this.result = res.data.result
        this.imgList=this.result.image.length?this.result.image: ['../../static/zhutu.png']
        this.iscollect = this.result.collect
        var location=this.result.dituzb
        var zb=location.split(',')
        var position={
          lat:zb[1],
          lng:zb[0]
        }
        this.center=position
        var desc=this.result.jianjie
        this.desc=desc
        if(desc.length>220){
          this.showMore=1
        }
        this.zhoubianfy=this.result.zhoubianfy
        this.tuijian()
      })
    },
    chooseTab(index){
      if(index==1){
        this.mjFlag=!this.mjFlag
      }else if(index==2){
        this.djFlag=!this.djFlag
      }else{
        this.zjFlag=!this.zjFlag
      }
      this.current_tab = index
      this.limitNum=6
      this.sort()
    },
    // 房源列表
    getFyList () {
      var id=this.id
      lpFangyuanApi({ loupan_id: id }).then(res => {
        this.fang = res.data.result
        this.fangList = this.fang[0].fangyuan
      })
    },
    // 选择面积
    chooseSeries (index) {
      if(this.current==index){
        return
      }
      this.current = index
      this.fangList = this.fang[this.current].fangyuan
      this.limitNum=6
      this.sort()
    },
    // 推荐房源
    tuijian () {
      var {ssxuexiao}=this.result
      tjlpApi({ssxuexiao:ssxuexiao}).then(res => {
        this.otherList = res.data.result
      })
    },
    // 预约看房
    appointment() {
      var params={
        phone: this.phone,
        name: '',
        remarks: '',
        type: '2',
        lpid: this.id,
        fyid: ''
      } // 参数
      var mobileReg=/^1(3|4|5|6|7|8|9)\d{9}$/
      if(this.phone==''){
          this.$message.error('手机号码不能为空')
          return false
      }
      if(! mobileReg.test(this.phone)){
          this.$message.error('请输入正确的手机号')
          return false
      }
      yyzfApi(params).then(res => {
        if (res) {
          this.$message.success(res.data.msg)
        }
      })
    },
    // 跳转楼盘页面
    otherRoom (id,type) {
      if(type==1){
        var {href} = this.$router.resolve({path: "/detail",query: {id}});
      }else{
        var {href} = this.$router.resolve({path: "/lpdetail",query: {id}});
      }
      window.open(href, '_blank');
    },
    // 展示图片
    showImg (index) {
      this.isFixed = true
      this.showInitialIndex=index
    },
    // 更换图片
    chooseImg (data) {
      this.$refs.carousel.setActiveItem(data)
      this.initialIndex=data
    },
    // 大图移动
    changeImg(direction){
      this.$refs.swiper.move(direction)
    },
    // 遮罩图移动
    changeImg2(type){
      if(type==1){
        this.$refs.carousel2.prev()
      }else{
        this.$refs.carousel2.next()
      }
    },
    // 遮罩图索引
    changeCarousel(key1,key2){
      this.showInitialIndex=key1
    },
    isLogin () {
      location.reload()
    },
    collect () {
      var {id}=this
      var token = localStorage.getItem('token') || ''
      var data = {
        token: token,
        client: 'pc',
        collect_id: id,
        type: 2
      }
      if(!token){
          this.$message.error('请先登录')
          return false
      }
      // 取消收藏
      if (this.iscollect == 1) {
        cancel_collectApi(data).then(res => {
          if (res) {
            this.$message.success(res.data.msg)
            this.iscollect = 0
          }
        })
      } else {
        // 收藏
        goCollectApi(data).then(res => {
          if (res) {
            this.iscollect = 1
            this.$message.success(res.data.msg)
          }
        })
      }
    },
    handleScroll() {
      const top= document.documentElement.scrollTop || document.body.scrollTop;
      var fixTop=this.$refs.appointment.offsetTop
      var limitTop=this.$refs.baseInfo.offsetTop-50
      var limitHeight=this.$refs.map.offsetTop-200
      if(top >= fixTop){
        if(top>=limitTop){
          this.hiddenLeft=false
        }else{
          this.hiddenLeft=true
        }
        if(top>=limitHeight){
          this.hiddenRight=false
        }else{
          this.hiddenRight=true
        }
      }else{
        this.hiddenRight=false
        this.hiddenLeft=false
      }
    },
    map(){
      document.getElementById("map").scrollIntoView({block: "start", behavior: "smooth"});
    },
  },
  created () {
  },
  mounted () {
    this.id = this.$route.query.id
    this.getList()
    this.getFyList()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
  @import  '../assets/css/detail.css'; 
  .imp_ft{
    display: flex;
    color: #071733;
    font-size:.116667rem;
    i{
      color: #999;
      margin-right: .2rem;
    }
    div{
      margin-right: .2rem;
    }
    img{
      margin-right:4px
    }
    em{
      cursor: pointer;
    }
    span:hover{
      cursor: pointer;
      color: #1989FA;
    }
  }
  .adress_l_wu{
    display: flex;
    align-items: center;
    font-size:.133333rem;
    color: #191919;
    span{
      width:64px;
      margin-right: .3rem;
      color: #999;
    }
    i{
      font-size:.1rem
    }
  }
  .lease{
    color: #606266;
    font-size:.116667rem;
    margin-top: 6px;
    .active{
      color: #1989FA!important;
    }
    .lease_hd{
      height: 72px;
      line-height: 72px;
      border-bottom: 1px solid #E3E6EF;
      span{
        margin-left: .2rem;
        cursor: pointer;
      }
      span:first-of-type{
        margin-left:.133333rem;
      }
      span:hover{
        color: #1989FA;
      }
    }
    .lease_box{
      .lease_box_list,.lease_box_title{
        display: flex;
        align-items: center;
        margin-bottom: .2rem;
        height:106px;
        box-sizing: border-box;
        &>div{
          flex:1;
        }
        .photo{
          position: relative;
          margin-right: .333333rem;
          border-radius: 4px;
          overflow: hidden;
          .photo_img{
            width: 100%;
            height:106px;
          }
        }
        i{
          font-size:.166667rem;
          font-weight:550;
        }
      }
      .lease_box_list:hover{
        border: 1px solid #E3E6EF;
        cursor: pointer;
      }
      .lease_box_title{
        height: 62px;
        color: #303133;
        margin: 0;
        &>div{
          display: flex;
          align-items: center;
        }
        .lease_box_three{
          margin-left: 4px;
          div{
            width: 0; 
            height: 0;
            border-width: 5px;
            border-style: solid;
          }
          .lease_box_three_t{
            border-color: transparent transparent #606266 transparent;
          }
          .lease_box_three_b{
            border-color:#606266 transparent transparent  transparent;
            margin-top: 2px;
          }
        }
        .active{
          color: #1989FA;
          .active_t{
            border-color: transparent transparent #1989FA transparent;
          }
          .active_b{
            border-color:#1989FA transparent transparent  transparent;
          }
        }
      }
    }
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin:.266667rem auto 0;
    height: .333333rem;
    width: 1.85rem;
    color: #606266;
    font-size: 0.116667rem;
    border: 1px solid #E3E6EF;
    border-radius: 0.041667rem;
    img{
      margin-left: 4px
    }
  }
  .more:hover{
    border: 1px solid #4b6dff;
    color: #4b6dff;
  }
  .brief{
    font-size: 0.125rem;
    .brief_box{
      line-height:.2rem;
      color: #191919;
      margin-top: .133333rem;
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
          margin-top: .2rem;
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
  .fixed_left{
    width: 6.666667rem;
    background-color: #fff;
    box-shadow:0px 6px 12px 0px rgba(235,235,235,1);
    padding: 0 .133333rem;
    box-sizing: border-box;
  }
</style>
