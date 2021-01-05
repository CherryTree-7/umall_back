<template>
  <div class="login">
    <div class="con">
      <h2 class="center">登录</h2>
      <el-form :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="user.username"
            clearable
            class="ipt"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            class="ipt"
            placeholder="请输入密码"
            v-model="user.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="login" class="center2">登录</el-button>
    </div>
  </div>
</template>
<script>
import { reqLogin } from "../../utils/http";
import { mapActions } from "vuex";
import { successAlert } from '../../utils/alert';
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    login() {
      // this.$message({
      //   message: "登录成功",
      //   type: "success",
      // });

      reqLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.changeUser(res.data.list);
          this.$router.push("/home");
        }
      });
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