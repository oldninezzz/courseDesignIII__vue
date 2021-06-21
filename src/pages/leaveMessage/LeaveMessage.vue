<template>
  <div class="mainContent">
    <el-row type="flex" justify="space-around" style="padding: 100px">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-position="left" label-width="80px">
          <el-form-item label="留言内容">
            <el-input type="textarea" :rows="5" v-model="form.leavingcontent"></el-input>
          </el-form-item>
          <el-button @click="send" type="success">发送</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeaveMessage",
  data(){
    return{
      form:{
        leavingcontent:'',
        isread:'0',
        leaverid: sessionStorage.getItem("uid"),
        leavername: sessionStorage.getItem("name")
      }
    }
  },
  methods:{
    send() {
      let _this = this;
      this.axios.post("http://localhost:8088/addMessage", _this.form)
      .then(function (response){
        if(response.data == true){
          _this.$message({message:"留言成功!", type:"success"})
        }
        else{
          _this.$message({message:"留言失败!", type:"error"})
        }
        setTimeout(function (){
          location.reload();
        }, 2000);
      });
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
