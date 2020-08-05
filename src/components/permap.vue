<template>
    <div>
        <div class="import_con_lhd">地图</div>
        <baidu-map class="map" :center="center1" :zoom="14" top>
            <bm-marker :position="center" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
            <div v-for="(item, index) in searcchList" :key="index">
                <bm-marker :clicking="true" :position="{lng: item.location.lng, lat: item.location.lat}" 
                :icon="iconStyle" @click="infoWindowOpen(item)">
                <bm-info-window
                :title="item.name"
                :position="{lng: item.location.lng, lat: item.location.lat}"
                :show="item.showFlag"
                @close="infoWindowClose(item)"
                >
                <p>地址：{{item.address}}</p>
                <div style="margin-top:5px" v-if="item.telephone">电话：{{item.telephone}}</div>
                </bm-info-window>
                </bm-marker>
            </div>
            <bm-circle :center="center" radius="3000" :stroke-opacity="1" :stroke-weight="1" strokeColor="#DDE1EE" fillColor="#DEE9F2"></bm-circle>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
            <bm-control class="Maptype">
                <div class="maptype_hd">
                    <div v-for="(item,index) in mapType" :key="index" class="mapType_hd_con" :class="current_type==index?'active':''" @click="chooseMapType(index)">
                        {{item}}
                    </div>
                </div>
                <div class="maptype_box">
                    <template v-if="searcchList.length">
                        <div class="maptype_con" v-for="(item,index) in searcchList" :key="index" @click="infoWindowOpen(item)">
                            <div class="maptype_con_hd">
                                <div><img :src="typeUrl" alt=""> {{item.name || item.xiaoqum}}</div>
                                距离{{distance[index]}}米
                            </div>
                            <div class="maptype_con_address">{{item.address}}</div>
                        </div>
                    </template>
                    <div class="noRecords" v-else>
                        <img src="../../static/kong.png" alt="">
                        <div>暂无周边数据</div>
                    </div>
                </div>
            </bm-control>
        </baidu-map>
    </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map'
import Vue from 'vue'
Vue.use(BaiduMap, {
  ak: 'zQ0lT9jZT2TUIbqu4nGZDUVbuksHZzLW' // 这个地方是官方提供的ak密钥
})

export default {
    props: {
        center: {
            type: Object,
            default: {
                lng:'',
                lat:''
            },
        },
        zhoubianfy:{
            type: Array,
            default: []
        }
    },
    data() {
        return {
            center1: {
                lng:'',
                lat:''
            },
            searcchList:[],
            mapType:['周边大厦','交通','餐饮','银行','酒店'],
            current_type:0,
            typeUrl:'../../static/house_24.png',
            iconStyle:{
                url: '../../static/house_32.png', 
                size: {width:32, height:32}
            },
            distance:[],
        }
    },
    watch:{
        current_type(newValue,oldValue){
            this.searcchList=[]
            this.distance=[]
            this.otherList()
        },
        center(newValue,oldValue){
            var position={
                lat:newValue.lat,
                lng:parseFloat(newValue.lng)+0.03+''
            }
            this.center1=position
            this.otherList()
        }
    },
    methods:{
        otherList() {
            if(!this.current_type){
                this.searcchList=this.zhoubianfy
                this.distanceList()
                return
            }
            var query=this.mapType[this.current_type]
            var that=this
            var dituzb=this.center
            var location=dituzb.lat+','+dituzb.lng
            this.$jsonp('http://api.map.baidu.com/place/v2/search?output=json',{
                radius:'3000',
                radius_limit:true,
                ak:'zQ0lT9jZT2TUIbqu4nGZDUVbuksHZzLW',
                query,
                location,
                page_size:'15',
                scope:'2',
                })
            .then(function (response) {
                var {results}=response
                for(var i=0;i<results.length;i++){
                    results[i].showFlag=false
                }
                that.searcchList=results
                that.distanceList()
            })
        },
        chooseMapType(index){
            this.current_type=index
            switch(index){
                case 0 :
                    this.iconStyle.url='../../static/house_32.png'
                    this.typeUrl='../../static/house_24.png'
                    break;
                case 1 :
                    this.iconStyle.url='../../static/bus_32.png'
                    this.typeUrl='../../static/bus_24.png'
                    break;
                case 2 :
                    this.iconStyle.url='../../static/foods_32.png'
                    this.typeUrl='../../static/foods_24.png'
                    break;
                case 3 :
                    this.iconStyle.url='../../static/bank_32.png'
                    this.typeUrl='../../static/bank_24.png'
                    break;
                default:
                    this.iconStyle.url='../../static/hotel_32.png'
                    this.typeUrl='../../static/hotel_24.png'
            }
        },
        distanceList(){
            var that=this
            for(var i=0;i<that.searcchList.length;i++){
                var lat=that.searcchList[i].location.lat
                var lng=that.searcchList[i].location.lng
                GetDistance(lat,lng)
            }
            function GetDistance(lat2,  lng2){
                var lat1=that.center.lat
                var lng1=that.center.lng
                var radLat1 = lat1*Math.PI / 180.0;
                var radLat2 = lat2*Math.PI / 180.0;
                var a = radLat1 - radLat2;
                var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
                Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
                s = s *6378.137 ;// EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;
                s=parseInt(s *1000)
                that.distance.push(s)
            }
        },
        // 关闭信息窗口 @close 自带的方法
        infoWindowClose (marker) {
            this.$set(marker, 'showFlag', false)
        },
        infoWindowOpen (marker) {
            if(!this.current_type){
                var pathUrl=this.$router.currentRoute.name
                if(pathUrl=='housedetail'){
                    var {href} = this.$router.resolve({path: "/housedetail",query: {id:marker.id}});
                }else{
                    var {href} = this.$router.resolve({path: "/lpdetail",query: {id:marker.id}});
                }
                window.open(href, '_blank');
                return
            }
            this.$set(marker, 'showFlag', true)
        },
    },
    created() {
        
    },
    mounted() {
       
    }
}
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.import_con_lhd{
    font-size:.2rem;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:550;
    margin-bottom:.333333rem;
}
.map{
    height:515px;
    width: 100%;
    .Maptype{
        width: 3.333333rem;
        background: #fff;
        right: 40px!important;
        left:initial!important;
        top: 50%!important;
        transform: translateY(-50%);
        .maptype_hd{
            display: flex;
            padding: 0 10px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E7E7E7;
            color: #999;
            .mapType_hd_con{
                padding: 15px 0;
                cursor: pointer;
                
            }
            .active{
                color: #1989FA;
                border-bottom: 1px solid #66BAFA;
            }
        }
        .maptype_box{
            position: relative;
            padding:10px;
            height: 380px;
            overflow-y: scroll;
            box-sizing: border-box;
            .maptype_con{
                cursor: pointer;
                font-size: 11px;
                margin-bottom:16px;
                .maptype_con_hd{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    font-weight:550;
                    div{
                        font-size: 13px;
                        flex: 1;
                        margin-right:8px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp:1;
                        overflow: hidden;
                        img{
                          width:24px;
                          height:24px;
                        }
                    }
                }
                .maptype_con_address{
                  color:#999999;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp:1;
                  overflow: hidden;
                }
            }
        }
        .maptype_box::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }
}
.noRecords{
    text-align: center;
    color: #909399;
    font-size:.133333rem;
    img{
        width:250px;
        height: auto;
    }
}
</style>