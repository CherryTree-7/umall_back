<template>
    <div>
        <el-button type="primary" @click="willAdd">添加</el-button>
        <v-add ref="add" :info="info" @init="getList"></v-add>
        <v-list :list="list" @init="getList" @edit="edit" :info="info"></v-list>
    </div>
</template>
<script>
import vAdd from './components/add.vue'
import vList from './components/list.vue'
import {reqManageList} from '../../utils/http'
export default {
    components:{
        vAdd,
        vList
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
        //刷新页面
        getList(){
            reqManageList({size:50,page:1}).then((res)=>{
                if(res.data.code==200){
                    this.list = res.data.list
                }
            })
        },
        edit(uid){
            this.info.isshow = true,
            this.info.isadd = false,
            this.$refs.add.getOne(uid)
        }
    },
    mounted() {
       this.getList()
    }, 
}
</script>
<style>
    
</style>