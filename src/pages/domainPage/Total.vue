<template>
  <div class="mainContent">
    <el-container>
      <el-main style="padding: 10px 150px">
        <el-tabs type="border-card">
          <el-tab-pane label="职位概览">
            <job-info></job-info>
          </el-tab-pane>
          <el-tab-pane label="人才概览">
            <talent-info></talent-info>
          </el-tab-pane>
          <el-tab-pane label="企业概览">
            <enterprise-info></enterprise-info>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import JobInfo from "./jobInfo";
import TalentInfo from "./talentInfo";
import EnterpriseInfo from "./enterpriseInfo";
export default {
  name: "Total",
  components: {EnterpriseInfo, TalentInfo, JobInfo},
  data(){
    return{
      input:'',
      utype: sessionStorage.getItem("utype")
    }
  },
  methods:{

  },
  mounted() {
    let _this = this;
    let axiosTar;
    if(this.utype === '1')
      axiosTar = "http://localhost:8088/getIndividual";
    else if(this.utype === '2')
      axiosTar = "http://localhost:8088/getEnterprise";
    let param = new URLSearchParams();
    param.append("uid", sessionStorage.getItem("uid"))
    this.axios.post(axiosTar, param)
    .then(function (response){
      sessionStorage.setItem("valid", response.data.valid)
      sessionStorage.setItem("name", response.data.name)
      console.log(response.data)
    });
  }
}
</script>

<style scoped>
  .search{
    width: 500px;
    transform: translateX(200px);
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
