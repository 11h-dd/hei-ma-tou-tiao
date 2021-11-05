<template>
  <div>       <!-- 底部的 TabBar -->
    <!-- route 属性：是否开启路由模式 -->
      <router-view></router-view>
    <van-tabbar route>
      <!-- to 属性：点击后要跳转到的路由地址 -->
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar></div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="less" scoped></style>
