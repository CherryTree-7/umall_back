<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import {successAlert} from '../../../utils/alert'
import { reqManageDel } from '../../../utils/http';
export default {
  props: ["list","info"],
  data() {
    return {};
  },
  methods: {
    del(uid) {
       this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点了删除按钮
          reqManageDel({ uid: uid }).then(res => {
            if(res.data.code===200){
              //弹弹框
              successAlert(res.data.msg)
              //32.刷新list
              this.$emit("init")
            }
          });
        })
        .catch(() => {});
    },
    edit(uid){
      this.$emit("edit",uid)
    }
  },
};
</script>
<style>
</style>