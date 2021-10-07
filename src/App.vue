<template>
  <div id="app">
    <router-view></router-view>
      
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created () {
  
  }
};
</script>

<style lang="less" secoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
