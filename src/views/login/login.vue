<template>
  <div class="login-container" id="Login">
    <van-nav-bar title="黑马头条 - 登录" fixed />
    <!-- 登录的表单 -->
    <van-form @submit="login">
      <van-field
        type="tel"
        v-model="form.mobile"
        label="手机号码"
        placeholder="请输入手机号码"
        required
        :rules="rules.mobile"
      >
      </van-field>
      <van-field
        type="password"
        v-model="form.code"
        label="登录密码"
        placeholder="请输入登录密码"
        required
        :rules="rules.code"
      >
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { loginAPI } from "@/api/userApi";
import { mapMutations } from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据，最终要双向绑定到 form 这个数据对象上
      form: {
        // 用户的手机号
        mobile: "",
        // 登录的密码
        code: "",
      },
      // 表单的校验规则对象
      rules: {
        // 手机号的校验规则
        mobile: [
          { required: true, message: "请填写您的手机号", trigger: "onBlur" },
          {
            pattern: /^1\d{10}$/,
            message: "请填写正确的手机号",
            trigger: "onBlur",
          },
        ],
        // 密码的校验规则
        code: [
          { required: true, message: "请填写您的密码", trigger: "onBlur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations('he',['undateTokenInfo']),
    async login() {
      // 只有当表单数据校验通过之后，才会调用此 login 函数
      console.log("ok");

      // TODO：调用 API 接口，发起登录的请求
      const { data: res } = await loginAPI(this.form);
      if (res.message === "OK") {
        console.log(res.data);
        this.undateTokenInfo(res.data)
      }

      // console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 46px;
}
</style>
