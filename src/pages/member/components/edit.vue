<template>
  <el-dialog title="修改会员资料" :visible.sync="info.isshow">
    <el-form :model="user">
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="user.password"></el-input>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="user.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { errorAlert, successAlert } from "../../../utils/alert";
import { mapActions } from "vuex";
import { reqMemberEdit, reqMemberInfo } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      reqList: "member/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    getOne(uid) {
      reqMemberInfo({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
        }
      });
    },
    update() {
      //验证member
      if (this.user.nickname === "") {
        errorAlert("昵称不能为空");
        return;
      }

      if (this.user.phone === "") {
        errorAlert("手机号不能为空");
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.user.phone)) {
        errorAlert("请填写正确的手机号");
        return
      }

      if (this.user.password === "") {
        errorAlert("密码不能为空");
        return;
      }

      reqMemberEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          this.cancel(), successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
  },
};
</script>
<style>
</style>