<template>
   <div>
     <button @click="increments">增加</button>
     <button @click="decrements">减小</button>
     <p>当前数字为：{{count}}</p>
     <p>当前运算：{{title}}</p>
 
   </div>
 </template>
 
 <script>
 import {mapActions,mapGetters} from 'vuex';
 export default {
   name: 'app',
   data () {
     return {

     }
   },
   computed:{
   	...mapGetters(['count','title'])
   },
   methods:{
   	...mapActions(['increments','decrements'])
   }
 }
 </script>
 
 <style>
 
 </style>