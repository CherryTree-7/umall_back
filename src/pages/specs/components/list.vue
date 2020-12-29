<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="规格编号" width="100"> </el-table-column>
    <el-table-column prop="specsname" label="规格名称" width="180">
    </el-table-column>
    <el-table-column label="规格属性">
      <template slot-scope="scope">
        <el-tag
          type="warning"
          v-for="(item, index) in scope.row.attrs"
          :key="index"
          >{{ item }}</el-tag
        >
      </template>
    </el-table-column>

    <el-table-column prop="date" label="状态" width="200">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启 用</el-button>
        <el-button type="info" v-else>禁 用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="primary">编 辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqSpeceDel } from "../../../utils/http";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点了删除按钮
          reqSpeceDel({ id: id }).then((res) => {
            if (res.data.code === 200) {
              //弹弹框
              successAlert(res.data.msg);
              //32.刷新list
              this.reqList()
            }
          });
        })
        .catch(() => {});
    },
    ...mapActions({
      reqList: "specs/reqList",
    }),
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style>
</style>