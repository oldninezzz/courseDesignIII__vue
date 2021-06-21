<template>
  <div class="centerLocate">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
      <el-form-item label="账号" prop="account" style="font-size: 100px">
          <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="utype">
        <el-radio-group v-model="ruleForm.utype">
          <el-radio label="1">个人用户</el-radio>
          <el-radio label="2">企业用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="success" round @click="Register">注册</el-button>
      </el-form-item>
</el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        account: '',
        password: '',
        utype: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      params:''
    };
  },
  methods: {
    initResume(){
      let _this = this;
      console.log(_this.params)
      return axios.post("http://localhost:8088/initResume", _this.params);
    },
    initIndividual(){
      let _this = this;
      console.log(_this.params)
      return axios.post("http://localhost:8088/initIndividual", _this.params);
    },
    initEnterprise(){
      let _this = this;
      return axios.post("http://localhost:8088/initEnterprise", _this.params);
    },
    asynInit(){
      let _this = this;
      this.params = new URLSearchParams();
      this.params.append("uid", sessionStorage.getItem("uid"));
      console.log(sessionStorage.getItem("uid"));
      if(sessionStorage.getItem("utype") === '1'){
        axios.all([_this.initIndividual(), _this.initResume()])
          .then(axios.spread(function (indi, res){
            console.log(indi, res)
            if(indi.data!=true || res.data!=true){
              _this.$message({message:"注册失败",type:"error"});
              return;
            }
          }));
      }
      else{
        axios.all([_this.initEnterprise()])
          .then(axios.spread(function (ente){
            if(ente.data!=true){
              _this.$message({message:"注册失败",type:"error"});
              return;
            }
          }));
      }
      _this.$message({message:"欢迎加入！即将进入主页面", type:"success"})
      setTimeout(function (){
        _this.$router.push("/total");
      }, 2000);
    },
    Register(){
      let _this = this;
      axios.put('http://localhost:8088/addUser', _this.ruleForm).then(function (response){
        if(response.data){
          // _this.$message({message:"欢迎加入！即将进入主页面", type:"success"})
          console.log(response.data)
          window.sessionStorage.setItem("token", response.data.token);
          window.sessionStorage.setItem("uid", response.data.uid);
          window.sessionStorage.setItem("username", _this.ruleForm.account);
          window.sessionStorage.setItem("utype", response.data.utype);
          _this.asynInit();
        }
        else{
          _this.$message({message:"注册失败,用户名重复",type:"error"});
          return;
        }
      });
      console.log(_this.params)
    }
  }
}
</script>
<style scoped src="../../../static/center.css">

</style>
