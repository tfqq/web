<template>
  <div>
    <Header bg="collect" @dialog="isLogin" ref="child"/>
    <div class="main">
      <div style="margin:.333333rem 0;font-size:.233333rem;font-weight:bold">我的收藏</div>
    </div>
    <div class="main banner_hd">
      <div class="banner_hd_box">
        <div :class="[type==3?'active_a':'']" @click="choose(3)">新房</div>
        <div :class="[type==2?'active_a':'']" @click="choose(2)">楼盘</div>
        <div :class="[type==1?'active_a':'']"  @click="choose(1)">房源</div>
      </div>
    </div>
    <div class="main largeBox">
      <!-- 主体部分 -->
      <div class="banner" v-loading="loading" element-loading-text="拼命加载中…" element-loading-spinner="el-icon-loading">
        <!-- 左侧部分 -->
        <div class="banner_l">
          <!-- 新房 -->
          <template v-if="type==3">
            <div class="banner_box" v-for="(item, index) in ulist" :key="index">
              <div class="banner_bl_img">
                <img :src="item.lptp || '../../static/zhutu.png'" @error="errImg(item)" :title="item.name" :alt="item.name" class="w_img banner_img" @click="detail(item.fyid)">
              </div>
              <div class="banner_br">
                <div class="banner_br_hd">
                  <h2 style="cursor: pointer;" @click="detail(item.fyid)">{{item.name}}</h2>
                  <div class="flex_sb">
                    <div class="banner_det_adress">
                      <div><img src="../../static/location2.png" alt=""><span>{{item.house_address}}</span></div>
                      <div><img src="../../static/home1.png" alt=""><span>{{item.min_mianji*1}}~{{item.max_mianji*1}} {{item.mianji_unit}}</span></div>
                    </div>
                    <div style="text-align:center;cursor: pointer;" @click="detail(item.fyid)">
                      <div style="color:#FF4400;font-weight:550;"><i style="font-size:.333333rem;">
                        {{item.min_price*1?item.min_price*1:'0'}}~{{item.max_price*1?item.max_price*1:''}}</i> {{item.price_unit}}</div>
                    </div>
                  </div>
                  <div class="banner_det_ditie">
                    <span v-show="item.exit">{{item.exit}}</span>
                    <div @click="detail(item.fyid)">查看详情 <img src="../../static/right_gary.png" alt=""></div>
                  </div>
                </div>
              </div>
            </div>
            <template>
              <div class="noRecord" v-if="isKong==1">
                <img src="../../static/kong.png" alt="">
                <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goIndex">返回首页</div></div>
              </div>
              <div class="noRecord"  v-if="isKong==2">
                <img src="../../static/kong.png" alt="">
                <div class="noRecord_r">抱歉，您访问的页面出错了<div @click="goIndex">返回首页</div></div>
              </div>
            </template>
          </template>
          <!-- 楼盘 -->
          <template v-if="type==2">
            <div class="banner_box" v-for="(item, index) in ulist" :key="index">
              <div class="banner_bl_img">
                <img :src="item.lptp || '../../static/zhutu.png'" @error="errImg(item)" :title="item.lpming" :alt="item.lpming" class="w_img banner_img" @click="detail(item.fyid)">
              </div>
              <div class="banner_br">
                <div class="banner_br_hd">
                  <h2 style="cursor: pointer;" @click="detail(item.fyid)">{{item.lpming}}</h2>
                  <div class="flex_sb">
                    <div class="banner_det_adress">
                      <div>{{item.dizhi}} {{item.xiaoqudz?'/ '+item.xiaoqudz:''}}</div>
                      <div>{{item.line}}{{item.exit?'-'+item.exit:''}} / {{Math.floor(item.mianji_min)}}-{{Math.floor(item.mianji_max)}}  ㎡</div>
                      <div style="color:#1989FA;font-size:12px;">{{item.yyxx}}</div>
                    </div>
                    <div style="text-align:center;cursor: pointer;" @click="detail(item.fyid)">
                      <div style="color:#FF4400;font-weight:550;"><i style="font-size:.333333rem;">{{item.lpzj}}</i> {{item.unit}}</div>
                    </div>
                  </div>
                  <div class="space">
                    <span v-for="(itemm,index) in item.mianjilb" :key="index" v-if="index<5" @click="fy_detail(itemm.id)">{{Math.floor(itemm.mianji)}} ㎡</span>
                    <span v-if="item.mianjilb.length>5" @click="detail(item.id)">更多></span>
                  </div>
                </div>
              </div>
            </div>
            <template>
              <div class="noRecord" v-if="isKong==1">
                <img src="../../static/kong.png" alt="">
                <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goIndex">返回首页</div></div>
              </div>
              <div class="noRecord"  v-if="isKong==2">
                <img src="../../static/kong.png" alt="">
                <div class="noRecord_r">抱歉，您访问的页面出错了<div @click="goIndex">返回首页</div></div>
              </div>
            </template>
          </template>
          <!-- 房源 -->
          <template v-if="type==1">
            <div class="banner_box" v-for="(item, index) in ulist" :key="index">
              <div class="banner_bl_img">
                <img :src="item.fytp || '../../static/zhutu.png'" @error="errImg(item,1)" :title="item.lpming" :alt="item.lpming" class="w_img banner_img" @click="detail(item.fyid)">
              </div>
              <div class="banner_br">
                <div class="banner_br_hd">
                  <h2 @click="detail(item.fyid)">{{item.title || item.lpming}}</h2>
                  <div class="flex_sb">
                    <div class="banner_det_adress">
                      <div><img src="../../static/location2.png" alt="">{{item.lpdz}} {{item.xiaoqudz?'/ '+item.xiaoqudz:''}}</div>
                      <div><img src="../../static/home1.png" alt="">{{item.lpming}} / {{item.fymj}} / {{item.zhuangxiu}}</div>
                    </div>
                    <div style="text-align:center;cursor: pointer;" @click="detail(item.fyid)">
                      <div style="color:#FF4400;font-weight:550;"><i style="font-size:.333333rem;">{{item.fyzj}}</i> {{item.lxming}}</div>
                    </div>
                  </div>
                  <!-- tag -->
                  <div class="banner_det_ditie">
                    <span v-if="item.kezhuce==1" class="del_zc">可注册</span>
                    <span v-if="item.ditie" class="del_dt">地铁口</span>
                    <span v-if="item.kongtiao==1" class="del_kt">空调</span>
                    <span v-if="item.bgjiajv==1" class="del_bg">办公家具</span>
                  </div>
                </div>
              </div>
            </div>
            <template>
              <div class="noRecord" v-if="isKong==1">
                <img src="../../static/kong.png" alt="">
                <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goIndex">返回首页</div></div>
              </div>
              <div class="noRecord"  v-if="isKong==2">
                <img src="../../static/kong.png" alt="">
                <div class="noRecord_r">抱歉，您访问的页面出错了<div @click="goIndex">返回首页</div></div>
              </div>
            </template>
          </template>
          <el-pagination
            background
            layout="prev, pager, next"
            :total=count
            :current-page="page"
            @current-change="currentChange"
            @prev-click="currentChange"
            @next-click="currentChange"
            hide-on-single-page
            class="page"
            >
          </el-pagination>
        </div>
        <!-- 右侧部分 -->
        <div class="banner_r">
          <img src="../../static/map-pic.png" alt="" class="map"  @click="map">
          <div class="banner_r_box"  ref="rightBox" :class="hiddenRight?'fixed_right':''">
            <div class="banner_r_hd">
              <img src="../../static/mobile.png" alt="">手机端
            </div>
            <div class="xcx">
              <img src="../../static/xcx.jpg" alt="">
              <div>微信扫一扫</div>
            </div>
            <div class="banner_r_hd">
              <img src="../../static/zixun.png" alt="">免费咨询 {{$bus.kfPhone}}
            </div>
            <div class="subscribe">
              <input type="number" v-model="phone" placeholder="请输入手机号码" @keyup.enter="appointment">
              <div @click="appointment">预约看房</div>
            </div>
           </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/header'
