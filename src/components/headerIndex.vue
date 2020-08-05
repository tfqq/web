<template>
  <div>
    <!-- 导航栏 -->
    <header id="header">
      <div class="main title_hd">
        <!-- 顶部左侧 -->
        <div class="hd_l">
          <img src="../../static/logo.png" alt="">
          <div class="def_city" @click.stop="isShow=true">
            {{moren.xzqming}}
            <i class="el-icon-caret-bottom"></i>
            <!-- 城市选择框 -->
            <div class="hot_city" v-if="isShow">
              <div class="triangle"></div>
              <div class="detCity">
                <span v-for="(item,index) in area" :key="index" :class="[moren.id==item.id?'active':'']" @click="chooseCity(item)">{{item.xzqming}}</span>
              </div>
              <span>其他城市即将开放，敬请期待</span>
            </div>
          </div>
          <span :class="[bg=='office'?'active':'']" @click="goOther(0)">租写字楼</span>
          <span :class="[bg=='house'?'active':'']" class="sail" @click="goOther(1)">买写字楼 <img src="../../static/hot.png" alt=""></span>
          <span :class="[bg=='entrust'?'active':'']" @click="goOther(2)">委托找房</span>
          <span :class="[bg=='free'?'active':'']" @click="goOther(3)">投放房源</span>
          <el-popover
              width="200"
              trigger="hover"
              >
              <div class="pop">
                <img src="../../static/xcx.jpg" alt="七七找房小程序" class="xcxImg">
                <div>扫码进入小程序</div>
              </div>
              <span slot="reference" style="margin:0">手机端</span>
          </el-popover>
        </div>
        <!-- 顶部右侧 -->
        <div class="hd_r">
          <template v-if="!isLogin">
            <span @click="openDialog(1)">
              登录
            </span>
            <i style="margin:0 8px;font-weight:400;">|</i>  
            <span @click="openDialog(4)">注册</span>
          </template>
          <span v-else>
            {{mp}}
            <i @click="tui">[退出登录]</i>
          </span>
          <div>
            <img src="../../static/phone.png" alt="">
            {{$bus.kfPhone}}‬ 
          </div>
        </div>
      </div>
    </header>
        <el-dialog :visible.sync="showDia"  width="3.333333rem" :show-close='false' @close="close">
      <!-- 验证码登录 -->
      <template v-if="showType==1">
        <div class="box">
          <div class="box_hd flex_sb">
            <div>
              <p>手机快捷登录</p>
              <span @click="openDialog(4)">没有账号？ <i>去注册</i></span>
            </div>
            <img src="../../static/Toast_closed.png" alt="" @click="close">
          </div>
          <div class="inpBox">
            <div class="inpBox_con">
              <input type="number" placeholder="请输入手机号" v-model="phone" @keyup.enter="yzmLogin">
            </div>
            <div class="inpBox_con">
              <input type="number" placeholder="请输入短信验证码" v-model="code" @keyup.enter="yzmLogin">
              <template v-if="count==60" >
                <span @click="getCode" v-if="isFirst">获取验证码</span>
                <span @click="getCode" v-else>重新获取验证码</span>
              </template>
              <div v-else>{{count}} 后重新发送</div>
            </div>
          </div> 
          <div class="sign" @click="yzmLogin">登录</div>
          <div class="box_ft flex_sb">
            <i @click="openDialog(2)">账号密码登录</i>
            <!-- <div class="free_login" @click="isFree=!isFree"><span :class="isFree?'active':''"></span> 7天内免登录</div> -->
          </div>
        </div>
      </template>
       <!-- 密码登录 -->
      <template v-if="showType==2">
        <div class="box">
          <div class="box_hd flex_sb">
            <div>
              <p>账号密码登录</p>
              <span @click="openDialog(4)">没有账号？ <i>去注册</i></span>
            </div>
            <img src="../../static/Toast_closed.png" alt="" @click="close">
          </div>
          <div class="inpBox">
            <div class="inpBox_con">
              <input type="number" placeholder="请输入手机号" v-model="phone" @keyup.enter="mmLogin">
            </div>
            <div class="inpBox_con">
              <input :type="isPassword?'password':'text'" placeholder="请输入密码" v-model="password" @keyup.enter="mmLogin">
              <img src="../../static/no_eye.png" alt="" v-if="isPassword" @click="openEye">
              <img src="../../static/eye.png" alt="" v-else @click="openEye">
            </div>
          </div>
          <div class="sign" @click="mmLogin">登录</div>
          <div class="box_ft flex_sb">
            <i @click="openDialog(1)">手机快捷登录</i>
            <div @click="openDialog(3)">忘记密码</div>
            <!-- <div class="free_login" @click="isFree=!isFree"><span :class="isFree?'active':''"></span> 7天内免登录</div> -->
          </div>
        </div>
      </template>
      <!-- 忘记密码 -->
      <template v-if="showType==3">
        <div class="box" v-if="isModify">
          <div class="box_hd flex_sb">
            <div>
              <p>忘记密码</p>
              <span @click="openDialog(1)">已有账号？ <i>去登录</i></span>
            </div>
            <img src="../../static/Toast_closed.png" alt="" @click="close">
          </div>
          <div class="inpBox">
            <div class="inpBox_con">
              <input type="number" placeholder="请输入手机号" v-model="phone" @keyup.enter="setPass">
            </div>
            <div class="inpBox_con">
              <input type="number" placeholder="请输入短信验证码" v-model="code" @keyup.enter="setPass">
              <template v-if="count==60" >
                <span @click="getCode" v-if="isFirst">获取验证码</span>
                <span @click="getCode" v-else>重新获取验证码</span>
              </template>
              <div v-else>{{count}} 后重新发送</div>
            </div>
            <div class="inpBox_con">
              <input :type="isPassword?'password':'text'" placeholder="请输入密码（最少8位，数字+字母）" v-model="password" @keyup.enter="setPass">
              <img src="../../static/no_eye.png" alt="" v-if="isPassword" @click="openEye">
              <img src="../../static/eye.png" alt="" v-else @click="openEye">
            </div>
          </div>
          <div class="sign" @click="setPass">修改密码</div>
        </div>
        <div class="box forgetBox" v-else>
          <div class="box_hd flex_sb">
            <div></div>
            <img src="../../static/Toast_closed.png" alt="" @click="close">
          </div>
          <div class="success">修改密码成功</div>
          <div class='welcome'>欢迎回来，<i @click="openDialog(1)">点击这里去登录</i></div>
        </div>
      </template>
      <!-- 注册 -->
      <template v-if="showType==4">
        <div class="box">
          <div class="box_hd flex_sb">
            <div>
              <p>手机号码注册</p>
              <span @click="openDialog(1)">已有账号？ <i>去登录</i></span>
            </div>
            <img src="../../static/Toast_closed.png" alt="" @click="close">
          </div>
          <div class="inpBox">
            <div class="inpBox_con">
              <input type="number" placeholder="请输入手机号" v-model="phone" @keyup.enter="register">
            </div>
            <div class="inpBox_con">
              <input type="number" placeholder="请输入短信验证码" v-model="code" @keyup.enter="register">
              <template v-if="count==60" >
                <span @click="getCode" v-if="isFirst">获取验证码</span>
                <span @click="getCode" v-else>重新获取验证码</span>
              </template>
              <div v-else>{{count}} 后重新发送</div>
            </div>
            <div class="inpBox_con">
              <input :type="isPassword?'password':'text'" placeholder="请输入密码（最少8位，数字+字母）" v-model="password" @keyup.enter="register">
              <img src="../../static/no_eye.png" alt="" v-if="isPassword" @click="openEye">
              <img src="../../static/eye.png" alt="" v-else @click="openEye">
            </div>
          </div>
          <div class="sign" @click="register">登录</div>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script>
