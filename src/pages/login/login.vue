<template>
  <div class="login">
    <div class="con">
      <h2 class="center">登录</h2>
      <el-input
        placeholder="请输入用户名"
        v-model="user.name"
        clearable
        class="ipt"
      >
      </el-input>
      <el-input
        class="ipt"
        placeholder="请输入密码"
        v-model="user.pass"
        show-password
      ></el-input>
      <el-button type="primary" @click="login" class="center2">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
      },
    };
  },
  methods: {
    login() {
      this.$message({
        message: "登录成功",
        type: "success",
      });
      this.$router.push("/home")
    },
  },
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #533545, #453951, #313d5e);
}
h2 {
  font: bold 20px/30px "微软雅黑";
}
.con {
  width: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
}
.ipt {
  margin: 10px;
}
.center {
  text-align: center;
}
.center2 {
  width: 400px;
}
</style>