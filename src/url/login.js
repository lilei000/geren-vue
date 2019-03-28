import axios from 'axios'

export default {
  login(params) {
    // 处理异步的一种方法 接受两个参数 resolve异步处理成功的回调函数 reject异步处理失败的回调函数
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/login/denglu',
        data: params
      }).then(resolve).catch(reject)
    })
  },
  zhuce(params) {
    // 处理异步的一种方法 接受两个参数 resolve异步处理成功的回调函数 reject异步处理失败的回调函数
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/login/zhuce',
        data: params
      }).then(resolve).catch(reject)
    })
  },
  yanzhengma(params) {
    // 处理异步的一种方法 接受两个参数 resolve异步处理成功的回调函数 reject异步处理失败的回调函数
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/login/yanzhengma',
        data: params
      }).then(resolve).catch(reject)
    })
  }
}

