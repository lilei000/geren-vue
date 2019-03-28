export default {
    // state是用来定义变量
  state: {
    count:6,
    title:"还没进行操作"
  },
  // actions是用来定义方法提交到事件到mutations
  actions: {
    increments : ({commit})=>commit('increment'),
    decrements : ({commit})=>commit('decrement')
  },
  // mutations是用来处理actions提交上来的的方法进行计算
  mutations: {
    increment : state =>{
        state.count=state.count+1,
        state.title='进行了加法运算'
    },
    decrement : state =>{
        state.count=state.count-1,
        state.title='进行了减法运算'
    }
  },
  // getters是用来改变state变量的
  getters: {
    count : state => state.count,
    title : state => state.title
  }
}