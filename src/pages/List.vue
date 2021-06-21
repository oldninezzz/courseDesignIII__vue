<template>
<div class="mainContent">
  <el-tabs tab-position="left" style="height: 70vh;">
    <el-tab-pane label="用户列表">
      <Content></Content>
    </el-tab-pane>
    <el-tab-pane label="Hello">
      <HelloWorld></HelloWorld>
    </el-tab-pane>
    <el-tab-pane label="基本信息">
      <Profile></Profile>
    </el-tab-pane>
  </el-tabs>
</div>

</template>
<style scoped>
.content_table{
  background-color: #f9fcff;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-width: medium;
}

</style>

<script>

import axios from "axios";
import Content from "./Content";
import HelloWorld from "./HelloWorld";
import Profile from "./Profile";

export default {
  name: 'Main',
  components: {Profile, HelloWorld, Content},
  data(){
    return{
      parent: '',
      text:''
    }
  },
  methods:{
    // getParent(){
    //   let path = this.$route.name;
    //   console.log(path);
    //   let router = this.$router.options.routes;
    //   marker:
    //   for (let i in router){
    //     if(router[i].name == 'mainPage'){
    //       let a = router[i].children;
    //       for (let j in a){
    //         if(a[j].name == path){
    //           this.parent = a[j].children;
    //           break marker;
    //         }
    //       }
    //     }
    //   }
    //
    // }
  },
  created() {
    // this.getParent();
    this.text = window.localStorage.getItem("username");
  }
};
</script>
