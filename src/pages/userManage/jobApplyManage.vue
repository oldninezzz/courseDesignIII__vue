<template>
  <div class="holder">
    <h2>已申请的职位</h2>
    <el-row type="flex" justify="space-around">

      <el-col :span="12">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column prop="jobname" label="职位名称" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.jobname }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="jobtype" label="职位类型" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.jobtype }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enterprisename" label="公司">
            <template slot-scope="scope">
              <span>{{ scope.row.enterprisename }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "jobApplyManage",
  data(){
    return{
      tableData:[],
    }
  },
  methods:{
    handleDelete(index, row) {
      console.log(index, row);
      let _this = this
      let param = new URLSearchParams()
      param.append("uid", sessionStorage.getItem("uid"))
      param.append("jobid", row.jobid)
      this.axios.post('http://localhost:8088/deleteEmployInfo', param)
        .then(function(response){
          if(response.data != true){
            _this.$message({message:"删除失败",type:"error"});
          }
          else{
            _this.$message({message:"删除成功",type:"success"});
            setTimeout(function (){
              location.reload();
            },2000);
          }
        });
    },
  },
  mounted() {
    let _this = this;
    let param = new URLSearchParams()
    param.append("uid", sessionStorage.getItem("uid"))
    this.axios.post('http://localhost:8088/getEmployInfo', param)
    .then(function (response){
      _this.tableData = response.data;
    });
  }
}
</script>

<style scoped>

</style>
