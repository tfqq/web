<template>
    <div>
        <Header bg="entrust"></Header>
        <Search @chuan="check"/>
        <div class="doc_title">
            <div class="main">
                <span class="curhover" @click="goOther(1)">七七找房</span>
                <span>> {{type==0?'关于我们':(type==1?'加入我们':'联系我们')}}</span> 
            </div>
        </div>
        <div class="box">
            <img :src="type?(type==1?'../../static/about2.png':'../../static/about3.png'):'../../static/about1.png'" alt="" class="banner">
            <div class="about_us">
                <span :class="type==0?'active':''" @click="choose(0)">关于我们</span>
                <span :class="type==1?'active':''" @click="choose(1)">加入我们</span>
                <span :class="type==2?'active':''" @click="choose(2)">联系我们</span>
                <span @click="goOther(2)">投放房源</span>
            </div>
            <template v-if="type==0">
                <div class="qiqi">
                    <div style="margin:48px 0 72px;">七七找房平台上线于2020年7月，隶属于杭州市勇利网络科技有限公司</div>
                    <img src="../../static/logo1.png" alt="">
                </div>
                <div class="text">
                    致力于为企业提供便捷的选址经纪一站式服务。<br/>
                    主营业务：写字楼、创意园、联合办公、商铺、厂房等商业办公租售交易服务。<br/>
                    拥有海量的真实房源信息，用户可以在七七找房客户端（WEB、小程序等）自由浏览在线房源等信息，<br/>
                    经纪顾问为客户提供咨询、租赁方案、实地带看房源、协商议价、协助决策等相关服务，<br/>
                    入驻后可提供办公家具购置、绿植布置、网络布线、企业400电话等企业增值服务，<br/>
                    为客户提供一站式服务体验。
                </div>
            </template>
            <template v-else-if="type==1">
                <div class="add">
                    <p>【招聘条件】</p>
                    1、20岁-35岁、品行端正、男女不限。<br/>
                    2、热爱销售行业者。<br/>
                    3、为人正直诚实。<br/>
                    <p>【岗位职责】</p>
                    1、具备快速的学习能力。<br/>
                    2、性格外向、反应敏捷、表达能力强、具有较强的沟通能力及交际技巧、具有亲和力。<br/>
                    3、善于表达、有良好的人际交往沟通能力、勤奋刻苦、有强烈的上进心<br/>
                    4、保持与客户沟通联系。<br/>
                    <p>【任职资格】</p>
                    1、有无经验均可（我们只看你是否有意愿，是否想赚钱）<br/>
                    2、有良好的服务意识、综合素质（有营销行业经验者更加适合）<br/>
                    3、能吃苦耐劳、有强烈的企图心（目标需要靠自己的付出去实现）<br/>
                    <p>【薪资待遇】</p>
                    1、无责底薪4200+提成(较高55%)。<br/>
                    2、工作时间：9:00-18：00 每周单双休<br/>
                    3、工作地点：全杭州（工作地点就近安排）<br/>
                    <p>【联系方式】</p>
                    邮箱：<i>{{$bus.email}}</i><br/>
                    电话：{{$bus.kfPhone}}<br/>
                    地址：浙江省杭州市萧山区广孚联合国际中心2302<br/>
                    &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;浙江省杭州市余杭区欧美金融城6楼<br/>
                </div>
            </template>
            <template v-else>
                <div class="contact">
                    邮箱：<i>{{$bus.email}}</i><br/>
                    电话：{{$bus.kfPhone}}<br/>
                    地址：浙江省杭州市萧山区广孚联合国际中心2302<br/>
                    浙江省杭州市余杭区欧美金融城6楼<br/>
                </div>
            </template>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'
import Search from '../components/search'

export default {
    components: {
        Header,
        Footer,
        Search
    },
    data() {
        return {
            type:0
        }
    },
    methods:{
        check(data){
            this.$router.push({name: 'write',params:{search:data}})
        },
        goOther(type){
            if(type==1){
                var {href} = this.$router.resolve({path: "/index"});
                window.open(href, '_blank');
                // var
                return
            }
            var {href} = this.$router.resolve({path: "/free"});
            window.open(href, '_blank');
        },
        choose(index){
            this.type=index
        }
    },
    created() {

    },
    mounted() {
        this.type = this.$route.query.type
    }
}
</script>
<style scoped lang='less'>
.doc_title {
  font-size: .116667rem;
  color:#909399;
  padding-bottom: .2rem;
  background-color: #F6F6F6;
}
.curhover:hover{
  color: #071733;
  cursor: pointer;
}
.box{
    font-size: .133333rem;
    color: #606266;
}
.banner{
    width: 100%;
    height: auto;
}
.about_us{
    border-bottom: 1px solid #D8D8D8;
    text-align: center;
    span{
        display: inline-block;
        height: 70px;
        line-height: 70px;
        width:120px;
        margin-left: 1.133333rem;
        cursor: pointer;
    }
    .active{
        color: #1989FA;
        border-bottom: 1px solid #1989FA;
    }
}
.qiqi{
    text-align: center;
}
.text,.contact{
    width:6.666667rem;
    margin: 90px auto 350px;
    line-height:30px;
    text-align: center;
}
.add{
    width:650px;
    margin: 90px auto 350px;
    line-height:28px;
    p{
        font-weight: 550;
        text-align: center;
        margin: 30px 0;
    }
}
i{
    color: #8690BF;
    font-weight: 500;
}
.contact{
    margin: 48px auto 200px;
    
}
</style>