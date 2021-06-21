<template>
  <div class="mainContent">
    <el-container>
      <el-main style="padding: 50px 300px">
        <div class="search">
          <el-input size="large" class="searchInput" v-if="utype === '1'" v-model="input" placeholder="请输入职位关键词"></el-input>
          <el-input size="large" class="searchInput" v-if="utype === '2'" v-model="input" placeholder="请输入人才关键词"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          v-show="tableData.length > 0"
          v-if="utype === '1'">
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
          <el-table-column label="公司" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.enterprisename }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="utype === '1'">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleApply(scope.$index, scope.row)">申请</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-show="tableData.length > 0"
        v-if="utype === '2'">
        <el-table-column prop="name" label="求职人" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userage" label="年龄" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.userage }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usergender" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.usergender }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="userType === '2'">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">留言</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div>
          <h2 v-if="total === 0">未查询到相关信息</h2>
        </div>
        <div v-if="tableData.length > 0">
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "search",
  data(){
    return{
      input:'',
      utype: sessionStorage.getItem("utype"),
      is_active:'',
      tableData:[],
      total:'',
      applyInfo:{
        uid:'',
        jobid:'',
      },
      valid: sessionStorage.getItem("valid")
    }
  },
  methods:{
    searchData(){
      let _this = this;
      let axiosTar;
      if(this.utype === '1'){
        axiosTar = "http://localhost:8088/searchJobInfo/1/"+_this.input;
      }
      else if(this.utype === '2'){
        axiosTar = "http://localhost:8088/searchIndiInfo/1/"+_this.input;
      }
      this.axios(axiosTar).then(function (response){
        _this.tableData = response.data.content;
        console.log(response.data.totalElements)
        _this.total = parseInt(response.data.totalElements); //总记录数
        console.log(_this.total)
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let _this = this;
      if(this.utype === '1'){
        this.axios.get('http://localhost:8088/searchJobInfo/'+val+'/'+this.input).then(response => {
          _this.tableData = response.data.content; //记录的内容
        });
      }
      else{
        this.axios.get('http://localhost:8088/searchIndiInfo/'+val+'/'+this.input).then(response => {
          _this.tableData = response.data.content; //记录的内容
        });
      }
    },
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
  },
  mounted() {

  }
}
</script>

<style scoped>
.searchInput{
  width: 300px;
  margin-right: 30px;
}
.search{
  position: relative;
}
.move{
  animation: mymove 1s;
  position: relative;
}
/*@keyframes mymove {*/
/*  1% {left: }*/

/*}*/
</style>
