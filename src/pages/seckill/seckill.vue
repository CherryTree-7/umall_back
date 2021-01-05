<template>
  <div>
    <el-button type="primary" @click="willAdd">添 加</el-button>
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <v-add :info="info" @init="init" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { reqSeckList } from '../../utils/http';
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
      return {
          info:{
              isshow:false,
              isadd:false
          },
          list:[]
      }
  },
  methods: {
      willAdd(){
          this.info.isshow = true
          this.info.isadd = true
      },
      init(){
        reqSeckList().then((res)=>{
          if(res.data.code == 200){
            this.list = res.data.list
          }
        })
      },
      edit(id){
        this.info.isshow = true,
        this.info.isadd = false
        this.$refs.add.getOne(id)
      }
  },
  mounted() {
    this.init()
  },
};
</script>
<style>
</style>