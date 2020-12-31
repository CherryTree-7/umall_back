<template>
  <el-dialog title="轮播图管理" :visible.sync="info.isshow">
    <el-form :model="user">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="user.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <div>picture</div>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="user.status"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary">添 加</el-button>
      <el-button type="primary">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props:["info"],
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      user: {
          title:"",
          img:[],
          status:1
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
      //点击删除按钮
      cancel(){
          this.info.isshow = false
      }
  },
};
</script>
<style>
</style>