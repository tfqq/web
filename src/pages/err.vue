<template>
    <div>
        <Header bg="office"/>
        <Search @chuan="check"></Search>
        <div class="main">
            <div class="noRecord">
                <img src="../../static/404.png" alt="">
                <div class="noRecord_r">抱歉，您访问的页面出错了<div @click="goIndex">返回首页</div></div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../components/header'
import Search from '../components/search'
export default {
    components: {
        Header,
        Search
    },
    data() {
        return {

        }
    },
    methods:{
        check(data){
            this.$router.replace({name: 'write',params:{search:data}})
        },
        goIndex(){
            this.$router.replace({ name: 'index'})
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
<style scoped lang='less'>
</style>