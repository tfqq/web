<template>
  <div>
    <header-index :area="shi"></header-index>
    <div class="header">
      <img src="../../static/banner.png" alt="" style="height:100%;width:100%;object-fit:cover;">
      <div class="header_cen">
        <div class="main">
          <div class="hd_area">
            <!-- 搜索框 -->
            <div class="searchBox" @click.stop>
              <input type="text" placeholder="输入区域/商圈/大厦名称" v-model="sousuo" @keyup.enter="SearchWrite" @focus="getFocus" @input="isHistory=false;isFocus=true">
              <span @click="SearchWrite" class="search">搜索</span>
              <!-- <template v-if="isFocus">
                <div class="search_area_box" v-if="isHistory&&HistoryList.length">
                  <div class="search_area_list">
                    <div v-for="(item,index) in HistoryList" :key="index">
                      <span @click="choose_name(item)">{{item}}</span>
                      <img src="../../static/del.png" alt="" @click="del(index)">
                    </div>
                  </div>
                </div>
                <div class="search_area_box" v-if="!isHistory&&searchList.length">
                  <div class="search_area_list">
                      <div v-for="(item,index) in searchList" :key="index" @click="choose_name(item.xiaoqum)">
                        <span>{{item.xiaoqum}}</span>
                      </div>
                  </div>
                </div>
              </template> -->
            </div>
            <div class="hd_title">选择区域</div>
            <div class="area">
              <span
                v-for="(item,index) in pianqu"
                :key="index"
                @click="chooseType(item.id,1)"
                :class="[qid===item.id?'active':'']"
              >{{item.pianqum}}</span>
            </div>
            <div class="hd_title">选择面积</div>
            <div class="space">
              <div
                class="mj"
                :class="[mid==item.lxid?'active':'']"
                v-for="(item,index) in mianjisx"
                :key="index"
                @click="chooseType(item.lxid,2)"
              >
                <div></div>
                <span>{{item.lxming}}</span>
              </div>
            </div>
            <div class="zhao"  @click="goWrite(-2)">马上找房</div>
            <div class="ft_area">
               <img src="../../static/map.png" alt="">
                <span @click="map">地图找房</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 热门商圈 -->
      <div class="imp_title flex_sb">
        <div class="imp_title_l">
          <h1>热门商圈</h1> <span>核心地段 优质配套</span>
        </div>
        <div class="imp_title_r" @click="goOther(0)">查看更多</div>
      </div>
      <div class="hot" v-if="result.rmsq.length">
        <div class="hot_l">
          <div class="hot_l_box">
            <img
            :src="firstImg.image"
            :alt="firstImg.xuexiaom"
            :title="firstImg.xuexiaom"
            @click="goWrite(firstImg.id,firstImg.sspianqu)"
          >
          <div class="title"><span>{{firstImg.xuexiaom}}</span> </div>
          </div>
          
        </div>
        <div class="hot_r">
          <div class="hot_r_con" v-for="(item,index) in result.rmsq" :key="index" @click="goWrite(item.id,item.sspianqu)" v-if="index>0">
            <div class="hot_r_box">
              <img :src="item.image || '../../static/zhutu.png'" :alt="item.xuexiaom" :title="item.xuexiaom" @error="errImg(item)">
              <div class="title"><span>{{item.xuexiaom}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="noRecord" v-else>
        <img src="../../static/kong.png" alt="">
        <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goOther(0)">看看其他</div></div>
      </div>
      <!-- 精选出租写字楼 -->
      <div class="imp_title flex_sb">
          <div class="imp_title_l">
            <h1>精选出租写字楼</h1> <span>穿梭于高端楼宇之间</span>
          </div>
          <div class="imp_title_r" @click="goOther(0)">查看更多</div>
      </div>
      <div class="office" v-if="result.rmlp.length">
          <div class="office_box" v-for="(item,index) in result.rmlp" :key="index" @click="goDetail(1,item.id)" v-if="index<8">
            <div class="imgBox">
                <img :src="item.image || '../../static/zhutu.png'" :alt="item.xiaoqum" :title="item.xiaoqum" @error="errImg(item)">
            </div>
            <div class="office_ft">
                <h2>{{item.xiaoqum}}</h2>
                <div class="flex_sb office_ft_p" style="margin-top: -8px;">
                  <div style="color:#606266"><img src="../../static/location.png" alt=""> {{item.pianqum}}{{item.xuexiaom?'-'+item.xuexiaom:''}}</div>
                  <div> <i>{{item.csjunjia*1}}</i> 元/㎡/天</div>
                </div>
            </div>
          </div>
      </div>
      <div class="noRecord" v-else>
        <img src="../../static/kong.png" alt="">
        <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goOther(0)">看看其他</div></div>
      </div>
      <!-- 写字楼出售 -->
      <div class="imp_title flex_sb">
          <div class="imp_title_l">
            <h1>写字楼出售</h1> <span>房东涨价 不如自己买</span>
          </div>
          <div class="imp_title_r" @click="goOther(1)">查看更多</div>
      </div>
      <div class="office sail" v-if="result.fysale.length">
          <div class="office_box" v-for="(item,index) in result.fysale" :key="index" @click="goDetail(2,item.id)">
              <div class="imgBox">
                  <img :src="item.image || '../../static/zhutu.png'" :alt="item.name" :title="item.name" @error="errImg(item)">
              </div>
              <div class="office_ft">
                  <div class="flex_sb">
                    <h2>{{item.name}}</h2>
                    <div style="color:#606266"><img src="../../static/location.png" alt="" style="margin:0">{{item.area_name}}</div>
                  </div>
                  <div class="flex_sb office_ft_p">
                    <div> <i style="font-size:.15rem">{{item.min_price*1}}-{{item.max_price*1}}</i> 万/㎡</div>
                    <div>可售户型 <span>{{item.min_mianji}}-{{item.max_mianji}}</span> ㎡</div>
                  </div>
              </div>
          </div>
      </div>
      <div class="noRecord" v-else>
        <img src="../../static/kong.png" alt="">
        <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goOther(1)">看看其他</div></div>
      </div>
      <!-- 优质房源 -->
      <div class="imp_title flex_sb">
        <div class="imp_title_l">
          <h1>优质房源</h1> <span>奋斗于优质环境之中</span>
        </div>
        <div class="imp_title_r" @click="goOther(0)">查看更多</div>
      </div>
      <div class="banner" v-if="result.fangyuan.length">
        <!-- 左侧部分 -->
        <div class="banner_l">
          <div class="banner_box" v-for="(item, index) in result.fangyuan" :key="index" @click="goDetail(3,item.id)" v-if="index<15">
            <div class="banner_bl_img">
              <img :src="item.image || '../../static/zhutu.png'" @error="errImg(item)" :title="item.xiaoqum" :alt="item.xiaoqum" class="w_img banner_img">
            </div>
            <div class="banner_br">
              <h2 class="text_limit" style="width:460px;" @click="goDetail(3,item.id)">{{item.title || item.xiaoqum}}</h2>
              <div class="flex_sb" style="align-items: flex-end">
                <div class="banner_det_adress">
                  <div style="margin-top:20px">
                    <img src="../../static/location2.png" alt="">{{item.pianqu}}{{item.sssq?'-'+item.sssq:''}} {{item.xiaoqudz?'/ '+item.xiaoqudz:''}}
                  </div>
                  <div style="margin:10px 0">
                    <img src="../../static/home1.png" alt="">{{item.xiaoqum}} / {{item.mianji}}㎡ / {{item.zhuangxiu}}
                  </div>
                </div>
                <div style="color:#FF4400;font-weight:550;cursor: pointer;" @click="goDetail(3,item.id)"> <i style="font-size:0.333333rem;">{{item.price*1}}</i> {{item.lxming}}</div>
              </div>
              <div class="banner_det_ditie">
                <span v-if="item.kezhuce==1" class="del_zc">可注册</span>
                <span v-if="item.ditie" class="del_dt">地铁口</span>
                <span v-if="item.kongtiao==1" class="del_kt">空调</span>
                <span v-if="item.bgjiajv==1" class="del_bg">办公家具</span>
              </div>
            </div>
          </div>
          <div class="check_more" @click="goOther(0)">查看更多优质房源</div>
        </div>
        <!-- 右侧部分 -->
        <div class="banner_r" ref="rightBox">
          <div class="banner_r_box"  :class="hiddenRight?'fixed_right':''">
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
      <div class="noRecord" v-else>
        <img src="../../static/kong.png" alt="">
        <div class="noRecord_r">啊哦，暂未找到您要的内容～ <div @click="goOther(2)">看看其他</div></div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/footer'
import headerIndex from '../components/headerIndex'
import { homeApi,sxtjApi,yyzfApi,searchApi } from '@/request/api'
export default {
  metaInfo: {
    meta: [
      {
        name: 'keywords',
        content: "七七找房，写字楼出租，办公室出租，写字楼租赁"
      }
    ]
  },
  components: {
    Footer,
    headerIndex
  },
  data () {
    return {
      moren:{}, // 默认市
      sousuo: '', // 大厦内容
      pianqu: [], // 片区列表
      mianjisx: [], // 面积列表
      result:{
        rmsq:[],
        fysale:[],
        fangyuan:[],
        rmlp:[],
      },
      firstImg:{},
      chooseTimeout:undefined,
      mid: '', // 选中的面积大小
      qindex:-1,
      qid: '', // 选中的区域
      shi: [], // 市列表
      phone:'',
      HistoryList:[],
      isFocus:false,
      isHistory:true,
      searchList:[],
      hiddenRight:false
    }
  },
  watch:{
    // sousuo(newName, oldName){
    //   if(!newName){
    //     this.searchList=[]
    //     return
    //   }
    //   searchApi({ keyword: newName }).then(res => {
    //     var { result } = res.data
    //     this.searchList=result || []
    //   })
    // },
  },
  methods: {
    getFocus(){
      if(!this.sousuo){
        this.isFocus=true
      }
    },
    del(index){
      this.HistoryList.splice(index, 1)
      localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList))
    },
    choose_name(name){
      this.SearchVal(name)
      this.sousuo=name
      this.isFocus=false
      this.isHistory=true
      setTimeout(()=>{
        this.SearchWrite()
      },1000)
    },
    // 存入历史记录
    SearchVal (val) {
      val = val.trim() // 清除空格
      if (this.HistoryList.length > 0) { // 有数据的话 判断
        if (this.HistoryList.includes(val)) { // 有相同的，先删除 再添加 
          this.HistoryList.splice(this.HistoryList.indexOf(val), 1)
          this.HistoryList.unshift(val)
        } else { // 没有相同的 添加
          this.HistoryList.unshift(val)
        }
      } else { // 没有数据 添加
        this.HistoryList.unshift(val)
      }
      if (this.HistoryList.length > 6) { // 保留六个值
        this.HistoryList.pop()
      }
      localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList))
    },
    // 首页列表
    getList () {
      var id=this.moren.id
      homeApi({ shi_id: id }).then(res => {
        this.result=res.data.result
        this.firstImg=this.result.rmsq[0]
      })
    },
    errImg(item){
      this.$set(item,'image','../../static/fail.png')
    },
    getCity(){
        var id=this.moren.id
        sxtjApi({ shi_id: id }).then(res => {
          var {result} = res.data
          //  result.shi.push({id:25,xzqming:'测试'})
          var shi = result.shi
          this.shi = shi
          this.mianjisx = result.mianjisx
          this.pianqu = result.pianqu
          this.pianqu.unshift({ id: 0, pianqum: '不限' })
      })
    },
    // 选择房子面积
    chooseType(id,type) {
      var that = this
      if (typeof(that.chooseTimeout) != "undefined") {
        clearTimeout(that.chooseTimeout)
      }
      if(type==1){
        that.qid = id
      }else{
        that.mid = id
      }
      that.chooseTimeout = setTimeout(()=>{
        this.$router.push({
          name: 'write',
          params:{qid:that.qid,mid:that.mid}
        })
      }, 2000)
    },
    goWrite(sq_id,qid){
      if(sq_id=='-2'){
        clearTimeout(this.chooseTimeout)
        this.$router.push({
          name: 'write',
          params:{qid:this.qid,mid:this.mid}
        })
        return
      }
      this.$router.push({
        name: 'write',
        params:{qid,sq_id}
      })
    },
    SearchWrite(){
      var search=this.sousuo
      if(this.sousuo){
        this.SearchVal(search)
        this.isFocus=false
        this.isHistory=true
      }
      this.$router.push({
        name: 'write',
        params:{search}
      })
    },
    // 地图找房
    map () {
      let {href} = this.$router.resolve({path: "/ditu"});
      window.open(href, '_blank');
    },
    // 委托
    appointment () {
      var params={
        phone:this.phone,
        name:'',
        remarks:'',
        type: '2',
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
    goDetail(type,id){
      if(type==1){
        var {href} = this.$router.resolve({path: "/lpdetail",query: {id}});
      }else if(type==2){
        var {href} = this.$router.resolve({path: "/housedetail",query: {id}});
      }else{
        var {href} = this.$router.resolve({path: "/detail",query: {id}});
      }
      window.open(href, '_blank');
    },
    goOther(type){
      if(type==0){
        var {href} = this.$router.resolve({path: "/write"});
        window.open(href, '_blank');
      }else if(type==1){
        var {href} = this.$router.resolve({path: "/house"});
        window.open(href, '_blank');
      }else{
        var {href} = this.$router.resolve({path: "/good"});
        window.open(href, '_blank');
      }
    },
    handleScroll() {
      const top= document.documentElement.scrollTop || document.body.scrollTop;
      var fixTop=this.$refs.rightBox.offsetTop
      if(top >= fixTop){
        this.hiddenRight=true
      }else{
        this.hiddenRight=false
      }
    },
  },
  mounted () {
    this.moren=JSON.parse(localStorage.getItem('default_shi'))
    this.HistoryList=JSON.parse(localStorage.getItem('HistoryList')) || []
    this.getCity()
    this.getList()
    document.addEventListener('click',(e)=>{
      this.isFocus=false
      this.isHistory=true
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
  .main{
    padding-bottom: .266667rem;
    overflow: hidden;
  }
  i{
    font-weight: 550;
  }
  .flex_sb img{
    vertical-align: bottom;
    margin-right: -2px
  }
  // 点击面积样式
  .active {
    color: #1989FA !important;
    font-weight: 500;
    div {
      background-color: #1989FA !important;
    }
  }
  .kong {
    margin: 0 auto;
    text-align: center;
    color: #999999;
  }
  // 区域面积选择框
  .header {
    height:600px;
    position: relative;
    .header_cen{
      position: absolute;
      top:0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .hd_area {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width:384px;
      padding:28px 32px;
      font-size: .1rem;
      background-color: #fff;
      border-radius: 0.083333rem;
      color: #666666;
      box-sizing: border-box;
      // 搜索
      .searchBox{
        position: relative;
        display: flex;
        border-radius:.2rem;
        background:rgba(246,246,246,1);
        border:1px solid rgba(227,230,239,1);
        font-size:.116667rem;
        height:36px;
        box-sizing: border-box;
        margin-bottom: .2rem;
        input{
          width:230px;
          background-color: transparent;
          height:36px;
          line-height:36px;
          padding: 0 .133333rem;
          box-sizing: border-box;
        }
        input:-ms-input-placeholder,
        textarea:-ms-input-placeholder {
          color:  #C0C4CC;
        }
        .search{
          background:linear-gradient(90deg,rgba(0,174,255,1) 0%,rgba(25,137,250,1) 100%);
          border-radius:24px;
          color: #fff;
          height:36px;
          line-height:36px;
          text-align: center;
          flex:1;
          cursor: pointer;
        }
        .search_area_box{
          position: absolute;
          width:230px;
          max-height:300px;
          top:36px;
          left: 12px;
          background-color: #fff;
          z-index: 100;
          border: 1px #e6e6e6 solid;
          overflow: hidden;
          .search_area_list{
            div{
              display: flex;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              padding: 0 12px;
              font-size: 14px;
              color: #666;
              height: 30px;
              line-height: 30px;
              span{
                flex:1
              }
              img{
                display: none;
              }
            }
            div:hover{
              background-color: #fafafa;
              img{
                display: block;
              }
            }
          } 
        }
      }
      // 选择标题
      .hd_title{
        color:#212121;
        font-weight:550
      }
      // 区域
      .area {
        display: flex;
        flex-wrap: wrap;
        padding:.066667rem 0 .266667rem;
        span {
          margin-top:.133333rem;
          margin-right: 0.2rem;
          cursor: pointer;
        }
        span:hover{
          color: #1989FA;
        }
      }
      // 面积
      .space {
        display: flex;
        flex-wrap: wrap;
        padding:.066667rem 0 .266667rem;
        .mj {
          width: 22%;
          text-align: center;
          margin-right:.066667rem;
          margin-top:.133333rem;
          cursor: pointer;
          div {
            height: 0.133333rem;
            background-color: #E6F1FC;
            margin-bottom: 8px;
          }
          span {
            font-size: 0.1rem;
          }
        }
        .mj:hover{
            color: #1989FA;
            div {
              background-color: #1989FA;
            }
          }
      }
      // 马上找房
      .zhao {
        cursor: pointer;
        background: #1989FA;
        border-radius: 0.041667rem;
        color: #fff;
        margin-bottom:.133333rem;
        height:48px;
        line-height:48px;
        text-align: center;
      }
      .zhao:hover{
        background-color: #0077EF;
      }
      .ft_area {
        cursor: pointer;
        text-align: center;
        height:48px;
        line-height:48px;
        border-radius:.033333rem;
        border:1px solid rgba(227,230,239,1);
        color: #191919;
        font-weight:550;
      }
      .ft_area:hover{
        color: #1989FA
      }
    }
  }
  // 主要标题
  .imp_title{
    margin-top: 64px;
    .imp_title_l{
      h1{
        display: inline-block;
        margin-right: 20px;
      }
      span{
        font-size:.133333rem;
        color: #606266;
      }
    }
    .imp_title_r{
      cursor: pointer;
      font-size:.133333rem;
      width:112px;
      height:.333333rem;
      line-height:.333333rem;
      border-radius:4px;
      border:1px solid rgba(227,230,239,1);
      text-align: center;
      color: #606266;
    }
    .imp_title_r:hover{
      color: #1989FA;
      border:1px solid #1989FA;
    }
  }
  // 热门商圈
  .hot {
    display: flex;
    .title{
      position: absolute;
      left: 0;
      bottom: 0;
      padding:0 .266667rem;
      color: #fff;
      width: 100%;
      box-sizing: border-box;
      height:.6rem;
      line-height:.6rem;
      background:linear-gradient(180deg,rgba(48,49,51,0) 0%,rgba(48,49,51,1) 100%);
      span{
        font-weight: 500;
        font-size:.183333rem;
      }
    }
    .hot_l {
      flex: 1;
      position: relative;
      cursor: pointer;
      border-radius:4px;
      height:550px;
      margin-top: 20px;
      .hot_l_box{
        position: absolute;
        background-color: #E3E6EF;
        top:0;
        width:100%;
        height:100%;
        background-color: #E3E6EF;
        transition: all .2s ease-in;
        border-radius:4px;
        overflow: hidden;
      }
      img{
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }
    .hot_r {
      flex: 2;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      .hot_r_con{
        position: relative;
        width: 48%;
        height:265px;
        margin-left: 2%;
        margin-top: 20px;
        border-radius:4px;
      }
      .hot_r_box{
        position: absolute;
        top:0;
        width:100%;
        height:100%;
        background-color: #E3E6EF;
        transition: all .2s ease-in;
        border-radius:4px;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .hot_r_box:hover,.hot_l_box:hover{
      top:-4px;
    }
  }
  // 精选出租写字楼
  .office{
    display: flex;
    flex-wrap: wrap;
    .office_box{
      width: 23%;
      margin-right:2.6%;
      margin-top:.2rem;
      cursor: pointer;
      transition: all .4s;
      .imgBox{
        width:100%;
        height:192px;
        background-color: #E3E6EF;
        border-radius: 4px;
        overflow: hidden;
        img{
          width:100%;
          height:100%;
          
        }
      }
      .office_ft{
        padding: .1rem 8px;
        background-color: #fff;
        .office_ft_p{
          font-size:.1rem;
          // margin-top: 6px;
          align-items: baseline;
          i{
            color: #FF3A00;
            font-size:.233333rem;
          }
        }
      }
    }
    .office_box:nth-of-type(4n){
      margin-right:0;
    }
    .office_box:hover{
      box-shadow:0px 6px 12px 0px rgba(227,230,239,1);
    }
  }
  // 写字楼出售
  .sail{
    .office_ft_p{
      margin-top:10px;
      span{
        font-weight:550;
        font-size:.15rem;
      }
    }
  }
  .banner_img{
    transform:scale(1.0);
    transition:transform 0.5s ease;
  }
  .banner_img:hover{
    transform:scale(1.1)
  }
  // 优质房源
  .banner{
    display: flex;
    margin-top: .233333rem;
    .banner_l {
      position: relative;
      flex:1;
      font-size: .116667rem;
      .banner_box {
        display: flex;
        justify-content: space-between;
        margin-bottom:32px;
      }
      .banner_bl_img{
        width:2rem;
        height: 1.333333rem;
        overflow:hidden;
        border-radius: 4px;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%
        }
      }
      .banner_br {
        flex:1;
        margin-left: 10px;
        h2:hover{
          color: #1989FA;
          cursor: pointer;
        }
        .banner_det_adress{
          color: #606266;
          width:300px;
          img{
            margin-right: 3px;
            vertical-align: middle;
          }
          div{
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
        .banner_det_ditie{
          margin-top:.166667rem;
          span{
            line-height: 24px;
            height: 24px;
            display: inline-block;
            padding:0 10px;
            border-radius: 4px;
            margin-right: .1rem;
          }
          .del_zc{
            background-color: #FEEEEA;
            color:#FD9C7C
          }
          .del_dt{
            background-color: #E5FBF8;
            color:#85C3BB
          }
          .del_kt{
            background-color: #ECF1FA;
            color:#A2AFC8
          }
          .del_bg{
            background-color:#FDF7E5;
            color:#DDB855
          }
        }
      }
    }
    .banner_r {
      width:360px;
      margin-left:.333333rem;
      .banner_r_box{
        width:360px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(227,230,239,1);
        padding:  .266667rem .133333rem 0;
        box-sizing: border-box;
        height:162px;
      }
      .banner_r_hd{
        text-align: center;
        margin-bottom: .266667rem ;
        font-size:.15rem;
        font-weight:550;
        img{
          margin-right: .066667rem;
        }
      }
      .subscribe {
        background-color: #fff;
        font-size:.116667rem;
        display: flex;
        input {
          padding:0 .133333rem;;
          flex:1;
          height:40px;
          line-height:40px;
          border: none;
          background-color: #F6F6F6;
          border-radius:4px 0px 0px 4px;
        }
        div {
          width:.866667rem;
          cursor: pointer;
          height:40px;
          line-height:40px;
          background-color: #1989FA;
          color: #fff;
          text-align: center;
          border-radius:0px 4px 4px 0px;
        }
      }
    }
  }
  .check_more{
    cursor: pointer;
    font-size:.133333rem;
    width:200px;
    height:.333333rem;
    line-height:.333333rem;
    border-radius:4px;
    border:1px solid rgba(227,230,239,1);
    text-align: center;
    color: #606266;
    margin: 20px auto ;
  }
  .check_more:hover{
    color: #1989FA;
    border:1px solid #1989FA;
  }
  .fixed_right{
    position: fixed;
    top:0;
    z-index: 100;
  }
</style>