import Footer from '../components/footer'
import {yyzfApi,collectApi} from '@/request/api'
export default {
  name: 'collect',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      fixTop:'',
      hiddenRight:false,
      count: null, // 总条数
      city: {},
      type:3, // 综合排序
      phone: '',
      ulist: [],
      page:1,
      loading:false,
      isKong:0
    }
  },

  methods: {
    // 返回首页
    goIndex(type){
      this.$router.push({ name: 'index'})
    },
    // 前往详情页面
    detail (id) {
      if (this.type ==1) {
        var {href} = this.$router.resolve({path: "/detail",query: {id}});
      } else if(this.type ==2) {
        var {href} = this.$router.resolve({path: "/lpdetail",query: {id}});
      }else{
        var {href} = this.$router.resolve({path: "/housedetail",query: {id}});
      }
      window.open(href, '_blank');
    },
    fy_detail(id){
      var {href} = this.$router.resolve({path: "/detail",query: {id}});
      window.open(href, '_blank');
    },
    errImg(item,type){
      if(type==1){
        this.$set(item,'fytp','../../static/fail.png')
        return
      }
      this.$set(item,'lptp','../../static/fail.png')
    },
    //收藏列表
    getList () {
      var token =localStorage.getItem('token') || ''
      if(!token){
        this.$message.error('请先登录')
        this.ulist=[]
        this.isKong=1
        return
      }
      this.$refs.child.clear();
      var params={
        num: '10',
        now_page: this.page,
        type:this.type,
        client: 'pc',
        shi_id:this.city.id,
        token
      }
      this.loading=true
      this.isKong=0
      collectApi(params).then(res => {
        this.ulist = res.data.result || []
        this.loading=false
        if(this.ulist.length<1){
          this.isKong=1
        }
      }).catch((status)=>{
        this.isKong=2
        this.loading=false
        if(status==-99 || status==-100){
          this.$refs.child.clear();
        }
        this.ulist = []
      })
    },
    choose (index) {
      if(this.type==index){
        return
      }
      this.type = index
      this.page=1
      this.getList()
    },
    // 当前页now_page
    currentChange (num) {
      this.page = num
      this.getList()
    },
    isLogin () {
      location.reload()
    },
    // 预约看房
    appointment () {
      var params={
        phone:this.phone,
        name:'',
        remarks:'',
        type:2,
        lpid: '',
        fyid: ''
      }
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
        }else{
          this.phone=''
        }
      })
    },
    // 地图找房
    map () {
      var {href} = this.$router.resolve({path: "/ditu"});
      window.open(href, '_blank');
    },
    handleScroll() {
      const top= document.documentElement.scrollTop || document.body.scrollTop;
      var {fixTop}=this
      if(top >= fixTop){
        this.hiddenRight=true
      }else{
        this.hiddenRight=false
      }
    },
  },
  created () {},
  mounted () {
    this.city= JSON.parse(localStorage.getItem('default_shi'))
    this.fixTop=this.$refs.rightBox.offsetTop
    this.getList()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
@import  '../assets/css/list.css';
.banner_hd{
  border-bottom: 1px solid #D8D8D8;
}
.banner_hd_box {
  font-size: .133333rem;
  div{
    display: inline-block;
    width:1rem;
    height: 44px;
    text-align: center;
    cursor: pointer;
  }
  .active_a{
    color: #1989FA;
    border-bottom:1px solid #1989FA;
  }

}
.banner_det_adress{
  img{
    margin-right: .033333rem;
  }
}
.flex_sb{
  margin-top:10px
}
.banner_det_ditie span{
  float: left;
  background-color: #ECF1FA;
  color: #A2AFC8;
}

</style>
