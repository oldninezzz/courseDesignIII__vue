<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="12">
      <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="毕业学校">
      <el-input v-model="form.graduateschool"></el-input>
    </el-form-item>
    <el-form-item label="工作经验">
      <el-input type="textarea" v-model="form.workexperience"></el-input>
    </el-form-item>
    <el-form-item label="获奖情况">
      <el-input type="textarea" v-model="form.prize"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
    </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "resume",
  data() {
    return {
      form: {
        uid:sessionStorage.getItem("uid"),
        graduateschool:'',
        workexperience:'',
        prize:''
      },
      storeForm:{

      }
    }
  },
  methods: {
    onSubmit() {
      let _this = this;
      console.log(this.form)
      this.storeForm.graduateschool = this.form.graduateschool;
      this.storeForm.workexperience = this.form.workexperience;
      this.storeForm.prize = this.form.prize;
      this.axios.put("http://localhost:8088/updateResume", _this.storeForm)
      .then(function (response){
        if(!response){
          _this.$message({
            message:"更新失败",
            type:"warning"
          })
        }
        else{
          _this.$message({
            message:"更新成功",
            type:"success"
          })
          setTimeout(function (){
            location.reload();
          },2000);
        }
      });
    }
  },
  created() {
    let _this = this;
    let params = new URLSearchParams();
    params.append("uid", sessionStorage.getItem("uid"));
    this.axios.post("http://localhost:8088/getResume", params).then(function (response){
      if(response.data){
        _this.storeForm = response.data;
        _this.form.graduateschool = response.data.graduateschool;
        _this.form.workexperience = response.data.workexperience;
        _this.form.prize = response.data.prize;
      }
    })
  }
}
</script>
<style scoped>

</style>
