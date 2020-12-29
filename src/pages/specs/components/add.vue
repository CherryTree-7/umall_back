<template>
  <el-dialog :title="info.isadd ? '添加' : '编辑'" :visible.sync="info.isshow">
    <el-form :model="user">
      <el-form-item label="规格名称" :label-width="formLabelWidth">
        <el-input v-model="user.specsname"></el-input>
      </el-form-item>

      <el-form-item
        label="规格属性"
        :label-width="formLabelWidth"
        v-for="(item, index) in attrsArr"
        :key="index"
      >
        <div class="sx">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index == 0" @click="newAdd"
            >新增规格属性</el-button
          >
          <el-button type="danger" v-else @click="delArr(index)"
            >删 除</el-button
          >
        </div>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="user.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqSpeceEdit, reqSpecsAdd, reqSpecsInfo } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    newAdd() {
      this.attrsArr.push({ value: "" });
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    delArr(index) {
      this.attrsArr.splice(index, 1);
    },
    //   点击添加
    add() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqSpecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqSpecsInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    update() {
      this.user.attrs = JSON.stringify(this.attrsArr.map(item=>item.value))
      reqSpeceEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
  },
};
</script>
<style scoped>
.sx {
  display: flex;
}
</style>