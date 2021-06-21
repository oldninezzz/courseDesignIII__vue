<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="12">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="newPasswordCheck">
          <el-input type="password" v-model="form.newPasswordCheck"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "password",
  data(){
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      } else {
        if (this.form.newPassword !== '') {
          this.$refs.form.validateField('newPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.newPasswordCheck !== '') {
          this.$refs.form.validateField('newPasswordCheck');
        }
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      form:{
        oldPassword:'',
        newPassword:'',
        newPasswordCheck:''
      },
      rules:{
        oldPassword: [{
          validator: validatePass1, trigger: "blur"
        }],
        newPassword: [{
          validator: validatePass2, trigger: "blur"
        }],
        newPasswordCheck: [{
          validator: validatePass3, trigger: "blur"
        }]
      },
      opwd:''
    };
  },
  methods:{
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.opwd, this.form.oldPassword)
          if(this.form.oldPassword == this.opwd){
            let _this = this;
            let params = new URLSearchParams();
            params.append("uid", sessionStorage.getItem("uid"));
            params.append("password", this.form.newPassword);
            this.axios.post('http://localhost:8088/updatePassword', params)
            .then(function (response){
              if(response.data == true){
                _this.$message({message:"修改成功！请重新登录", type:"success"});
                sessionStorage.clear();
                setTimeout(function (){
                  _this.$router.push("/login");
                }, 2000);
              }
              else{
                _this.$message({message:"修改失败！", type:"error"});
                _this.$refs[formName].resetFields();
              }
            });
          }
        else{
            this.$message({message:"原密码输入错误！", type:"error"});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    let _this = this;
    let param = new URLSearchParams();
    param.append("uid", sessionStorage.getItem("uid"));
    this.axios.post('http://localhost:8088/getPasswordById', param)
    .then(function (response){
      _this.opwd = response.data;
    });
  }
}
</script>

<style scoped>

</style>
