<template>
  <div class="hello">
  <vue-particles
      style="height: 100%"
              color="#dedede"
              :particleOpacity="0.7"
              :particlesNumber="80"
              shapeType="circle"
              :particleSize="4"
              linesColor="#dedede"
              :linesWidth="1"
              :lineLinked="true"
              :lineOpacity="0.4"
              :linesDistance="150"
              :moveSpeed="3"
              :hoverEffect="true"
              hoverMode="grab"
              :clickEffect="true"
              clickMode="push"
            >
            
      </vue-particles>
    <div id="particles-js">
        <div class="login">
          <div class="login-top">
            <h3 class="title">登录</h3>
          </div>
          <div class="login-center clearfix">
              <el-input
                placeholder="请输入内容"
                v-model="username">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </div>
          <div class="login-center clearfix">
            <el-input
                placeholder="请输入内容"
                type="password"
                v-model="password">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </div>
          <div class="login-center clearfix">
            <el-button class="thirdparty-button" type="primary" @click="denglu">登录</el-button>
            <el-button class="thirdparty-button" type="primary" @click="zhuce">注册</el-button>
          </div>
        </div>
        <div class="sk-rotating-plane"></div>
    </div>
    <el-dialog title="注册账户" :visible.sync="dialogFormVisible" class="tanchukuang">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="youxiang">
          <el-input v-model="form.youxiang"></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="yanzhengma">
          <el-input v-model.number="form.yanzhengma" style="width:calc(100% - 130px);float: left;"></el-input>
          <el-button v-bind:disabled="disabledInput" class="yzan" @click="yanzhengma">{{content}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import {app} from 'js/app.js';
  // import {particlesmin} from 'js/particles.min.js';
  import {mapActions} from 'vuex'
export default {
  name: 'login',
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('验证码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      username:"",
      password:"",
      dialogFormVisible:false,
      form:{
        name:"",
        username:"",
        password:"",
        youxiang:"",
        yanzhengma:""
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 12个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16个字符', trigger: 'blur' }            
          ],
          youxiang: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'blur'] }
          ],
          yanzhengma: [
            { required: true, validator: checkAge , trigger: 'blur'}
          ]
        },
        wait:"60",
        content:"获取验证码",
        canClick: true,
        disabledInput:false
    }
  },
  mounted: function() {
  },
  methods:{
    ...mapActions(['logins','zhuces','yanzhengmas']),
    denglu(){
      var post = {username:this.username,password:this.password}
      this.logins(post).then(data => {
            if(data.ok){
              localStorage.setItem("token",data.token); 
              localStorage.setItem("usename",data.name);
              localStorage.setItem("useID",data.useid);
              this.$router.push({ path: '/view'});
            }else{
              this.$message({
                  type: 'success',
                  message: ''+data.msg+''
              });
            }
      });
    },
    zhuce(){
      this.dialogFormVisible = true;
    },
    add(form){
      this.$refs[form].validate((valid) => {
          if (valid) {
            this.zhuces(this.form).then(data => {            
                  if(data.ok){
                    this.dialogFormVisible = false;
                    this.$message({
                          type: 'success',
                          message: ''+data.msg+''
                    });
                  }else{
                    this.$message({
                        type: 'success',
                        message: ''+data.msg+''
                    });
                  }
            });
          } else {
            this.$message({
              type: 'success',
              message: '请填写完整！在提交'
            });
            return false;
          }
        });
    },
    yanzhengma(){
      var _this = this;
      if(this.form.youxiang != ""){
        let post = {youxiang:this.form.youxiang}
        this.yanzhengmas(post).then(data => {
              if(data.ok) {//请求成功
                    if(!_this.canClick) return//判断是否需要倒计时
                      _this.canClick = false;
                      _this.disabledInput = true;//按钮禁用
                      _this.content = '重新获取('+_this.wait+')'; //这里解决60秒不见了的问题
                      let clock = window.setInterval(() => {
                        _this.wait--
                        _this.content = '重新获取('+_this.wait+')'
                        if (_this.wait < 0) { //当倒计时小于0时清除定时器
                          window.clearInterval(clock);
                          _this.content = '获取验证码';
                          _this.wait = 60;
                          _this.canClick = true;
                          _this.disabledInput = false;
                        }
                      },1000);
                this.$message({
                      type: 'success',
                      message: ''+data.msg+''
                });
              }else{
                this.$message({
                    type: 'success',
                    message: ''+data.msg+''
                });
              }
        });
      }else{
        this.$message({
          type: 'success',
          message: '请输入邮箱'
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "css/reset.css";
@import "css/style.css";

</style>
<style>
.tanchukuang{
  height: 100%;
}
.tanchukuang .el-dialog{
  width: 500px;
}
.tanchukuang .el-dialog__body{
  padding: 20px;
}
.yzan{
  float: right;
}
</style>
