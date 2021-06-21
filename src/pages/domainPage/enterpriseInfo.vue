<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="公司名称"
        width="360">
      </el-table-column>
      <el-table-column
        prop="address"
        label="公司地址"
      >
      </el-table-column>
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
  name: "enterpriseInfo",
  data(){
    return{
      tableData:[],
      total:null
    }
  },
  methods:{
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    let _this = this;
    this.axios.get("http://localhost:8088/getAllEnterprise/1").then(function (response){
      _this.tableData = response.data.content;
      _this.total = response.data.totalElements;
    });
  }
}
</script>

<style scoped>

</style>
