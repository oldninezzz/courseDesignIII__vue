<template>
  <div class="holder">
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <el-form label-position="left" label-width="80px" :model="formLabelAlign">
          <el-form-item label="称呼">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item v-if="utype === '1'" label="年龄">
            <el-input v-model="formLabelAlign.userage"></el-input>
          </el-form-item>
          <el-form-item v-if="utype === '1'" label="性别">
            <el-input v-model="formLabelAlign.usergender"></el-input>
          </el-form-item>
          <el-form-item v-if="utype === '2'" label="地址">
            <el-input v-model="formLabelAlign.address"></el-input>
          </el-form-item>
          <el-form-item label="状态" v-if="utype !== '0'">
            <div>
              <h3 class="showvalid" style="margin: 0" v-if="valid === '0'">非会员</h3>
              <h3 class="showvalid" style="margin: 0" v-else>会员</h3>
              <el-button v-if="valid === '0'" type="primary" @click="membershipApply">会员资格申请</el-button>
            </div>
          </el-form-item>

          <el-button @click="saveName" type="success">保存</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "information",
  data(){
    return{
      type: ['客服','个人用户','企业用户'],
      formLabelAlign: {
        name: '',
        userage:'',
        usergender:'',
        address:'',
        valid:''
      },
      name:'',
      utype:sessionStorage.getItem("utype"),
      paramsGet:'',
      paramsUser:'',
      valid: sessionStorage.getItem("valid"),
      individual:{

      },
      enterprise:{

      },
      membership:{
        uid: sessionStorage.getItem("uid"),
        isdisposal:'0',
        account: sessionStorage.getItem("username")
      }
    }
  },
  methods:{
    postUser(){
      return axios.post('http://localhost:8088/updateUser', this.paramsUser);
    },
    postIndividual() {
      return axios.post('http://localhost:8088/updateIndividual', this.individual);
    },
    postEnterprise(){
      return axios.post('http://localhost:8088/updateEnterprise', this.enterprise);
    },
    postJobEnterName(){
      return axios.post('http://localhost:8088/updateJobProviderName', this.paramsUser);
    },
    getIndividual(){
      return axios.post('http://localhost:8088/getIndividual', this.paramsGet);
    },
    getEnterprise(){
      return axios.post('http://localhost:8088/getEnterprise', this.paramsGet);
    },
    getUser(){
      return axios.post('http://localhost:8088/getUser', this.paramsGet);
    },
    saveName(){
      let _this = this;
      let axoisTar = [];
      this.paramsUser = new URLSearchParams();
      this.paramsUser.append("uid", sessionStorage.getItem("uid"));
      this.paramsUser.append("name", this.formLabelAlign.name);
      if(this.utype === '1'){
        this.individual.uid = sessionStorage.getItem("uid");
        this.individual.name = this.formLabelAlign.name;
        this.individual.userage = this.formLabelAlign.userage;
        this.individual.usergender = this.formLabelAlign.usergender;
        this.individual.valid = this.formLabelAlign.valid;
        axoisTar.push(this.postUser());
        axoisTar.push(this.postIndividual());
      }
      else if(this.utype === '2'){
        this.enterprise.uid = sessionStorage.getItem("uid");
        this.enterprise.name = this.formLabelAlign.name;
        this.enterprise.address = this.formLabelAlign.address;
        this.enterprise.valid = this.formLabelAlign.valid;
        axoisTar.push(this.postUser());
        axoisTar.push(this.postEnterprise());
        axoisTar.push(this.postJobEnterName());
      }
      this.axios.all(axoisTar)
        .then(axios.spread(function (r1, r2){
          if(!r1.data || !r2.data){
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
        }));
    },
    membershipApply(){
      let _this = this;
      this.axios.post('http://localhost:8088/addMemApplication', _this.membership)
      .then(function (response){
        if(response.data == true){
          _this.$notify.success({title:"通知", message:"会员申请已提交，请耐心等待审核!"})
        }
        else{
          _this.$notify.success({title:"通知", message:"会员申请提交失败!"})
        }
      });
    }
  },
  created() {
    let _this = this;
    this.paramsGet = new URLSearchParams();
    let axiosTar = [];
    this.paramsGet.append("uid", sessionStorage.getItem("uid"));
    axiosTar.push(this.getUser());
    if(this.utype === '1'){
      axiosTar.push(this.getIndividual());
    }
    else if(this.utype === '2'){
      axiosTar.push(this.getEnterprise());
    }
    this.axios.all(axiosTar)
      .then(axios.spread(function (r1, r2){
        // console.log(response.data)
        _this.formLabelAlign.name = r1.data.name;
        console.log("name", r1.data.name)
        if(_this.formLabelAlign.name==null){
          _this.formLabelAlign.name = "请完善";
        }
        sessionStorage.setItem("name", r1.data.name)
        _this.name = r1.data.name
        if(_this.utype !== '0')
          sessionStorage.setItem("name", r2.data.name)
        _this.formLabelAlign.utype = _this.type[_this.formLabelAlign.utype]
        if(_this.utype === '1'){
          _this.formLabelAlign.userage = r2.data.userage;
          _this.formLabelAlign.usergender = r2.data.usergender;
          _this.formLabelAlign.valid = r2.data.valid;
        }
        else if(_this.utype === '2'){
          _this.formLabelAlign.address = r2.data.address;
          _this.formLabelAlign.valid = r2.data.valid;
        }
      }));
  },
  mounted() {
    sessionStorage.setItem("name", this.name)
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
.showvalid{
  width: 200px;
  float: left;
}
/*.holder{*/
/*  width: 800px;*/
/*  position: relative;*/
/*  margin: 0 auto;*/
/*  transform: translateY(200px);*/
/*  box-shadow: 0 4px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
/*  border: 2px solid;*/
/*}*/
</style>
