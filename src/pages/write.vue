<template>
  <div  ref="container">
    <Header bg="office" :key="timer"/>
    <Search title="xiezi" @chuan="check" ref="search"></Search>
    <!-- 面包屑 -->
    <div class="doc_title">
      <div class="main">
        <span class="curhover" @click="goIndex(1)">七七找房</span>
        <span>> 找写字楼</span> 
      </div>
    </div>
    <div class="main largeBox">
      <!-- 区域 选择-->
      <div class="area">
        <!-- 区域 -->
        <div class="area_con">
          <span class="area_l">区域</span>
          <div class="area_r">
            <div class="area_det">
              <span class="area_span" :class="[qindex==item.id?'active':'']" v-for="(item,index) in resultList.pianqu" :key="index" @click="chooseQ(item.id,item.pianqum)">{{item.pianqum}}</span>
            </div>
          </div>
        </div>
        <!-- 商圈 -->
        <div class="area_con area_sq" v-if="shangquan.length">
          <span class="area_l">&nbsp; &nbsp; &nbsp; &nbsp; </span>
          <div class="area_r">
            <div class="area_det" style="border-top:1px solid #eee">
              <span class="area_span" :class="[sindex==item.id?'active':'']" v-for="(item,index) in shangquan" :key="index" @click="chooseSQ(item.id,item.xuexiaom)">{{item.xuexiaom}}</span>
            </div>
          </div>
        </div>
        <!-- 地铁 -->
        <div class="area_con">
          <span class="area_l">地铁</span>
          <div class="area_r">
            <div class="area_det">
              <span class="area_span" :class="[dtindex==item.lxid?'active':'']" v-for="(item,index) in resultList.ditielx" :key="index" @click="chooseDt(item.lxid,item.lxming)">{{item.lxming}}</span>
            </div>
          </div>
        </div>
        <!-- 地铁口 -->
        <div class="area_con area_sq" v-if="ditieKouList.length">
          <span class="area_l">&nbsp; &nbsp; &nbsp; &nbsp; </span>
          <div class="area_r">
            <div class="area_det" style="border-top:1px solid #eee">
              <span class="area_span" :class="[dtkindex==item.id?'active':'']" v-for="(item,index) in ditieKouList" :key="index" @click="chooseDtk(item.id,item.name)">{{item.name}}</span>
            </div>
          </div>
        </div>
        <!-- 面积 -->
        <div class="area_con">
          <span class="area_l">面积</span>
          <div class="area_r">
            <div class="area_det">
                <span class="area_span" :class="[mindex==item.lxid?'active':'']" v-for="(item,index) in resultList.mianjisx" :key="index" @click="chooseM(item.lxid,item.lxming)">{{item.lxming}}</span>
                <div class="srk">
                  <input type="number" v-model="inp1" style="width:.5rem" oninput="if(value.length > 7)value = value.slice(0, 7)" @keyup.enter="submit1"> -
                  <input type="number" oninput="if(value.length > 7)value = value.slice(0,7)" v-model="inp2" style="width:.5rem" @keyup.enter="submit1"> m²
                  <span  @click='submit1'>确定</span>
                </div>
            </div>
          </div>
        </div>
        <!-- 单价不限 -->
        <div class="area_con">
          <span class="area_l">单价</span>
          <div class="area_r">
            <div class="area_det">
              <span  class="area_span" :class="[dindex==item.lxid?'active':'']" v-for="(item,index) in resultList.zujiasx" :key="index" @click="chooseD(item.lxid,item.lxming)">{{item.lxming}}</span>
               <div class="srk">
                  <input type="number" v-model="inp3" oninput="if(value.length > 7)value = value.slice(0, 7)" style="width:.5rem" @keyup.enter="submit2"> -
                  <input type="number" oninput="if(value.length > 7)value = value.slice(0, 7)" v-model="inp4" style="width:.5rem" @keyup.enter="submit2"> 元/m²/天
                  <span  @click='submit2'>确定</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 装修不限 -->
        <div class="area_con">
          <span class="area_l">装修</span>
          <div class="area_r">
            <div class="area_det">
                <span class="area_span" :class="[zindex==item.lxid?'active':'']" v-for="(item,index) in resultList.zhuangxiu" :key="index" @click="chooseZ(item.lxid,item.lxming)">{{item.lxming}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 条件 -->
      <div class="conditionBox" v-if="conditionList.length || sousuo">
          <span class="condition_l">已选</span>
          <div class="condition_r">
            <template v-if="sousuo">
              <span @click="delTag(-1)">{{sousuo}}<img src="../../static/Toast_closed.png" alt=""></span>
            </template>
             <template v-else>
              <span v-for="(item,index) in conditionList" :key="index" @click="delTag(index,item.type)">{{item.name}} <img src="../../static/Toast_closed.png" alt=""></span>
            </template>
            <div  @click="delTag(-2)"><img src="../../static/del.png" alt="" style="margin-right:4px">清空</div>
          </div>
      </div>
      <!-- 主体部分 -->
      <div class="banner" v-if="isKong==0"  v-loading="loading" element-loading-text="拼命加载中…"  element-loading-spinner="el-icon-loading">
        <!-- 左侧部分 -->
        <div class="banner_l">
          <div class="banner_box" v-for="(item, index) in lpList" :key="index">
            <div class="banner_bl_img">
              <img :src="item.lptp || '../../static/zhutu.png'" @error="errImg(item)" :alt="item.lpming"  :title="item.lpming" class="banner_img" @click="detail(item.id)">
            </div>
            <div class="banner_br">
              <div class="banner_det">
                <h2 @click="detail(item.id)">{{item.lpming}}</h2>
                <div class="flex_sb" style="margin-top:10px">
                  <div class="banner_det_adress">
                    <div>{{item.dizhi}} {{item.xiaoqudz?'/ '+item.xiaoqudz:''}}</div>
                    <div>{{item.ditie}} / {{Math.floor(item.mianji_min)}}-{{Math.floor(item.mianji_max)}}  ㎡</div>
                    <div style="color:#1989FA;font-size:12px;">{{item.yyxx}}</div>
                  </div>
                  <div style="text-align:center;cursor: pointer;" @click="detail(item.id)">
                    <div style="color:#FF4400;font-weight:550;"><i style="font-size:.333333rem;">{{item.lpzj}}</i> {{item.unit}}</div>
                    <!-- <span style="color:#909399;font-size:12px;">{{item.mianjilb.length}}套房源在租</span> -->
                  </div>
                </div>
                <div class="space">
                  <span v-for="(itemm,index) in item.mianjilb" :key="index" v-if="index<5" @click="fy_detail(itemm.id)">{{Math.floor(itemm.mianji)}} ㎡</span>
                  <span v-if="item.mianjilb.length>5" @click="detail(item.id)">更多></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <!-- <el-pagination
            layout="prev, pager, next"
            :total=count
            :page-size=10
            next-text='下一页'
            prev-text="上一页"
            :current-page="page"
            @current-change="currentChange"
            @prev-click="currentChange"
            @next-click="currentChange"
            hide-on-single-page
            class="page"
            >
          </el-pagination> -->
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
          <div class="banner_r_box" ref="rightBox" :class="hiddenRight?'fixed_right':''">
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
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import Search from '../components/search'
import {loupanApi,yyzfApi,sxtjApi,shangquanApi,ditieApi} from '@/request/api'
export default {
  metaInfo: {
    meta: [
      {
        name: 'keywords',
        content: '七七找房,写字楼出租,办公室出租,写字楼出租价格,办公室租赁，写字楼租赁信息网'
      }
    ]
  },
  name: 'write',
  components: {
    Header,
    Footer,
    Search
  },
  data () {
    return {
      timer:'',
      fixTop:0,
      hiddenRight:false,
      fixTop:'',
      suremj:false,
      suredj:false,
      inp1: '', // 面积
      inp2: '', // 面积
      inp3: '', // 单价
      inp4: '', // 单价
      resultList:{
        pianqu:[],
        mianjisx:[],
        ditielx:[],
        zhuangxiu:[],
        zujiasx:[]
      },
      lpList: [], // 楼盘列表
      shangquan: [], // 商圈列表
      ditieKouList:[],
      city: {}, // 市名称
      qindex: 0, // 选中片区
      sindex: '', // 选中商圈
      dtindex:0,
      dtkindex:0,
      mindex: 0, // 面积
      dindex: 0, // 租价
      zindex: 0, // 装修
      count: null, // 总条数
      sousuo:'',
      page:1,
      phone: '',
      conditionList:[],
      loading:false,
      isKong:0
    }
  },
  watch:{
    sousuo(newName, oldName) {
      this.$refs.search.getValue(newName); 
    }
  },
  methods: {
    // 返回首页
    goIndex(type){
      if(type){
        var {href} = this.$router.resolve({path: "/index"});
        window.open(href, '_blank');
        return
      }
      this.$router.push({ name: 'index'})
    },
    // 前往楼盘详情页面
    detail (id) {
      let {href} = this.$router.resolve({path: "/lpdetail",query: {id}});
      window.open(href, '_blank');
    },
    // 前往房源详情页面
    fy_detail (id) {
      let {href} = this.$router.resolve({
          path: "/detail",
          query: {id}
      });
      window.open(href, '_blank');
    },
    errImg(item){
      this.$set(item,'lptp','../../static/fail.png')
    },
    // 楼盘列表
    getList () {
      var params={
        pq_id: this.qindex,
        ditielx:this.dtindex,
        ditiekou:this.dtkindex,
        mjsx_id: this.mindex,
        zjsx_id: this.dindex,
        zx_id: this.zindex,
        sq_id:this.sindex,
        shi_id: this.city.id,
        sort: '8',
        num: '10',
        sousuo:'',
        now_page: this.page
      }
      if(this.suremj){
        params.mj_min=this.inp1
        params.mj_max=this.inp2
      }
      if(this.suredj){
        params.zj_min=this.inp3
        params.zj_max=this.inp4
      }
      if(this.sousuo){
        var params={
          shi_id: this.city.id,
          sousuo:this.sousuo,
          sort: '8',
          num: '10',
          now_page: this.page
        }
      }
      this.loading=true
      this.isKong=0
      loupanApi(params).then(res => {
        this.lpList = res.data.result
        this.count = parseInt(res.data.count)
        this.loading=false
        if(this.lpList.length<1){
          this.isKong=1
        }
      }).catch((status)=>{
        this.isKong=2
        this.loading=false
      })
    },
    // 筛选区域列表
    getarea () {
      var id=this.city.id
      sxtjApi({ shi_id: id }).then(res => {
        var { result } = res.data
        result.pianqu.unshift({
          id: '',
          pianqum: '不限'
        })
        result.zhuangxiu.unshift({
          lxid: '',
          lxming: '不限'
        })
        result.ditielx.unshift({
          lxid: '',
          lxming: '不限'
        })
        this.resultList=result
      })
    },
    getShangquan () {
      if (!this.qindex) {
        this.shangquan = []
        this.sindex = 0
        return
      }
      shangquanApi({ shi_id: this.city.id, pq_id: this.qindex }).then(res => {
        var { result } = res.data
        result.unshift({
          id: '',
          xuexiaom: '不限'
        })
        this.shangquan = result
      })
    },
    getDitieKou () {
      if (!this.dtindex) {
        this.ditieKouList = []
        this.dtkindex = 0
        return
      }
      ditieApi({ ditielx: this.dtindex }).then(res => {
        var { result } = res.data
        result.unshift({
          id: '',
          name: '不限'
        })
        this.ditieKouList = result
      })
    },
    // 选择区域
    chooseQ (id,name) {
      if(this.qindex==id){
        return
      }
      this.qindex = id
      this.sindex = ''
      this.page=1
      this.sousuo=''
      this.getList()
      this.getShangquan()
      this.addCondition(name,0)
      this.addCondition('不限',1)
    },
    // 选择商圈
    chooseSQ (id,name) {
      if(this.sindex==id){
        return
      }
      this.sindex = id
      this.page=1
      this.sousuo=''
      this.getList()
      this.addCondition(name,1)
    },
    chooseDt(id,name){
      if(this.dtindex==id){
        return
      }
      this.dtindex = id
      this.dtkindex = ''
      this.page=1
      this.sousuo=''
      this.getList()
      this.getDitieKou()
      this.addCondition(name,5)
      this.addCondition('不限',6)
    },
    chooseDtk(id,name){
      if(this.dtkindex==id){
        return
      }
      this.dtkindex = id
      this.page=1
      this.sousuo=''
      this.getList()
      this.addCondition(name,6)
    },
    // 选择面积
    chooseM (id,name) {
      if(this.mindex==id){
        return
      }
      this.mindex = id
      this.inp1 = this.inp2 = ''
      this.suremj=false
      this.page=1
      this.sousuo=''
      this.getList()
      this.addCondition(name,2)
    },
    // 选择单价
    chooseD (id,name) {
      if(this.dindex==id){
        return
      }
      this.dindex = id
      this.inp3 = this.inp4 = ''
      this.suredj=false
      this.page=1
      this.sousuo=''
      this.getList()
      this.addCondition(name,3)
    },
    // 选择装饰
    chooseZ (id,name) {
       if(this.zindex==id){
        return
      }
      this.zindex = id
      this.page=1
      this.sousuo=''
      this.getList()
      this.addCondition(name,4)
    },
    // 当前页now_page
    currentChange (num) {
      window.scrollTo(0, 0)
      this.page = num
      this.getList()
    },
    // 输入面积
    submit1 () {
      var {inp1,inp2}=this
      if(!inp2){
        this.$message.error('请输入最大面积')
        return
      }
      this.mindex = ''
      this.page=1
      this.sousuo=''
      this.suremj=true
      this.getList()
      inp1=inp1 || 0
      var name=inp1+'~'+inp2+'m²'
      this.addCondition(name,2)
    },
    // 输入单价
    submit2 () {
      var {inp3,inp4}=this
      if(!inp4){
        this.$message.error('请输入最大单价')
        return
      }
      this.dindex = ''
      this.page=1
      this.sousuo=''
      this.suredj=true
      this.getList()
      inp3=inp3 || 0
      var name=inp3+'~'+inp4+'元/m²/天'
      this.addCondition(name,3)
    },
    // 搜索
    check (data) {
      this.page = 1
      this.sousuo = data
      this.getList()
    },
    // 预约看房
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
        var data = res.data
        if (res) {
          this.$message.success(data.msg)
        }else{
          this.phone=''
        }
      })
    },
    // 地图找房
    map () {
      let {href} = this.$router.resolve({path: "/ditu"});
      window.open(href, '_blank');
    },
    // 点击后的条件标签
    addCondition(name,type){
      var obj={
        name,
        type
      }
      var {conditionList} =this
      conditionList.filter(function (item,index) {
        if(item.type==type){
          conditionList.splice(index,1)
        }
      });
      if(name=='不限'){
        return
      }
      this.conditionList.push(obj)
    },
    // 传参过来的标签,加个定时器防止数据没有获取到
    addTag(){
      setTimeout(()=>{
        var {shangquan,ditieKouList,qindex,sindex,mindex,dtindex,dtkindex}=this
        var {mianjisx,pianqu,ditielx}=this.resultList
        if(qindex){
          var pqItem=pianqu.filter(function (item,index) {
            return item.id==qindex
          });
          this.addCondition(pqItem[0]['pianqum'],0)
        }
        if(sindex){
          var sqItem=shangquan.filter(function (item,index) {
            return item.id==sindex
          });
          this.addCondition(sqItem[0]['xuexiaom'],1)
        }
        if(dtindex){
          var pqItem=ditielx.filter(function (item,index) {
            return item.lxid==dtindex
          });
          this.addCondition(pqItem[0]['lxming'],5)
        }
        if(dtkindex){
          var sqItem=ditieKouList.filter(function (item,index) {
            return item.id==dtkindex
          });
          this.addCondition(sqItem[0]['name'],6)
        }
        if(mindex){
          var mjItem=mianjisx.filter(function (item,index) {
            return item.lxid==mindex
          });
          this.addCondition(mjItem[0]['lxming'],2)
        }
      },500)
    },
    // 删除标签
    delTag(index,type){
      if(index=='-1'){
        this.sousuo=''
        this.page=1
        this.getList()
        return
      }
      if(index=='-2'){
        location.reload()
        return
      }
      switch (type){
        case 0:
          this.qindex=''
          this.sindex=''
          this.shangquan=[]
          this.addCondition('不限',1)
          break;
        case 1:
          this.sindex=''
          break;
        case 2:
          this.mindex=''
          break;
        case 3:
          this.dindex=''
          break;
        case 4:
          this.zindex=''
          break;
        case 5:
          this.dtindex=''
          this.dtkindex=''
          this.ditieKouList=[]
          this.addCondition('不限',6)
          break;
        default:
          this.dtkindex=''
      }
      this.conditionList.splice(index,1)
      this.page=1
      this.getList()
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
  //  判断是否有jquery参数，如果有则转为params参数（防止刷新不重置问题）
  beforeRouteEnter (to, from, next) {
    var data=to.query
    var arr = Object.keys(data)
    if (arr.length) {
      next({name: 'write', params: data})
    }else{
      next()
    }
  },
  activated(){
    var that=this
    // setTimeout(()=>{
    var {params}=this.$route
    var arr = Object.keys(params)
    if(arr.length){
      Object.assign(this.$data, this.$options.data())
      this.city= JSON.parse(localStorage.getItem('default_shi'))
      this.fixTop=this.$refs.rightBox.offsetTop
      this.qindex=params.qid || ''
      this.mindex=params.mid || 0
      this.sindex=params.sq_id || ''
      this.dtindex=params.dt_id || ''
      this.dtkindex=params.dtk_id || ''
      this.sousuo=params.search || ''
      if(this.qindex){
        this.getShangquan()
      }
      if(this.dtindex){
        this.getDitieKou()
      }
      this.getarea()
      this.getList()
      this.addTag()
    }
    // },500)
    this.timer = new Date().getTime()
    this.fixTop=this.$refs.rightBox.offsetTop
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated(){
    window.removeEventListener('scroll',this.handleScroll)
  },
  created () {},
  mounted () {
    var {params}=this.$route
    var arr = Object.keys(params)
    if(arr.length){
      return
    }
    this.city= JSON.parse(localStorage.getItem('default_shi'))
    this.getList()
    this.getarea()
  }
}
</script>
<style lang="less" scoped>
@import  '../assets/css/common.css';
@import  '../assets/css/list.css';
</style>
