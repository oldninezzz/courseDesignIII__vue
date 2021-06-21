<template>
  <div>
    <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="职位添加" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="职位名称" :label-width="formLabelWidth">
          <el-input v-model="form.jobname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位类型" :label-width="formLabelWidth">
          <el-select v-model="form.jobtype" placeholder="职位类型">
            <el-option label="Java" value="Java"></el-option>
            <el-option label="Python" value="Python"></el-option>
            <el-option label="前端开发" value="前端开发"></el-option>
            <el-option label="嵌入式开发" value="嵌入式开发"></el-option>
            <el-option label="系统运维" value="运维"></el-option>
            <el-option label="3D建模" value="建模师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位薪资" :label-width="formLabelWidth">
          <el-input v-model="form.salary" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJob">确 定</el-button>
      </div>
    </el-dialog>
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <el-table :data="tableData" style="width: 100%">
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
  name: "jobManage",
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        jobname:'',
        jobtype:'',
        salary:'',
        uid:sessionStorage.getItem("uid"),
        enterprisename:sessionStorage.getItem("name")
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    deleteJob(row){
      let params = new URLSearchParams();
      params.append("jobId", row.jobid);
      return axios.post("http://localhost:8088/deleteJob", params);
    },
    deleteJobInformation(row){
      let params = new URLSearchParams();
      params.append("jobid", row.jobid);
      return axios.post("http://localhost:8088/deleteJobInformationByJobId", params);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let _this = this
      this.axios.all([this.deleteJob(row), this.deleteJobInformation(row)])
      .then(axios.spread(function (job, jobid){
        if(!job.data || !jobid.data){
          _this.$message({message:"删除失败",type:"error"});
        }
        else{
          _this.$message({message:"删除成功",type:"success"});
          setTimeout(function (){
            location.reload();
          },2000);
        }
      }));
    },
    addJob(){
      let _this = this;
      console.log(_this.form)
      this.axios.post("http://localhost:8088/addJob", _this.form)
      .then(function (response){
        if(response.data){
          _this.$message({message:"添加成功!", type:"success"})
        }
        else{
          _this.$message({message:"添加失败!", type:"error"})
        }
        setTimeout(function (){
          _this.dialogFormVisible = false;
          location.reload();
        }, 2000);
      });
    }
  },
  mounted() {
    let _this = this;
    let params = new URLSearchParams();
    params.append("uid", sessionStorage.getItem("uid"));
    this.axios.post('http://localhost:8088/getEnterpriseJob',params)
      .then(function (response){
        _this.tableData = response.data;
      });
  }
}
</script>
<style scoped>

</style>
