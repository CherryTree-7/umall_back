<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="100">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
          
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { successAlert } from "../../../utils/alert";
import {reqRoleDel} from "../../../utils/http";
export default {
  props: ["list","info"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      this.$confirm("您确定要删除此条数据吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqRoleDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.$emit("init");
              
            }
          });
        })
        .catch(() => {});
    },
    edit(id){
      this.$emit("edit",id)
      this.info.isadd = false
    }
  },
};
</script>
<style>
</style>