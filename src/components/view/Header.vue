<template>
    <div class="header_body">
    	<el-dropdown :hide-on-click="false">
		  <span class="el-dropdown-link">
		    {{usename}}<i class="el-icon-arrow-down el-icon--right"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item>个人中心</el-dropdown-item>
		    <el-dropdown-item divided ><span @click="logintc()">退出</span></el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
    </div>
</template>
<script>
  export default {
  	name: 'headers',
    data() {
      return {
      	usename:""
      };
    },
    mounted: function () {
	    this.usename = localStorage.getItem("usename");
	},
    methods:{
    	logintc(){
    		console.log("退出");
    		this.$confirm('此操作将退出, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	localStorage.clear();
	        	// localStorage.setItem("token",""); 
	            // localStorage.setItem("usename","");
	            // localStorage.setItem("useID","");
	            this.$router.push({ path: '/'});
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '取消退出'
	          });          
	        });
    	}
    }
  }
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown{
  	float:right;
  }
  .header_body{
  	height: 60px;
  	line-height: 60px;
  }
</style>