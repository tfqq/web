<template>
  <div>
    <Header bg="free"></Header>
    <!-- <search/> -->
    <div class="banner">
      <div class="entrust_con">
        <div class="entrust_box">
          <div style="font-size:.2rem;text-align:center;color:#212121">免费投放房源</div>
          <!-- <div style="margin:.25rem 0;">一键提交需求，七七找房帮您寻找最合适的办公室</div> -->
          <div class="require">
            <div class="re_d">
              <img src="../../static/xq.png" alt="">
              <div>提交需求</div>
            </div>
            <img src="../../static/jt.png" alt="" class="jt">
            <div class="re_d">
              <img src="../../static/room.png" alt="">
              <div>采集房源信息</div>
            </div>
            <img src="../../static/jt.png" alt="" class="jt">
            <div class="re_d">
              <img src="../../static/bg.png" alt="">
              <div>官网曝光房源</div>
            </div>
            <img src="../../static/jt.png" alt="" class="jt">
            <div class="re_d">
              <img src="../../static/fy.png" alt="">
              <div>成交房源</div>
            </div>
          </div>
          <!-- <div class="identify">
            <div class="info">
              <div class="check">
                <div></div>
              </div>
              <span>我是业主</span>
            </div>
            <div class="info" style="margin-left:.216667rem">
              <div class="check">
                <div></div>
              </div>
              <span>我是转租</span>
            </div>
          </div>-->

          <input class="code" type="text " placeholder="楼盘名称" v-model="loupan">
          <div class="adress">
            <input type="text" placeholder="区域" v-model="quyu">
            <!-- <input type="text" class="det_address" placeholder="详细地址"> -->
          </div>
          <!-- 出租面积 -->
          <div class="lease">
            <input class="code" type="number" placeholder="出租面积" v-model="mianji">
            <span>㎡</span>
          </div>
          <!-- 租金 -->
          <!-- <div class="zujin">
            <input class="code" type="number" placeholder="租金">
            <span>元/㎡/天</span>
          </div>-->
          <!-- <div style="margin:.25rem 0 .083333rem;color:#212121">佣金</div>
          <div style="margin-bottom:.083333rem;font-size:.1rem;color:#666">悬赏一定比例佣金会更快徐进成交，成交后支付</div>
          <div class="time">
            <div>无</div>
            <div>0.5个月</div>
            <div>0.5个月</div>
            <div>0.5个月</div>
            <div>0.5个月</div>
          </div>-->
          <div style="margin:.25rem 0 .083333rem;color:#212121">联系人信息</div>
          <input class="code" type="number" placeholder="手机号" v-model="phone">
          <input class="code" type="text" placeholder="姓名" v-model="name" @keyup.enter="wt">
          <!-- <div class="yan">
            <input class="code" type="number" placeholder="验证码">
            <span>获取短信验证码</span>
          </div>-->
          <div class="quickly" @click="wt">立即委托</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header'
import Footer from '../components/footer'
import {wyczApi,sxtjApi} from '@/request/api'
export default {
   metaInfo: {
      meta: [
        {
          name: 'keywords',
          content: '七七找房投放房源,写字楼房源投放,办公室房源投放'
        }
      ]
  },
  name: 'free',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      phone: '',
      name: '',
      loupan: '',
      quyu: '',
      qu_id: '',
      mianji: ''
    }
  },

  methods: {
    wt() {
      var params = JSON.parse(localStorage.getItem('default_shi'))
      var id = params.id || ''
      var that = this
      sxtjApi({ shi_id: id }).then(res => {
        var { result } = res.data
        var pianqu = result.pianqu
        var area = pianqu.find(function(obj) {
          return obj.pianqum == that.quyu || obj.pianqum == that.quyu + '区'
        })
        var paramss={
          phone:this.phone,
          name: this.name,
          remarks: '',
          loupan: this.loupan,
          qu_id: '',
          mianji:this.mianji
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
        wyczApi(paramss).then(res => {
          if (res) {
            this.$message.success(res.data.msg)
            this.$router.push({
              name: 'index'
            })
          }
        })
      })
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.banner {
  padding-bottom: 3.083333rem;
  background-image: url('../../static/banner.png');
  background-repeat: no-repeat;
  background-size: 100% 3.55rem;
  padding-top: 0.666667rem;
}
.entrust_con {
  margin: 0 auto;
  font-size: 0.116667rem;
  width: 3.916667rem;
  color: #666;
  background-color: #fff;
  padding: 0.375rem 0.291667rem 0.25rem;
  margin-bottom: 0.416667rem;
  border-radius: 0.083333rem;
  box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.1);
}
.require {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  align-items: center;
  margin-top:40px;
  .re_d {
    text-align: center;
    img {
      width: 0.25rem;
      height: 0.25rem;
    }
    div {
      margin-top: 0.083333rem;
    }
  }
  .jt {
    width: 0.125rem;
    height: 0.125rem;
    margin-top: -0.166667rem;
  }
}
.identify {
  margin-bottom: 0.166667rem;
  .info {
    display: inline-block;
    .check {
      position: relative;
      display: inline-block;
      width: 0.15rem;
      height: 0.15rem;
      border-radius: 50%;
      background-color: #f5f5f5;
      border: 0.008333rem solid #eeeeee;
      vertical-align: middle;
      margin-right: 0.05rem;
      div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0.066667rem;
        height: 0.066667rem;
        border-radius: 50%;
        background-color: #4b6dff;
      }
    }
  }
}
.time {
  display: flex;
  justify-content: space-between;
  font-size: 0.116667rem;
  div {
    width: 17%;
    padding: 0.091667rem 0 0.108333rem;
    text-align: center;
    border-radius: 0.041667rem;
    border: 0.008333rem solid #eee;
  }
}
.code {
  margin-top: 0.083333rem;
  padding: 0.125rem 0.166667rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.116667rem;
  border: none;
  border-radius: 0.041667rem;
  background-color: #f5f5f5;
  color: #999;
  input{
    width: 100%
  }
}
.adress {
  padding: 0.125rem 0.166667rem;
  margin-top: 0.083333rem;
  border-radius: 0.041667rem;
  background-color: #f5f5f5;
  input {
    width: 33%;
    border: none;
    background-color: #f5f5f5;
  }
  .det_address {
    width: 67%;
    box-sizing: border-box;
    padding-left: 0.108333rem;
    border-left: 1px solid #dddddd;
  }
}
.lease {
  position: relative;
  span {
    position: absolute;
    top: 0.166667rem;
    right: 0.166667rem;
    color: #999;
  }
}
.zujin {
  position: relative;
  span {
    position: absolute;
    top: 0.166667rem;
    right: 0.491667rem;
    padding-left: 0.083333rem;
    border-left: 1px solid #ddd;
    color: #999;
  }
}
.yan {
  position: relative;
  span {
    position: absolute;
    top: 0.166667rem;
    right: 0.166667rem;
    color: #4b6dff;
  }
}
.quickly {
  cursor: pointer;
  margin-top: 0.166667rem;
  padding: 0.125rem 0;
  color: #fff;
  background: #639DFF;
  border-radius: 0.041667rem;
  text-align: center;
}
</style>
