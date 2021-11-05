<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userProfile.photo" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="userProfile.name" />
      <van-cell title="生日" is-link :value="userProfile.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'UserEdit',
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    ...mapActions(['getUserProfile'])
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
