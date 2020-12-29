<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { reqMenuList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //   弹框状态
      info: {
        isshow: false,
        //判断是添加还是编辑
        isadd:true
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true
    },
    init() {
      reqMenuList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
          
        }
      });
    },
    edit(id){
      this.$refs.add.getOne(id)
      this.info.isadd = false
    }
  },
  mounted() {
      this.init()
  },
};
</script>
<style>
</style>