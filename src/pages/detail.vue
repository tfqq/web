<template>
   <div :class="isFixed?'warn':'Box'" >
    <Header @dialog="isLogin"></Header>
    <Search  @chuan="check"></Search>
    <div class="doc_title">
      <div class="main">
        <span class="curhover" @click="goWrite(0)">七七找房 </span>>
        <span class="curhover" @click="goWrite(1)">{{result.quming}} 写字楼 </span>>
        <span class="curhover" @click="goWrite(2)">{{result.xuexiaom}} 写字楼 </span>>
        <span class="curhover" @click="goWrite(3)">{{result.xiaoqum}} ></span>
        <span>{{result.xiaoqum}}房源</span>
      </div>
    </div>
    <div class="main">
      <div class="imp">
        <div class="imp_cen" style="margin: 0.333333rem 0;">
            <div class="imp_cen_l">
                <span>{{result.title || result.xiaoqum}}</span> 
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
              <el-carousel trigger="click" height="400px" arrow="never" indicator-position='none' :autoplay="false" ref="carousel" style="margin-bottom:20px">
                <el-carousel-item v-for="(item,index) in allImgList" :key="index">
                  <video controls class="divImg" align="center" :muted="true"  loop id="media" autoplay="autoplay" v-if="item.type=='2'">
                    <source :src="item.image" type="video/mp4"></source>
                  </video>
                  <div class="divImg" v-else>
                      <img :src="item.image" alt="" @click="showImg(index)" class="carouselImg" @error="errImg(item)">
                  </div>
                </el-carousel-item>
              </el-carousel>
              <template v-if="showControl&&imgList.length>1">
                <div class="direction_l" @click="changeImg(1)"><span></span></div>
                <div class="direction_r" @click="changeImg(-1)"><span></span></div>
              </template>
              <div class="content_num">{{initialIndex+1}} / {{imgList.length}}</div>
          </div>
          <Swiper :sliders="allImgList"  @chooseImg="chooseImg" ref="swiper"></Swiper>
        </div>
        <!-- 右侧部分 -->
        <div class="room_r">
          <div class="price_box">
              <i>{{result.zujia*1}}</i>
              <span>&nbsp;{{result.lxming}}</span>
              <div style="#606266">总价:  {{result.zujia*1*30*Math.floor(result.mianji)}} <span>元/月</span> </div>
          </div>
          <div class="room_r_con">
              <div><div>{{Math.floor(result.mianji)}} m²</div>面积</div>
              <div><div>{{result.zhuangxiu}}</div>装修程度</div>
              <div><div>{{result.fwleixing || '未知'}}</div>楼层</div>
          </div>
          <div class="room_r_adress flex_sb">
            <div class="adress_l">
              <div class="adress_l_ad">
                <img src="../../static/location3.png" alt="">
                <span @click="goWrite(1)">{{result.quming}}</span> - 
                <span @click="goWrite(2)">{{result.xuexiaom}}</span>
                <div>{{result.xiaoqudz}}</div>
              </div>
              <div class="adress_l_ad">
                <img src="../../static/home.png" alt="">
                <span @click="goWrite(3)">{{result.xiaoqum}}</span>
                <div>共{{result.lpxx.fysl}}套在租 <i @click="goWrite(3)">查看全部房源>></i></div>
              </div>
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
      <div class="import_con" ref="importantBox">
          <!-- 左侧部分 -->
          <div class="import_con_l">
              <!-- 基本信息 -->
              <div class="baseBox">                
                <div class="import_con_lhd" style="margin-top:0">基本信息</div>
                <div class="baseInfo">
                    <div class="base_con">
                      <div>朝向</div>
                        <span>{{result.chaoxiang|| '未知'}}</span>
                    </div>
                    <div class="base_con">
                        <div>楼层</div>
                        <span>{{result.fwleixing || '未知'}} </span>
                    </div>
                    <div class="base_con">
                        <div>层高</div>
                        <span>{{result.lpxx.xmgaodu?result.lpxx.xmgaodu*1+'m':'未知'}} </span>
                    </div>
                    <div class="base_con">
                        <div>总层数</div>
                        <span>{{result.zlouceng?result.zlouceng+'层':'未知'}}</span>
                    </div>
                    <div class="base_con">
                        <div>免租期</div>
                        <span>面议</span>
                    </div>
                    <div class="base_con">
                        <div>付款方式</div>
                        <span>{{result.fukuanfs|| '未知'}} </span>
                    </div>
                    <div class="base_con">
                        <div>看房时间</div>
                        <span>随时带看</span>
                    </div>
                    <div class="base_con">
                        <div>入驻时间</div>
                        <span>随时入驻</span>
                    </div>
                </div>
              </div>
              <!-- 实拍图 -->
              <div>
                <div class="import_con_lhd">实景图</div>
                <div class="reality_con">
                  <!-- <div :class="imgList.length>4?(imgList.length>5?'img_6':'img_5'):'reality_con_img'" v-for="(item,index) in imgList" :key="index" @click="showImg(index)">
                    <img :src="item" alt="" class="large_img" @error="errImg(index,1)">
                  </div> -->
                  <div class="reality_con_img" v-for="(item,index) in imgList" :key="index" @click="showImg(index)" v-if="index<10">
                    <img :src="item" alt="" class="large_img" @error="errImg(index,1)">
                  </div>
                </div>
              </div>
              <!-- 楼盘名字 -->
              <div>                
                <div class="import_con_lhd">{{result.xiaoqum}}</div>
                <div class="lpName">
                  <div class="baseInfo">
                      <div class="base_con">
                        <div>价格</div>
                        <span>{{result.lpxx.csjunjia ?result.lpxx.csjunjia*1+'元/m²/天' :'未知'}}</span>
                      </div>
                      <div class="base_con">
                        <div>在租</div>
                        <span>{{result.lpxx.fysl}}套房源</span>
                      </div>
                      <div class="base_con">
                        <div>地址</div>
                        <span class="limit_3" style="color:#002184;width:256px;white-space: normal;">{{result.xiaoqudz || '未知'}}</span>
                      </div>
                      <div class="base_con">
                        <div>建筑年代</div>
                        <span>{{result.lpxx.jianzaond*1}}年</span>
                      </div>
                      <div class="base_con">
                        <div>物业费</div>
                        <span>{{result.lpxx.wuyefei ?result.lpxx.wuyefei*1+'元/m²/月' :'未知'}}</span>
                      </div>
                      <div class="base_con">
                        <div>车位租金</div>
                        <span>{{result.lpxx.dshangtcwzl? result.lpxx.dshangtcwzl*1+'元/月': '未知'}} </span>
                      </div>
                  </div>
                  <div class="lpName_r" @click="goWrite(3)">
                      <img :src="result.lpxx.lptp" :alt="result.xiaoqum" :title="result.xiaoqum" class="large_img" @error="errImg(0,2)">
                      <div class="lpName_r_ft flex_sb">{{result.xiaoqum}} <span>查看楼盘详情</span></div>
                  </div>
                </div>
              </div>
          </div>
          <!-- 右侧部分 -->
          <div class="import_con_r">
            <div class="import_con_rBox" :class="hiddenRight?'fixed_right':''">                
              <div class="import_con_r_hd">
                <div class="limit_2">{{result.xiaoqum}}</div>
                <span>{{result.zujia*1}}<i> {{result.lxming}}</i></span>
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
      <div id="map" style="padding-top: 68px;" ref="matching">                
        <per-map :center="center" :zhoubianfy="zhoubianfy"></per-map>
      </div>
      <!-- 类似房源 -->
      <div class="origin" id="origin">
        <div class="import_con_lhd">类似房源</div>
        <div class="other">
          <div
            v-for="(item,index) in otherList"
            :key="index"
            v-if="index<4"
            class="rec_room"
            @click="otherRoom(item.id)"
          >
            <div class="other_img_con">
              <img :src="item.image || '../../static/zhutu.png'" :alt="item.xiaoqum" class="other_img large_img" @error="errImg(item)" :title="item.xiaoqum">
              <img src="../../static/shipin.png" class="video_img" alt="" v-show="item.is_video">
            </div>
            <div class="other_title">
                <h4 class="limit_title">{{item.xiaoqum}}</h4>
                <span><img src="../../static/location.png" alt="">{{item.dizhi}}</span>
            </div>
            <div class="other_title">
                <div style="color:#FF3A00;">{{item.zujia}} <span style="color:#303133">{{item.lxming}}</span> </div>
                <div>{{item.mianji}}㎡</div>
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
import {yyzfApi,cancel_collectApi,goCollectApi,fyDetailApi,tjfyApi} from '@/request/api'
export default {
  metaInfo: {
      meta: [
        {
          name: 'keywords',
          content: '写字楼出租,办公室出租,产业园出租,创业园出租,七七找房,七七找房官网,写字楼网'
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
      showControl:false,
      result: {
        lpxx: {
          lptp: ''
        },
        images: []
      },
      allImgList:[{
        url:'',
        type:''
      }],
      imgList:[],
      initialIndex:0,
      isFixed: false,
      hiddenRight:false,
      phone: '',
      id: '', // 楼盘id
      otherList: [], // 推荐房源
      iscollect: 0,
      zhoubianfy:[],
      center: {
        lng:'',
        lat:''
      },
    }
  },
  watch:{
      initialIndex(newValue,oldValue){
        this.closeVideo(newValue)
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
      var qid=this.result.pianqu
      var sq_id=this.result.xuexiao
      if(type==0){
        var {href} = this.$router.resolve({path: "/index"});
      }else if(type==1){
        // this.$router.push({
        //   name: 'write',
        //   params:{qid}
        // })
        var {href} = this.$router.resolve({path: "/write",query:{qid}});
      }else if(type==2){
        // this.$router.push({
        //   name: 'write',
        //   params:{qid,sq_id}
        // })
        var {href} = this.$router.resolve({path: "/write",query:{qid,sq_id}});
      }else{
        // this.$router.push({ name: 'lpdetail', query: { id:this.result.xiaoqu } })
        var {href} = this.$router.resolve({path: "/lpdetail",query:{ id:this.result.xiaoqu }});
      }
      window.open(href, '_blank');
    },
    // 图片报错
    errImg(item,type){
      if(type==2){
        this.result.lpxx.lptp='../../static/fail.png'
        return
      }
      if(type==1){
        this.$set(this.imgList,item,'../../static/fail.png')
        return
      }
      this.$set(item,'image','../../static/fail.png')
    },
    // 详情
    getList () {
      var id=this.id
      var token =  localStorage.getItem('token') || ''
      fyDetailApi({
        fangyuan_id: id,
        token: token,
        client: 'pc'
      }).then(res => {
          this.result = res.data.result
          this.iscollect = res.data.result.collect
          var img=this.result.images || []
          this.imgList=img
          var allImgList=[]
          img.forEach((item,index)=>{
              var obj={
                  image:item,
                  type:'1'
              }
              allImgList.push(obj)
          })
          var video_url=this.result.shipin_url || ''
          if(video_url){
            allImgList.unshift({
                image:video_url,
                type:2
            })
          }
          this.allImgList=allImgList
          var location=this.result.dituzb
          var zb=location.split(',')
          var position={
            lat:zb[1],
            lng:zb[0]
          }
          this.center=position
          this.zhoubianfy=this.result.zhoubianfy || []
      })
    },
    // 推荐房源
    tuijian () {
      tjfyApi().then(res => {
        this.otherList = res.data.result
      })
    },
    // 跳转房源页面
    otherRoom (id) {
      let {href} = this.$router.resolve({path: "/detail",query: {id}});
      window.open(href, '_blank');
    },                                                        
    // 预约看房
    appointment () {
      var lpid=this.result.xiaoqu
      var params={
        phone:this.phone,
        name: '',
        remarks: '',
        type: '2',
        lpid,
        fyid: this.id
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
    closeVideo(key){
      if(this.imgList[0].type==2){
        var Media = document.getElementById("media"); 
        if(key==0){
          Media.play()
        }else{
          Media.pause()
        }
      }
    },
    // 展示图片
    showImg (index) {
      this.isFixed = true
      this.showInitialIndex=index
      this.closeVideo(1)
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
    // 操控是否登录
    isLogin () {
      location.reload()
    },
    // 收藏
    collect () {
      var id=this.id
      var token = localStorage.getItem('token') || ''
      var data = {
        token: token,
        client: 'pc',
        collect_id: id,
        type: 1
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
        goCollectApi(data).then(res => {
          this.iscollect = 1
          this.$message.success(res.data.msg)
        })
      }
    },
    // 滚动
    handleScroll() {
      const top= document.documentElement.scrollTop || document.body.scrollTop;
      var fixTop=this.$refs.importantBox.offsetTop
      var limitTop=this.$refs.matching.offsetTop-200
      if(top >=fixTop){
        this.hiddenRight=true
        if(top>=limitTop){
          this.hiddenRight=false
        }
      }else{
        this.hiddenRight=false
      }
    },
  },
  created () {
  },
  mounted () {
    this.id = this.$route.query.id
    this.getList()
    this.tuijian()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style lang='less' scoped>
  @import  '../assets/css/detail.css'; 
  .import_con{
    margin-top:36px
  }
  .import_con_lhd{
    margin-top: 40px
  }
  // .baseBox .baseInfo .base_con{
  //   width: 32%;
  //   margin-right: 1.3%;
  // }
</style>
