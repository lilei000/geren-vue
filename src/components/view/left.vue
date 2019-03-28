<template>
        <ul class="mul">
          <div v-for="(todo, index) in todos" v-on:click="addClass(index)" v-bind:class="{ blue:index==current}">
            <router-link :to="{name: todo.url}" tag="li" >{{todo.text}}</router-link>
          </div>
        </ul>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        current:0,
            todos: [
            { text: '首页' ,url:"home"},
            { text: '测试vuex',url:"ceshi" }
        ]
      }
    },
    methods:{
        addClass:function(index){
            this.current=index;
        }
    }
}
</script>
<style scoped>
li,ul{
  list-style:none
}
.mul{
  width: 100%;
  padding: 0px;
  margin: -1px 0px;
}
.mul>div{
  width: 199px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
}
.blue{
  background-color: #242b2b;
  border-top: 1px solid #279893;
  border-bottom: 1px solid #279893;
}
</style>