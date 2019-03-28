<template>
  <el-container class="home_body">
    <el-header class="header_top">
      <header_v></header_v>
    </el-header>
    <el-container>
      <el-aside width="200px" class="body_left">
        <left_v></left_v>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import left_v from './view/left'
  import header_v from './view/header'
  export default {
    data() {
      return {

      };
    },
    components: {
      left_v,
      header_v
    },
    methods: {
    }
  }
</script>
<style scoped>
.header_top{
    border-bottom: 1px solid #279893;
    background-color: #21d3ce;
}
.body_left{
  border-right: 1px solid #279893;
  background-color: #21d3ce;
  text-align: center;
}
body{
  position: absolute;
  height: 100%;
  width: 100%;
}
.home_body{
  height: 100%;
  // background-color: #1c3332;
}
</style>