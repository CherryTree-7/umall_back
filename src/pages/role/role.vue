<template>
    <div>
        <el-button type="primary" @click="willAdd">添加</el-button>
        <v-list :list="list" @init="init" @edit="edit" :info="info"></v-list>
        <!-- 父传子--弹框状态 -->
        <v-add :info="info" @init="init" ref="add"></v-add>
    </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/Add'
import { reqRoleList } from '../../utils/http'
export default {
    components:{
        vList,
        vAdd
    },
    data() {
        return {
            // 弹框状态
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
            reqRoleList().then((res)=>{
                if(res.data.code==200){
                    this.list = res.data.list
                }
            })
        },
        edit(id){
            this.info.isshow = true;
            //触发add里面的getone方法
            this.$refs.add.getOne(id)
        }
    },
    mounted() {
        this.init();
    },
}
</script>
<style>
    
</style>