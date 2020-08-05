import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    Message.error('请求超时!')
    return Promise.resolve(err)
  }
)
axios.interceptors.response.use(
  data => {
    NProgress.done();
    var {status} =data.data
    if (data.status === 200 && status !=1) {
      Message.error(data.data.msg);
      var pathUrl=router.currentRoute.name //获取当前路径
      if(pathUrl=='lpdetail'|| pathUrl=='detail'|| pathUrl=='housedetail'){
        router.replace({name: 'err'})
      }
      if(status==-99 || status==-100){
        window.localStorage.removeItem('token')
      }
      return Promise.reject(status)
    }
    return Promise.resolve(data)
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
        Message.error('服务器被吃了⊙﹏⊙∥')
    } else if (err.response.status == 403) {
        Message.error('权限不足,请联系管理员!')
    } else {
        Message.error('未知错误!')
    }
    router.replace({name: 'err'})
    return Promise.reject(err.response.status)
  }
)
export const post = (url, params) => {
  NProgress.start()
  return axios({
    method: 'post',
    url: url,
    data: params,
    withCredentials: true,
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