import {smsLoginApi,miLoginApi,setPwdApi ,checkApi,regApi,sendCodeApi,sxtjApi} from '@/request/api'
export default {
  props: {
    bg: {
      type: String
    },
    area: {
      type: Array,
      default: []
    },
  },
  data () {
    return {
      moren:{},
      isShow:false,
      showDia:false,
      showType:0,
      count: 60,
      isFirst:true,
      isLogin: false,
      isPassword:false,//是否显示密码
      mp: '',
      phone: '',
      code: '',
      password: '',
      isModify:true // 忘记密码
    }
  },
  watch:{
    
  },
  methods: {
    goOther(type){
      switch(type){
        case 0 :
          var {href} = this.$router.resolve({path: "/write"});
          window.open(href, '_blank');
          break;
        case 1 :
          var {href} = this.$router.resolve({path: "/house"});
          window.open(href, '_blank');
          break;
        case 2:
          var {href} = this.$router.resolve({path: "/entrust"});
          window.open(href, '_blank');
          break;
        default:
          var {href} = this.$router.resolve({path: "/free"});
          window.open(href, '_blank');
      }
    },
    successLogin(res){
      var mp = res.data.result.mobile
      var first = mp.substring(0, 4)
      var last = mp.substring(7)
      var fina = first + '****' + last
      var token = res.data.token
      localStorage.setItem('phone', fina)
      localStorage.setItem('token', token)
      this.$emit('dialog')
      this.showDia=false
    },
    // 验证码登陆
    yzmLogin () {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      if (!this.code) {
        this.$message.error('请输入验证码')
        return false
      }
      smsLoginApi({
        username: this.phone,
        code: this.code,
        client: 'pc'
      }).then(res => {
        this.$message.success(res.data.msg)
        this.successLogin(res)
      }).catch(status=>{
        if(status==-4){
          this.openDialog(4)
        }
      })
    },
    // 密码登陆
    mmLogin () {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return false
      }
      var data = {
        username: this.phone,
        password: this.password,
        client: 'pc'
      }
      miLoginApi(data).then(res => {
        this.$message.success(res.data.msg)
        this.successLogin(res)
      }).catch(status=>{
        if(status==-4){
          this.openDialog(4)
        }
      })
    },
    //设置密码
    setPass () {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      if (!this.code) {
        this.$message.error('请输入验证码')
        return false
      }
      if (!reg.test(this.password)) {
        this.$message.error('密码（最少8位最多16位，数字+字母）')
        return false
      }
      var data = {
        username: this.phone,
        code:this.code,
        password: this.password,
      }
      setPwdApi(data).then(res => {
        this.$message.success(res.data.msg)
        this.isModify=false
      }).catch(status=>{
        if(status==-1){
          this.openDialog(4)
        }
      })
    },
    // 注册
    register () {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      if (!this.code) {
        this.$message.error('请输入验证码')
        return false
      }
      if (!reg.test(this.password)) {
        this.$message.error('密码（最少8位最多16位，数字+字母）')
        return false
      }
      var data = {
        username: this.phone,
        code:this.code,
        password: this.password,
      }
      regApi(data).then(res => {
        this.$message.success(res.data.msg)
        this.openDialog(1)
      }).catch(status=>{
        if(status==-5){
          this.openDialog(1)
        }
      })
    },
    //发送验证码
    getCode () {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      var params={
        type: 'mobile',
        send: this.phone
      } 
      sendCodeApi(params).then(
        res => {
          this.$message.success(res.data.msg)
          this.timer = setInterval(() => {
            if (this.count > 1) {
              this.count--
            } else {
              this.count = 60
              this.isFirst=false
              clearInterval(this.timer)
            }
          }, 1000)
        }
      )
    },
    // 退出登录
    tui () {
      this.$message.success('您已退出登录')
      window.localStorage.removeItem('token')
      this.isLogin = false
      this.$emit('dialog')
    },
    clear(){
      this.mp = localStorage.getItem('phone')
      var token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    openDialog(index){
      this.close()
      this.showType=index
      this.showDia=true
    },
    // 关闭弹框
    close () {
      clearInterval(this.timer)
      Object.assign(this.$data, this.$options.data())
      this.getBaseInfo()
    },
    openEye(){
      this.isPassword=!this.isPassword
    },
    getBaseInfo(){
      this.mp = localStorage.getItem('phone')
      var token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
      this.moren=JSON.parse(localStorage.getItem('default_shi'))
    },
    // 选择市
    chooseCity (item) {
      this.isShow = false
      if(item.id==this.moren.id){
        return false
      }
      localStorage.setItem('default_shi', JSON.stringify(item))
      location.reload()
    }
  },
  created () {
  },
  mounted () {
    this.getBaseInfo()
    document.addEventListener('click',(e)=>{
        this.isShow=false
    })
  }
}
</script>

