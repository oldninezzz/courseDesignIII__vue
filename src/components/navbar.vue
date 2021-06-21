<template>
  <el-container>
    <el-header style="padding: 0 0;">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="$route.path"
        router
        >
        <el-menu-item index="/total">首页</el-menu-item>
        <el-menu-item v-if="utype !== '0'" index="/search">搜索</el-menu-item>
        <el-menu-item v-if="utype !== '0'" index="/leavemessage">客服留言</el-menu-item>
<!--        <el-submenu index="2">-->
<!--          <template slot="title">数据查询</template>-->
<!--          <el-menu-item index="2-1">查询职位</el-menu-item>-->
<!--          <el-menu-item index="2-2">查询公司</el-menu-item>-->
<!--          <el-menu-item index="2-3">查询个人</el-menu-item>-->
<!--        </el-submenu>-->
        <el-menu-item style="float: right"><el-button @click="quit">退出</el-button></el-menu-item>
        <el-menu-item :index="messageManage" style="float: right">{{username}}</el-menu-item>
      </el-menu>

    </el-header>
    <el-main><router-view></router-view></el-main>
    <el-footer>
      <h3>TalentRecruit @oldnine</h3>
    </el-footer>
  </el-container>

</template>
<script>
export default {
  data() {
    return {
      mainPage: '',
      username: window.sessionStorage.getItem("username"),
      messageManage: '/user',
      utype: sessionStorage.getItem("utype")
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    quit(){
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("uid");
      window.sessionStorage.removeItem("username");
      sessionStorage.clear();
      this.$router.push("/login");
    }
  },
  mounted() {

  }
}
</script>
<style>
  .el-container{
    position: relative;
  }
  /*.el-footer{*/
  /*  width: 500px;*/
  /*  margin: 0 auto;*/
  /*  height: 100px;*/
  /*  position: absolute;*/
  /*  bottom: 0;*/
  /*}*/
  .el-menu-item{
    font-size: 20px;
  }

</style>
