<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="title" label="活动名称" width="180">
    </el-table-column>
    <el-table-column prop="name" label="状态" width="200">
      <template slot-scope="scope">
        <el-button type="success" v-if="scope.row.status == 1">启 用</el-button>
        <el-button type="info" v-if="scope.row.status == 2">禁 用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { reqSeckDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      this.$confirm("您确定要删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSeckDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    },
    //编辑
    edit(id){
      this.$emit("edit",id)
    }
  },
};
</script>
<style>
</style>