<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="100">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" v-if="scope.row.img!=='null'">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
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
  </div>
</template>
<script>
import { successAlert } from '../../../utils/alert';
import { reqCateDel } from "../../../utils/http";
export default {
  props: ["list"],
  data() {
    return {
      imageUrl: "",
    };
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
          reqCateDel({ id: id }).then(res => {
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
    edit(id){
        this.$emit("edit",id)
    }
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>