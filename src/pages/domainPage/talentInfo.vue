<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
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
<!--      <el-table-column v-if="userType === '2'">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">留言</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <div class="divpagenation">
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
  name: "talentInfo",
  data(){
    return{
      tableData:[],
      userType: sessionStorage.getItem("utype"),
      total:null
    }
  },
  methods:{
    handleEdit(index, row) {
      console.log(index, row);

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    let _this = this;
    this.axios.get("http://localhost:8088/getAllIndividual/1").then(function (response){
      _this.tableData = response.data.content;
      _this.total = response.data.totalElements;
    });
  }
}
</script>

<style scoped>

</style>
