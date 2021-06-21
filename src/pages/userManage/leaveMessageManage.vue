<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="12">
      <el-card v-for="(item, index) in allData" :key="index" style="width: 600px;margin: 0 auto;padding: 0">
        <el-badge :is-dot="item.isread === 0" class="item">
          <div class="content_display">{{item.leavingcontent}}</div>
        </el-badge>
        <el-button type="primary" size="small" @click="dialogVisible = true">查看详情</el-button>
        <el-dialog
          :visible.sync="dialogVisible"
          width="30%"
          >
          <template slot="title">
            来自{{ item.leavername }} 的留言
          </template>
          <h3>
            {{ item.leavingcontent }}
          </h3>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>
        <el-button v-if="item.isread === 0" type="primary" size="small" @click="setRead(item)">标为已读</el-button>
        <el-button v-if="item.isread === 1" type="primary" size="small" @click="setUnRead(item)">标为未读</el-button>
        <el-button type="danger" size="small" @click="deleteMessage(item)">删除</el-button>
      </el-card>
      <h3 v-if="allData.length == 0">暂无留言</h3>
<!--      <el-collapse v-model="activeNames">-->
<!--          <el-collapse-item v-for="(item, index) in allData" :key="index" :name="index">-->
<!--            <template slot="title">-->
<!--              {{item.leavingcontent.substr(0, 5)+'...'}}-->
<!--            </template>-->
<!--            <div>-->
<!--              <h4>{{ item.leavingcontent }}</h4>-->
<!--              <div style="float: right">-->
<!--                <el-button v-if="item.isread === 0" type="primary" size="small" @click="setRead(item)">标为已读</el-button>-->
<!--                <el-button v-if="item.isread === 1" type="primary" size="small" @click="setUnRead(item)">标为未读</el-button>-->
<!--                <el-button type="danger" size="small" @click="deleteMessage(item)">删除</el-button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-collapse-item>-->
<!--      </el-collapse>-->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "leaveMessageManage",
  data(){
    return{
      allData:[],
      is_dot:true,
      activeNames: '',
      gridData:{},
      dialogVisible: false,
    }
  },
  methods:{
    setRead(item){
      let _this = this;
      let param = new URLSearchParams();
      param.append("lmessageid", item.lmessageid);
      this.axios.post("http://localhost:8088/setIsRead", param)
      .then(function (response){
        console.log("success");
        item.isread = 1;
      })
    },
    setUnRead(item){
      let _this = this;
      let param = new URLSearchParams();
      param.append("lmessageid", item.lmessageid);
      this.axios.post("http://localhost:8088/setUnRead", param)
        .then(function (response){
          console.log("success");
          item.isread = 0;
        })
    },
    deleteMessage(item){
      let _this = this;
      let param = new URLSearchParams();
      param.append("lmessageid", item.lmessageid);
      this.axios.post("http://localhost:8088/deleteMessage", param)
        .then(function (response){
          if(response.data != true){
            _this.$message({message:"删除失败",type:"error"});
          }
          else{
            _this.$message({message:"删除成功",type:"success"});
            setTimeout(function (){
              location.reload();
            },2000);
          }
        })
    }
  },
  mounted() {
    let _this = this;
    this.axios.get("http://localhost:8088/getAllLeaveMessage")
    .then(function (response){
      _this.allData = response.data;
    });
  }

}
</script>

<style scoped>
  .content_display{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .itemHolder{
    display: flex;
    justify-content: space-between;
  }
</style>
