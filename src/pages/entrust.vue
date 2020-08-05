<template>
  <div>
    <Header bg="entrust"></Header>
    <!-- <search/> -->
    <div class="banner">
      <div class="entrust_con">
        <div class="entrust_box">
          <div style="font-size:.2rem">免费委托找房</div>
          <div style="margin:.166667rem 0 .25rem;">一键提交需求，七七找房帮您寻找最合适的办公室</div>
          <div class="require">
            <div>
              <img src="../../static/xq.png" alt="">
              <div>提交需求</div>
            </div>
            <img src="../../static/jt.png" alt="" class="jt">
            <div>
              <img src="../../static/kf.png" alt="">
              <div>客服联系</div>
            </div>
            <img src="../../static/jt.png" alt="" class="jt">
            <div>
              <img src="../../static/gj.png" alt="">
              <div>经纪人跟进</div>
            </div>
            <img src="../../static/jt.png" alt="" class="jt">
            <div>
              <img src="../../static/fy.png" alt="">
              <div>成交</div>
            </div>
          </div>
          <textarea
            class="your"
            placeholder="你的需求,如：浙江环球中心,200平米写字楼,简装带家私,租金5元/㎡/天左右,附近有地铁"
            v-model="remarks"
          ></textarea>
          <input class="code" type="number" placeholder="手机号" v-model="phone">
          <input class="code" type="text" placeholder="请输入姓名" v-model="name"  @keyup.enter="wt">
          <div class="quickly" @click="wt">立即委托</div>
        </div>
        <div class="entrust_ft">
          <span>你也可以拨打</span>
          <span style="color:#4B6DFF">{{$bus.kfPhone}}</span>
          <span>直接委托需求</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import Search from '../components/search'
import {yyzfApi} from '@/request/api'
export default {
  metaInfo: {
      meta: [
        {
          name: 'keywords',
          content: '七七找房,委托房源,写字楼房源委托,办公室房源委托'
        }
      ]
  },
  name: 'entrust',
  components: {
    Header,
    Footer,
    Search
  },
  data () {
    return {
      phone: '',
      name: '',
      remarks: '',
    }
  },

  methods: {
    wt () {
      var params={
        phone:this.phone,
        name: this.name,
        remarks: this.remarks,
        type: '1',
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
          this.$router.push({
            name: 'index'
          })
        }
      })
    }
  },

  created () {},
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.banner {
  background-image: url('../../static/banner.png');
  background-repeat: no-repeat;
  background-size: 100% 3.55rem;
  padding-top: 0.666667rem;
  padding-bottom: 3.083333rem;
}
.entrust_con {
  margin: 0 auto;
  font-size: 0.116667rem;
  width: 3.916667rem;
  text-align: center;
  color: #666;
  background-color: #fff;
  padding-top: 0.375rem;
  margin-bottom: 0.416667rem;
  border-radius: 0.083333rem;
  box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.1);
  .entrust_box {
    padding: 0 0.291667rem;
    .require {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.25rem;
      align-items: center;
      div {
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
    .your {
      padding: 0.116667rem 0.166667rem 0;
      width: 100%;
      height: 0.708333rem;
      box-sizing: border-box;
      font-size: 0.116667rem;
      border: none;
      border-radius: 0.041667rem;
      outline: none;
      resize: none;
      background-color: #f5f5f5;
      color: #999;
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
        width: 100%;
      }
    }
    .quickly {
      cursor: pointer;
      margin: 0.25rem 0 0.291667rem;
      padding: 0.125rem 0;
      color: #fff;
      background: #639DFF;
      border-radius: 0.041667rem;
      text-align: center;
    }
  }
  .entrust_ft {
    padding: 0.225rem 0;
    text-align: center;
    background-color: #f5f5f5;
  }
}
</style>
