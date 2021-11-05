<template>
  <div id="Login">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马头条 - 登录" />
    <!-- 登录区域 -->
    <van-form @submit="login">
      <van-field
        v-model="form.mobile"
        type="tel"
        label="手机号码"
        placeholder="请输入手机号码"
        required
        :rules="rules.mobile"
      ></van-field>
      <van-field
        v-model="form.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="rules.code"
      ></van-field>
      <div style="margin: 16px">
        <van-button round block type="info" nativee-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "../api/userAPI";
import { mapMutations } from "vuex";
export default {
  // name 是当前组件的名称（建议为每个组件都指定唯一的 name 名称）
  name: "Login",
  data() {
    return {
      // 登录表单的数据，最终要双向绑定到 form 这个数据对象上
      form: {
        //用户的手机号
        mobile: "13888888123",
        //登录的密码
        code: "246810",
      },
      //表单的校验规则对象
      rules: {
        //手机号的校验规则     需要同时满足以下两个验证规则，才能验证通过
        mobile: [
          //必填项的校验规则
          { required: true, message: "请填写您的手机号", trigger: "onBlur" },
          //11位手机号的校验规则
          {
            pattern: /^1\d{10}$/,
            message: "请填写正确的手机号",
            trigger: "onBlur",
          },
        ],
        //密码的校验规则
        code: [
          { required: true, message: "请填写您的密码", trigger: "onBlur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["updateTokenInfo"]),
    async login() {
      // 只有当表单数据校验通过之后，才会调用此 login 函数
      // console.log('ok')
      const {data:res} = await loginAPI({
        mobile: this.form.mobile,
        code: this.form.code,
      });
      //console.log(res);

      //判断是否登录成功了
      if (res.message === "OK") {
        console.log(res.data);
        //任务1：把data对象存到vuex中去
        this.updateTokenInfo(res.data);
        //任务2：跳转到首页
         // #/login?url=%2Fuser
        // const url = window.location.hash.split('?')[1].split('=')[1]
        //
        // const url = new URLSearchParams
        this.$router.push('/')
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>