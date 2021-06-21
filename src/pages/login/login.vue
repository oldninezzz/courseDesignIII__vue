<template>
  <div class="centerLocate">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" round @click="onSubmit">登录</el-button>
        <el-button type="primary" round @click="goRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        account: '',
        password: '',
        // code: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      let _this = this;
      console.log(this.ruleForm)
      this.axios.post("http://localhost:8088/loginCheck", this.ruleForm).then(function (response){
        console.log(response);
        if(response.data){
          window.sessionStorage.setItem("token", response.data.token);
          window.sessionStorage.setItem("uid", response.data.uid);
          window.sessionStorage.setItem("username", _this.ruleForm.account);
          window.sessionStorage.setItem("utype", response.data.utype);
          _this.$message({message:"登录成功", type:"success"})
          setTimeout(function (){
            _this.$router.push("/total");
          }, 2000);
        }
        else{
          _this.$message({message:"用户名或密码错误", type:"warning"})
        }
      }).catch(function (err){
        console.log(err)
        _this.$message('error');
      });
    },
    goRegister(){
      this.$router.push("/register");
    },
    created(){
      window.sessionStorage.setItem("token",null);
    }
  }
}
</script>
<style scoped src="../../../static/center.css">

</style>
