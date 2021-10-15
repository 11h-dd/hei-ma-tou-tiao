<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar fixed>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="../../assets/toutiao_logo.png" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" sticky offset-top="46px">
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">
        <ArtList :channelid="item.id" :chanenlname="item.name"></ArtList>
      </van-tab>
    </van-tabs>
    <!-- 频道列表的标签页 -->

    <!-- 频道管理的小图标 -->
    <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
import { getUserChannelAPI } from "@/api/hoemAPI.js";
import ArtList from "@/components/ArtList/ArtList.vue";

export default {
  name: "Home",
  data() {
    return {
      active: 0,
      userChannel: [],
    };
  },
  components: { ArtList },
  methods: {
    async initUserChannel() {
      // 1. 调用 API 接口
      const { data: res } = await getUserChannelAPI();
      console.log(res);
      // 2. 判断请求是否成功
      if (res.message === "OK") {
        // 3. 为用户的频道列表赋值
        this.userChannel = res.data.channels;
      }
    },
  },
  created() {
    this.initUserChannel();
  },
};
</script>

<style lang="less" scoped>
// 组件外层容器的样式
// .home-container {
//   padding-top: 46px;
//   padding-bottom: 50px;
// }
// logo 样式
.logo {
  height: 80%;
}
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
</style>
