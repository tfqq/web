<template>
  <div>
    <footer class="footer">
        <div class="main">
          <!-- 头部 -->
          <div class="flex_sb footer_hd">
            <h1 style="color:#191919">找写字楼，上七七找房</h1>
            <div><p>{{$bus.kfPhone}}</p> 客服服务：工作日 早9:00-晚20:00</div>
          </div>
          <!-- 中间 -->
          <div class="flex_sb footer_center">
              <div class="center_l">
                <img src="../../static/logo.png" alt="七七找房"  style="margin-bottom:10px">
                <div>
                  我们致力于为企业提供便捷、完整的选址服务<br/>
                  杭州勇利网络科技有限公司<br/>
                  地址：浙江省杭州市萧山区宁围街道广孚联合国际中心2307室
                </div>
              </div>
              <div class="center_m">
                <span @click="goAbout(0)">关于我们</span>
                <div style="margin:12px 0"  @click="goAbout(1)">加入我们</div>
                <div style="margin-bottom:12px"  @click="goAbout(2)">联系我们</div>
                <span @click="goWrite">投放房源</span>
              </div>
              <div class="center_r">
                <div>
                  <img src="../../static/xcx.jpg" alt="">
                  <p>扫码进入小程序</p>
                </div>
              </div>
          </div>
          <div class="friendship">友情链接： 
            <a href="http://www.che127.com/hangzhou/" target="_blank">杭州二手车</a> 
            <a href="https://www.qizuang.com/baike/" target="_blank">装修百科</a> 
            <a href="http://pic.homekoo.com/zhuangshigui" target="_blank">装饰柜效果图</a> 
            <a href="http://pic.homekoo.com/fengge" target="_blank">装修风格</a> 
            <a href="http://hangzhou.pcauto.com.cn/" target="_blank">杭州汽车网</a>
            <a href="https://kaoyan.koolearn.com/zhongyi/" target="_blank">中医综合</a>
            <a href="http://www.xhj.com/xiaoqu/" target="_blank">长沙小区</a> 
            <a href="http://www.jc001.cn/tag-shuzhuangtai/" target="_blank">梳妆台</a> 
            <a href="http://www.huishoushang.com/gq-hangzhou/" target="_blank">杭州二手设备</a> 
            <a href="http://www.huishoushang.com/gq-shizhutujiazu/" target="_blank">石柱二手设备</a> 
            <a href="https://www.tianqi.com/hangzhou/" target="_blank">杭州天气预报30天</a>
            <a href="https://www.mayi.com/" target="_blank">旅游住宿</a>
            <a href="http://www.shushi100.com/ask/" target="_blank">舒适家居问答</a> 
            <a href="http://xiangtan.liebiao.com/zufang/" target="_blank">湘潭租房</a> 
            <a href="http://hangzhou.liebiao.com/zufang/" target="_blank">杭州租房</a> 
            <a href="https://www.tuotuozu.com/hz/" target="_blank">杭州写字楼出租</a>
            <a href="http://www.youabc.cn/jiudian/jiudian-10000159.html" target="_blank">杭州香格里拉饭店</a>
            <a href="youabc.cn/jiudian/jiudian-10005481.html" target="_blank">杭州金海宾馆</a> 
            <a href="http://pic.homekoo.com/dianshigui" target="_blank">庆阳苗木价格</a> 
            <a href="https://www.jianzhi8.com/daziluru/" target="_blank">兼职打字</a> 
            <a href="https://www.tujia.com/hotel_beijing/" target="_blank">北京中国劳动关系学院住宿</a> 
            <a href="https://hz.5i5j.com/" target="_blank">杭州二手房</a>
            <a href="https://www.eduei.com/zstu/" target="_blank">浙江理工大学在职研究生</a>
            <a href="https://www.lawtime.cn/hangzhou" target="_blank">杭州律师</a>
            <a href="https://www.china0001.com.cn/?bd_vid=11205633568742384043" target="_blank">中国招标网</a>
          </div>
          <!-- 底部 -->
          <div class="foot_ft">
            ©2017-2020 七七找房官网 All Rights Reserved.  <img src="../../static/batb.png" alt="" style="margin:0 5px">
            <a href="http://beian.miit.gov.cn" target="_blank" style="color: #909399;">浙ICP备20000454号</a><br/>
          </div>
        </div>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goWrite(){
      var {href} = this.$router.resolve({path: "/free"});
      window.open(href, '_blank');
    },
    goAbout(type){
      var {href} = this.$router.resolve({path: "/about",query: {type}});
      window.open(href, '_blank');
    }
  },

  created () {
    // (function(m, ei, q, i, a, j, s) {
    //     m[i] = m[i] || function() {
    //         (m[i].a = m[i].a || []).push(arguments)
    //     };
    //     j = ei.createElement(q),
    //         s = ei.getElementsByTagName(q)[0];
    //     j.async = true;
    //     j.charset = 'UTF-8';
    //     j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
    //     s.parentNode.insertBefore(j, s);
    // })(window, document, 'script', '_MEIQIA');
    // _MEIQIA('entId', 182761);
  }
}
</script>

<style lang="less" scoped>
.footer {
  background-color: #F6F6F6;
  padding: .2rem 0 .066667rem;
  color: #303133;
  font-size:14px;
}
.footer_hd{
  color: #606266;
  p{
    font-size:30px;
    font-weight:500;
    color: #191919
  }
}
.footer_center{
  margin-top: 32px;
  .center_l{
    div{
      line-height: 26px
    }
  }
  .center_m{
    div{
      cursor: pointer;
    }
    span{
      cursor: pointer;
    }
    span:hover,div:hover{
      color: #1989FA
    }
  }
  .center_r{
    font-size:12px;
    text-align: center;
    margin-right: 80px;
    img{
      width:96px;
      height:96px;
      margin-bottom: 12px;
    }
  }
}
.friendship{
  margin: 20px 0;
  padding-top: 10px;
  border-top: 1px solid #eee;
  a{
    color: #303133;
    margin-right:10px;
  }
  a:hover{
    color: #1989FA
  }
}
.foot_ft{
  color: #909399
}
</style>