<style lang="less" scoped>
@import  '../assets/css/common.css';
@import  '../assets/css/header.css';

.active {
  color: #1989FA !important;
}
#header {
  background-color:#fff;
  height:80px;
  font-size:16px;
  color: #191919;
  font-weight:900;
  box-shadow:0px 2px 8px 0px rgba(228,231,237,1);
  .title_hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:100%;
  }
  .hd_l {
    display: flex;
    align-items: center;
    &>span {
      margin-left:.333333rem;
      cursor: pointer;
    }
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
      margin-left: 16px;
    }
    &>span:hover{
      color: #1989FA
    }
  }
  .hd_r {
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      i {
        cursor: pointer;
        display: inline-block;
        color: #cc2929;
        margin-left: 0.1rem;
        cursor: pointer;
      }
    }
    div{
      height:40px;
      line-height:40px;
      background:linear-gradient(90deg,rgba(0,174,255,1) 0%,rgba(25,137,250,1) 100%);
      border-radius:24px;
      font-size:18px;
      font-weight:550;
      padding: 0 20px;
      color: #fff;
      margin-left: .166667rem;
      img{
        width: 24px;
        height: 24px;
      }
    }
    span:hover{
      color: #1989FA
    }
  }
}
.sail{
  position: relative;
  img{
    position: absolute;
    top:-12px;
    right:-16px;
  }
}
/deep/ .el-dialog{
  margin: 0!important;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 8px;
}
/deep/ .el-dialog__header{
  display: none
}
</style>
