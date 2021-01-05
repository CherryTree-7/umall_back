<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
    >
      <el-form :model="user">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="user.roleid" placeholder="请选择角色">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              :label="item.rolename"
              :value="item.id"
              v-for="item in roleList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqRoleList,
  reqManageAdd,
  reqManageInfo,
  reqManageEdit,
} from "../../../utils/http";
import { errorAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      roleList: [],
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
  methods: {
    //清空列表
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //点击取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //修改manage
    changeManage() {
      return new Promise((resolve) => {
        if (this.user.username === "") {
          errorAlert("用户名不能为空");
          return;
        }

        if (this.user.password === "") {
          errorAlert("密码不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.changeManage().then(() => {
        reqManageAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            // 弹框弹出
            successAlert(res.data.msg);
            // 弹框消失
            this.cancel();
            //数据清空
            this.empty();
            //通知父级
            this.$emit("init");
          }
        });
      });
    },
    getOne(uid) {
      reqManageInfo({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    update() {
      this.changeManage().then(() => {
        reqManageEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>
<style>
</style>