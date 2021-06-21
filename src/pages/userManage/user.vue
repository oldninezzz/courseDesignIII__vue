<template>
  <div class="mainContent">
    <el-tabs :tab-position="tabPosition" style="height: 70vh;">
      <el-tab-pane label="基本信息">
        <information></information>
      </el-tab-pane>
      <el-tab-pane v-if="userType === '1' && valid === '1'" label="简历管理">
        <resume></resume>
      </el-tab-pane>
      <el-tab-pane v-if="userType === '0'" label="留言管理">
        <leave-message-manage></leave-message-manage>
      </el-tab-pane>
      <el-tab-pane v-if="userType === '2' && valid === '1'" label="岗位信息管理">
        <job-manage></job-manage>
      </el-tab-pane>
      <el-tab-pane v-if="userType === '1' && valid === '1'" label="求职管理">
        <job-apply-manage></job-apply-manage>
      </el-tab-pane>
      <el-tab-pane label="密码设置">
        <password></password>
      </el-tab-pane>
      <el-tab-pane v-if="userType === '0'" label="会员申请管理">
        <membership-applicaiton></membership-applicaiton>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>

import Information from "./information";
import Resume from "./resume";
import JobManage from "./jobManage";
import Password from "./password";
import JobApplyManage from "./jobApplyManage";
import LeaveMessageManage from "./leaveMessageManage";
import MembershipApplicaiton from "./membershipApplicaiton";
export default {
  name: 'individual',
  components: {MembershipApplicaiton, LeaveMessageManage, JobApplyManage, Password, JobManage, Resume, Information},
  data() {
    return {
      tabPosition: 'left',
      userType: sessionStorage.getItem("utype"),
      valid:sessionStorage.getItem("valid")
    };
  }
};
</script>
<style>
  /*.el-tabs{*/
  /*  box-shadow: 0 4px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
  /*}*/
  .el-tabs__item:hover{
    background-color: rgba(0,0,0,0.13);
    transition: all ease-in-out 0.25s;
  }
  .is-active{
    background-color: rgba(0,0,0,0.13);
  }
</style>
