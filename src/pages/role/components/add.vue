<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加角色' : '编辑'"
      :visible.sync="info.isshow"
    >

      <el-form :model="user">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- 树形控件 -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
        <!-- 状态 -->
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
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqMenuAdd,
  reqMenuList,
  reqRoleAdd,
  reqRoleInfo,
  reqRoleUpdate,
} from "../../../utils/http";
//引入弹框
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      // 树形控件的数据
      menuList: [],
      user: {
        rolename: "",
        menus: "",
        //   状态
        status: 1,
      },
      formLabelWidth: "120px",

      //   树形结构
    };
  },

  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
  methods: {
    //清空user
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        //   状态
        status: 1,
      };
      //清空树形控件
      this.$refs.tree.setCheckedKeys([]);
    },
    // 弹框消失事件
    cancel() {
      this.info.isshow = false;
    },

    //验证role
    changeRole() {
      return new Promise((resolve) => {
        if (this.user.rolename == "") {
          errorAlert("活动名称不能为空");
          return;
        }
        resolve();
      });
    },
    //添加
    add() {
      this.changeRole().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹框消失
            this.cancel();
            //弹框msg
            successAlert(res.data.msg);
            //清空user
            this.empty();
            //重新刷新列表
            this.$emit("init");
          }
        });
      });
    },
    getOne(id) {
      reqRoleInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;

          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    update() {
      this.changeRole().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹框消失
            this.cancel(),
              //正确的提示
              successAlert(res.data.msg);
            //数据清空
            this.empty();
            //通知父组件 刷新列表了
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