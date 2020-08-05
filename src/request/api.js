import { post } from './http'
let baseUrl = process.env.BASE_URL
// let baseUrl = 'http://ht.77zhaofang.com/'
// 首页接口
export const homeApi = params => post(`${baseUrl}web/index/new_index`, params) 

// 区、装修、面积、单价等接口
export const sxtjApi = params => post(`${baseUrl}web/index/get_new_sxtj`, params)

// 搜索接口
export const searchApi = params => post(`${baseUrl}web/index/search_keyword`, params)

// 地铁口接口
export const ditieApi = params => post(`${baseUrl}web/index/get_ditiekou`, params)

// 商圈接口
export const shangquanApi = params => post(`${baseUrl}Mobile/index/get_shangquan`, params)

// 登录注册等系列接口
export const smsLoginApi = params => post(`${baseUrl}Mobile/user/sms_login`, params) //验证码登录
export const miLoginApi = params => post(`${baseUrl}Mobile/user/do_login`, params)//密码登录
export const setPwdApi = params => post(`${baseUrl}Mobile/user/set_pwd`, params)   
export const checkApi = params => post(`${baseUrl}Mobile/user/check_validate_code`, params) 
export const regApi = params => post(`${baseUrl}Mobile/user/reg`, params) //注册
export const sendCodeApi = params => post(`${baseUrl}Mobile/user/send_validate_code`, params)
export const logoutApi = params => post(`${baseUrl}web/user/logout`, params)

// 预约看房接口
export const yyzfApi = params => post(`${baseUrl}web/loupan/yyzf`, params)
export const wyczApi = params => post(`${baseUrl}web/loupan/wycz`, params)

// 地图接口
export const mapApi = params => post(`${baseUrl}web/loupan/getMapInfoByIdType`, params)
export const mianjiApi = params => post(`${baseUrl}Mobile/index/get_mianjisx`, params)
export const jiageApi = params => post(`${baseUrl}Mobile/index/get_jiagesx`, params)

// 收藏接口
export const collectApi = params => post(`${baseUrl}Mobile/user/collect_list`, params)
export const cancel_collectApi = params => post(`${baseUrl}Mobile/user/cancel_collect`, params)
export const goCollectApi = params => post(`${baseUrl}Mobile/user/collect`, params)

// 推荐房源接口
export const tjfyApi = params => post(`${baseUrl}web/loupan/get_tjfy`, params)

// 推荐楼盘接口
export const tjlpApi = params => post(`${baseUrl}web/loupan/get_tjlp`, params)

// 房源接口
export const yxhfApi = params => post(`${baseUrl}web/loupan/yxhf`, params)
export const fyDetailApi = params => post(`${baseUrl}web/loupan/fangyuan_detail`, params)

// 楼盘接口
export const loupanApi = params => post(`${baseUrl}web/loupan/index`, params) //楼盘列表
export const lpDetailApi = params => post(`${baseUrl}web/loupan/loupan_detail`, params)
export const lpFangyuanApi = params => post(`${baseUrl}web/loupan/get_loupan_fangyuan`, params) //楼盘中的所有房源


// 新房接口
export const fysaleApi = params => post(`${baseUrl}web/fysale/index`, params)
export const fysale_sxtjApi = params => post(`${baseUrl}web/fysale/get_sxtj`, params) //新房列表条件数据
export const saledetailApi = params => post(`${baseUrl}web/fysale/fysale_detail`, params)
export const saletjfyApi = params => post(`${baseUrl}web/fysale/get_tjfy`, params) //新房推荐
