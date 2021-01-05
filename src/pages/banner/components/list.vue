<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="编号" width="100"> </el-table-column>
    <el-table-column prop="title" label="轮播图标题" width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img :src="$pre + scope.row.img" alt="#" />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启 用</el-button>
        <el-button type="info" v-else>禁 用</el-button>
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
import { successAlert } from '../../../utils/alert';
import {reqBannerDel} from '../../../utils/http'
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
       this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点了删除按钮
          reqBannerDel({ id: id }).then(res => {
            if(res.data.code===200){
              //弹弹框
              successAlert(res.data.msg)
              //32.刷新list
              this.$emit("sx")
            }
          });
        })
        .catch(() => {});
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>