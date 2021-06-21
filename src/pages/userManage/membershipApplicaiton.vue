<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="12">
      <el-card shadow="always" v-for="(item, index) in allData" :key="index" style="width: 600px;margin: 0 auto;padding: 0">
        <div style="float: left">申请人:{{item.account}}</div>
        <div v-if="item.isdisposal === 0">
          <el-button type="primary" size="small" @click="pass(item)">通过</el-button>
          <el-button type="danger" size="small" @click="deny(item)">拒绝</el-button>
        </div>
      </el-card>
      <h3 v-if="allData.length == 0">没有会员申请消息</h3>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "membershipApplicaiton",
  data(){
    return{
      allData:[],
      targetType:''
    }
  },
  methods:{
    deleteApplicaiton(memshipid){
      let _this = this;
      let param = new URLSearchParams();
      param.append("memshipid", memshipid);
      this.axios.post('http://localhost:8088/deleteMemApplication', param)
        .then(function (response){
        });
    },
    passApplicaiton(item){
      let axiosTar;
      let _this = this;
      const param2 = new URLSearchParams();
      param2.append("uid", item.uid);
      // console.log(targetType)
      if(this.targetType === '1'){
        axiosTar = 'http://localhost:8088/setIndiValid';
      }
      else if(this.targetType === '2'){
        axiosTar = 'http://localhost:8088/setEnterValid'
      }
      this.axios.post(axiosTar, param2)
        .then(function (response){
          if(response.data == true){
            item.isdisposal = 1;
            _this.deleteApplicaiton(item.memshipid)
          }
        });
    },
    pass(item){
      let _this = this;
      const param1 = new URLSearchParams();
      param1.append("uid", item.uid);
      this.axios.post('http://localhost:8088/getUser', param1)
        .then(function (response){
          _this.targetType = response.data.utype;
          console.log(response.data.utype)
          _this.passApplicaiton(item)
        });
    },
    deny(item){
      let _this = this;
      let param = new URLSearchParams();
      param.append("memshipid", item.memshipid);
      item.isdisposal = 1;
      this.deleteApplicaiton(item.memshipid)
    }
  },
  mounted() {
    let _this = this;
    this.axios.get("http://localhost:8088/getAllMemApplication")
    .then(function (response){
      _this.allData = response.data;
    });
  }
}
</script>

<style scoped>

</style>
