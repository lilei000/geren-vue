import Vuex from 'vuex'
import Vue from 'vue'
import logins from './login'
import jiajian from './jiajian'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	logins,
  	jiajian
  }
})