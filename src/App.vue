<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*position: relative;*/
  /*margin: 0 auto;*/
  align-items: center;
  height: 100vh;
}
.el-main{
  padding: 20px 0;
}
.mainContent{
  height: 70vh;
  /*border: 1px solid #eee;*/
}
body{
  margin: 0;
}
</style>
