<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="编号" width="100"> </el-table-column>
    <el-table-column prop="name" label="轮播图标题" width="180"> </el-table-column>
    <el-table-column prop="address" label="图片"> </el-table-column>
    <el-table-column prop="address" label="状态">
         <el-button type="primary">启 用</el-button>
         <el-button type="info">禁 用</el-button>
    </el-table-column>
    <el-table-column prop="address" label="操作">
         <el-button type="primary">编 辑</el-button>
         <el-button type="danger">删 除</el-button>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        }
      ],
    };
  },
};
</script>
<style>
</style>