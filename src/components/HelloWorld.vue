<template>
  <div class="hello">
    <div>
      <el-input v-model="msg" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="ceshi">查询</el-button>
      <el-button type="primary" @click="add(1)">添加数据</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tm"
        label="题目">
      </el-table-column>
      <el-table-column
        prop="xx"
        label="答案">
      </el-table-column>
      <el-table-column
        prop="zqdaan"
        label="正确答案"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
          <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row,2)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="填写信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="form.tm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项" :label-width="formLabelWidth">
          <el-input v-model="form.xx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" :label-width="formLabelWidth">
          <el-input v-model="form.zqdaan" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adds()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      tableData: [{
          ID:"",
          tm: '',
          xx: '',
          zqdaan: ''
        }],
        dialogFormVisible:false,
        form:{
          tm:"",
          xx:"",
          zqdaan:"",
          use_id:""
        },
        formLabelWidth: '120px',
        jsos:"",
        use_id:""
    }
  },
  mounted: function () {
    this.use_id = localStorage.getItem('useID');
    this.ceshi();
  },
  methods:{
    ceshi(){
      let postData = {"ceshi":this.msg,"use_id":this.use_id};
        this.$ajax.post('/api/home/cha',
              postData,
            ).then(resp => {
              this.tableData = resp
            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
    },
    add(s){
      this.jsos = s;
      this.dialogFormVisible = true;
      this.form = {};
      this.form.use_id = this.use_id;
    },
    handleEdit(rew,s){
      this.jsos = s;
      this.form = rew;
      this.dialogFormVisible = true
    },
    adds(){
      if(this.jsos == 1){
        this.$ajax.post('/api/home/zeng',
             this.form,
          ).then(resp => {
            this.dialogFormVisible = false;
            this.ceshi();
            this.$message({
                  type: 'success',
                  message: '添加成功!'
            });
          });
      }else{
        this.$ajax.post('/api/home/gai',
             this.form,
          ).then(resp => {
            this.dialogFormVisible = false;
            this.ceshi();
            this.$message({
                  type: 'success',
                  message: '修改成功!'
            });
          });
      }
      
    },
    handleDelete(rew){
      let shanchu  = {"id":rew.ID};
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/api/home/shan',
             shanchu,
              ).then(resp => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.ceshi();
              });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
