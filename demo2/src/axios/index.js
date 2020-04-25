// import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  timeout: 60000
})
// 统一处理ajax失败
instance.interceptors.response.use(function (res) {
  // new Vue().$toast.hide()
  const response = res.data
  if (
    response.status !== '100' &&
    typeof response.errorMessges !== 'undefined' &&
    Object.prototype.toString.call(response.errorMessges) === '[object Array]'
  ) {
    // new Vue().$toast.text(response.errorMessges[0].message.trim())
    return Promise.reject(response)
  }
  return res
}, function (error) {
  // new Vue().$toast.text('网络中断了，请重试')
  return Promise.reject(error)
})

window.axios = instance
