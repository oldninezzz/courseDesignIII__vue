<template>
  <el-container class="mainContent">
    <el-main>
      <el-badge :is-dot="isdot" class="item">
        <entry title="点我"></entry>
      </el-badge>
      <el-badge is-dot class="item">
        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
      </el-badge>
    </el-main>
  </el-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "customerService",
  data(){
    return{
      isdot: true,
    }
  }
}
Vue.component('entry', {
  template: `
    <el-button type="primary" circle size="medium">{{title}}</el-button>
  `,
  props: ['title']
})
</script>

<style scoped>

</style>
