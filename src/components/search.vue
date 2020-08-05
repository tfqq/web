<template>
  <div id="search">
    <div class="search_box main">
      <div class="search_con">
        <img src="../../static/logo.png" alt="七七找房" style="cursor: pointer;" @click="goIndex">
        <div class="def_city" @click.stop="isShow=true">
          {{moren.xzqming}}
          <i class="el-icon-caret-bottom"></i>
          <!-- 城市选择框 -->
          <div class="hot_city" v-if="isShow">
            <div class="triangle"></div>
            <div class="detCity">
              <span
                v-for="(item,index) in area"
                :key="index"
                :class="[moren.id==item.id?'active':'']"
                @click="chooseCity(item)"
              >{{item.xzqming}}</span>
            </div>
            <span>其他城市即将开放，敬请期待</span>
          </div>
        </div>
        <template v-if="title=='house'">
          <span class="title" @click="goOther(0)" :class="[title=='house'?'active':'']">新房</span>
        </template>
        <template v-else>
          <span class="title" @click="goOther(1)" :class="[title=='xiezi'?'active':'']">写字楼</span>
          <!-- <span class="title" @click="goOther(2)" :class="[title=='good'?'active':'']">优选好房</span> -->
          <span class="title" @click="goOther(3)" :class="[title=='ditu'?'active':'']">地图找房</span>
        </template>
      </div>
      <!-- 搜索 -->
      <div class="search_area" @click.stop>
        <input type="text" placeholder="输入您要查找的楼盘或区域商圈名称" v-model="sousuo" @keyup.enter="submit" @focus="getFocus" @input="isHistory=false;isFocus=true">
        <img src="../../static/search.png" alt="" @click="submit">
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
        <!-- <template v-if="isFocus">
            <div class="search_area_box" v-if="isHistory "></div>
        </template> -->
      </div>
    </div>
  </div>
</template>

<script scoped>
import {sxtjApi,searchApi} from '@/request/api'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    searchValue: {
      type: String
    }
  },
  data () {
    return {
      moren:{},
      area:[],
      sousuo: '' ,// 搜索
      isShow: false,
      HistoryList:[],
      isFocus:false,
      isHistory:true,
      searchList:[],
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
    // }
  },
  methods: {
    goIndex(){
      var {href} = this.$router.resolve({path: "/index"});
      window.open(href, '_blank');
    },
    goOther(type){
      switch(type){
        case 0:
          var {href} = this.$router.resolve({path: "/house"});
          window.open(href, '_blank');
          break;
        case 1:
          this.$router.push({ path: '/write' })
          break;
        case 2:
          this.$router.push({ path: '/good' })
          break;
        default:
          var {href} = this.$router.resolve({path: "/ditu"});
          window.open(href, '_blank');
      }
    },
    // 选择市
    chooseCity (item) {
      this.isShow = false
      if(item.id==this.moren.id){
        return false
      }
      localStorage.setItem('default_shi', JSON.stringify(item))
      location.reload()
    },
    getValue(value){
      this.sousuo=value
    },
    getCity(){
        var id=this.moren.id
        sxtjApi({ shi_id: id }).then(res => {
          var { result } = res.data
          // result.shi.push({id:25,xzqming:'测试'})
          this.area = result.shi
      })
    },
    del(index){
      this.HistoryList.splice(index, 1)
      localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList))
    },
    submit () {
      this.$emit('chuan',this.sousuo)
      if(this.sousuo){
        this.SearchVal(this.sousuo)
        this.isFocus=false
        this.isHistory=true
      }
    },
    getFocus(){
      if(!this.sousuo){
        this.isFocus=true
      }
    },
    choose_name(name){
      this.SearchVal(name)
      this.sousuo=name
      this.isFocus=false
      this.isHistory=true
      this.$emit('chuan',name)
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
    }
  },
  mounted(){
    var defCity = localStorage.getItem('default_shi')
    this.moren=JSON.parse(defCity)
    this.HistoryList=JSON.parse(localStorage.getItem('HistoryList')) || []
    this.getCity()
    document.addEventListener('click',(e)=>{
      this.isShow=false
      this.isFocus=false
      this.isHistory=true
    })
  },
  created () {
   
  }
}
</script>

<style lang="less" scoped>
@import  '../assets/css/common.css';
#search {
  background-color: #F6F6F6;
  .search_box {
    position: relative;
    display: flex;
    justify-content: space-between;
    height:82px;
    align-items:center;
    .search_con {
      display: flex;
      align-items: center;
      .def_city{
        position: relative;
        cursor: pointer;
        height:28px;
        line-height:28px;
        padding: 0 12px;
        border:1px solid rgba(227,230,239,1);
        border-radius:14px;
        font-size:14px;
        color: #606266;
        text-align: center;
        margin:0 30px 0 16px;
      }
    }
    .title {
      display: inline-block;
      color: #191919;
      cursor: pointer;
      font-size:.133333rem;
      font-weight:550;
      margin-right: .333333rem;
    }
    .title:nth-last-of-type(1){
      margin-right: 0;
    }
    .title:hover{
      color: #1989FA !important;
    }
    .active {
      color: #1989FA !important;
    }
    // 搜索框
    .search_area {
      position: relative;
      display: flex;
      align-items: center;
      height:48px;
      width:520px;
      padding: 0 25px;
      box-shadow:0px 2px 8px 0px rgba(227,230,239,1);
      border-radius:24px;
      background-color: #fff;
      box-sizing: border-box;
      input {
        line-height:48px;
        margin-right:10px;
        flex: 1;
        font-size: 14px;
      }
      &>img{
        cursor: pointer;
      }
      .search_area_box{
        position: absolute;
        width:470px;
        max-height:300px;
        left:50%;
        transform: translateX(-50%);
        top:48px;
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
  }
}
</style>
