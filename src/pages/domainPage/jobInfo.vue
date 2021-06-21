<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column label="职位名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.jobname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位类型" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.jobtype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="薪资" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.salary }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司" width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.enterprisename }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="userType === '1'">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleApply(scope.$index, scope.row)">申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :hide-on-single-page="false"
        :current-page="1"
        :page-size="7"
        :total="total"
        layout="prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: "jobInfo",
  data(){
    return{
      tableData:[],
      userType: sessionStorage.getItem("utype"),
      total:null,
      applyInfo:{
        uid:'',
        jobid:''
      },
      valid:sessionStorage.getItem("valid")
    }
  },
  methods:{
    handleApply(index, row) {
      console.log(index, row);
      let _this = this;
      this.applyInfo.uid = sessionStorage.getItem("uid");
      this.applyInfo.jobid = row.jobid;
      if(this.valid === '1'){
        this.axios.post('http://localhost:8088/addEmployInfo', _this.applyInfo)
          .then(function (response){
            if(response.data){
              _this.$message({message:"申请成功!", type:"success"})
            }
            else{
              _this.$message({message:"申请失败!", type:"error"})
            }
            setTimeout(function (){
              location.reload();
            }, 2000);
          });
      }
      else{
        this.$notify.error({title:"抱歉！", message:"非会员无法申请，请前往个人页面申请！"})
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let _this = this;
      this.axios.get('http://localhost:8088/getAllJob/'+val).then(response => {
        _this.tableData = response.data.content; //记录的内容
      });
    }
  },
  created() {
    let _this = this;
    this.axios.get("http://localhost:8088/getAllJob/1").then(function (response){
      console.log(response.data)
      _this.tableData = response.data.content;
      console.log(response.data.totalElements)
      _this.total = parseInt(response.data.totalElements); //总记录数
      console.log(_this.total)
    });
  }
}
</script>

<style scoped>

</style>
