<template>
  <div>
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" placeholder="请选择类型" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>菜单</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>目录</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="100px" v-if="user.type==2">
          <el-select v-model="user.icon" placeholder="请选择图标" >
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url" placeholder="请选择类型">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :value="item.path"
              :label="item.name + '--' + item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
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
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <!-- 第一个input框 -->
  </div>
</template>
<script>
import { indexRouters } from "../../../router";
import { reqMenuAdd, reqMenuDetail ,reqMenuUpdate} from "../../../utils/http";
import {successAlert} from "../../../utils/alert"
export default {
  // 4:接收info
  props: ["info","list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-user-solid",
        "el-icon-s-promotion",
        "el-icon-share",
        "el-icon-s-platform",
        "el-icon-lollipop",
        "el-icon-sunrise-1",
      ],
      indexRouters,
    };
  },
  methods: {
    //user初始值
     empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 6:点击取消
    cancel() {
      if(!this.info.isadd){
        this.empty()
      } 
      this.info.isshow = false;
      // this.empty()
    },
    add() {
      reqMenuAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          // 成功以后弹框消失
          this.cancel();
          // 成功以后表单恢复初始样式
          this.empty();
          //加载成功以后重新刷新页面
          this.$emit("init")
        }
      });
    },
    changePid(){
      if(this.user.pid==0){
        this.user.type=1
      }else{
        this.user.type=2
      }
    },
    //点击编辑
    getOne(id){
      reqMenuDetail({id:id}).then((res=>{
        if(res.data.code==200){
          res.data.list.id = id
          this.info.isshow = true
           
          this.user = res.data.list
          console.log(this.user);
        }
      }))
    },
    update() {
      reqMenuUpdate(this.user).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.cancel()
          this.empty()
          this.$emit("init")
        }
      })
    },
  }
};
</script>
<style>
</style>