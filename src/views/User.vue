<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="userInfo.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{userInfo.name}}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{userInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" :data-id="userInfo.id" is-link @click="$router.push({name: 'user-edit'})" />
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" :data-id="userInfo.id" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
import {mapActions,mapState,mapMutations} from 'vuex'
export default {
  name: "User",
  methods: {
    ...mapActions(['getUserInfo']),
    ...mapMutations(['cleanLoginState']),
    logout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '您确定要退出登录吗？'
      })
        .then(() => {
          // on confirm
          // console.log('confirm')
          // this.commit('cleanLoginState')

          this.cleanLoginState()
          //  跳转到登录页面
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
          console.log('cancel')
        })
    }
  },
  computed:{
    //从vuex中把指定名称的State数据映射到组件中使用
    ...mapState(['userInfo'])
  },
  created(){
    this.getUserInfo()
  }
};
</script>

<style lang="less" scoped>
.user-container {s
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>