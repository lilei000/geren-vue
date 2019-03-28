import request from '@/url/login'
export default {
  state: {},
  actions: {
    // actions就是异步处理的机制
    logins(state, params) {
      return request.login(params)
    },
    zhuces(state, params) {
      return request.zhuce(params)
    },
    yanzhengmas(state, params) {
      return request.yanzhengma(params)
    }
  },
  mutations: {},
  getters: {}
}
