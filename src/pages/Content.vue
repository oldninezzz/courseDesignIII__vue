<template>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      fixed
      prop="account"
      label="账号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="utype"
      label="类别"
      width="200">
    </el-table-column>
    <el-table-column>
<!--      fixed="right"-->
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    let _this = this;
    axios.get('http://localhost:8088/getAllUser').then(function (response){
      // console.log(response);
      _this.tableData = response.data;
      // for(let i in _this.tableData){
      //   // console.log(_this.tableData[i].userId);
      // }
      // console.log(_this.tableData.userId);
    })
  }
}
</script>
