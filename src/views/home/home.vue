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
    <van-icon name="plus" size="16" class="plus" @click="show = true" />
    <!-- 频道管理弹出层 -->
    <van-popup v-model="show">
      <div class="popup-container">
  <!-- 弹出层的头部区域 -->
  <van-nav-bar title="频道管理">
    <template #right>
      <van-icon name="cross" size="14" color="white" @click="show = false" />
    </template>
  </van-nav-bar>

  <!-- 弹出层的主体区域 -->
  <div class="pop-body">
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <div>
          <span class="title-bold">已添加频道：</span>
          <span class="title-gray">点击进入频道</span>
        </div>
        <span class="btn-edit">编辑</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in userChannel" :key="item.id">
          <!-- 用户的频道 Item 项 -->
          <div class="channel-item van-hairline--surround">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>

    <!-- 分隔线 -->
    <div class="van-hairline--top sp-line"></div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <div>
          <span class="title-bold">可添加频道：</span>
          <span class="title-gray">点击添加频道</span>
        </div>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="item in moreChannels" :key="item.id">
          <div class="channel-item van-hairline--surround" @click="addChannel(item)">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</div>

    </van-popup>
  </div>
</template>

<script>
import { getUserChannelAPI,getAllChannelAPI } from "@/api/hoemAPI.js";
import ArtList from "@/components/ArtList/ArtList.vue";

export default {
  name: "Home",
  data() {
    return {
      active: 0,
      userChannel: [],
      allChannel:[],
      show:false
    };
  },
  computed:{
    moreChannels(){
      return this.allChannel.filter(item => {
        const index = this.userChannel.findIndex(x=> x.id == item.id)
        if(index===-1)return true
      })
    }
  },
  components: { ArtList },
  methods: {
    addChannel(item){
      this.userChannel.push(item)
    },
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
    async initAllChannel(){
      const {data:res} = await getAllChannelAPI()
      console.log(res)
      if(res.message == 'OK'){
        this.allChannel = res.data.channels
      }

    }
  },
  created() {
    this.initUserChannel();
    this.initAllChannel()
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
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
    .title-bold {
      font-weight: bold;
    }
    .title-gray {
      color: gray;
      font-size: 12px;
    }
  }
}

.btn-edit {
  border: 1px solid #a3a2a2;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 12px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
}

.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

.sp-line {
  margin: 10px 0 20px 0;
}

</style>
