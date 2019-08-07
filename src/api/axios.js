
// // 基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // 请求头
// axios.defaults.headers = {
//   // token认证需要的字段
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao'))
// }

// 封装axios
import axios from 'axios'

import JSONBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // headers: {
  //   // token认证需要的字段
  //   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
  // }
  transformResponse: [(data) => {
    // 处理格式
    return JSONBig.parse(data)
  }]
})
// 请求拦截器
instance.interceptors.request.use(config => {
  // config请求配置对象   修改config
  const user = window.sessionStorage.getItem('toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.request.use(response => {
  return response
}, (error) => {
  // 如果响应状态码为 401 拦截到登录页面
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
