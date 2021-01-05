<template>
    <div>
        <el-button type="primary" @click="willAdd">添 加</el-button>
        <v-add ref="add" :info="info" @sx="sx"></v-add>
        <v-list :list="list" @sx="sx" @edit="edit"></v-list>
    </div>
</template>
<script>
import vList from './components/list.vue'
import vAdd from './components/add.vue'
import { reqBannerList } from '../../utils/http'
export default {
    components:{
        vList,
        vAdd
    },
    data() {
        return {
            info:{
                isshow:false,
                isadd:false
            },
            list:[],
        }
    },
    methods: {
        willAdd(){
            this.info.isshow = true
            this.info.isadd = true
        },
        sx(){
            reqBannerList().then((res)=>{
                if(res.data.code==200){
                    this.list = res.data.list
                }
            })
        },
        edit(id){
            this.info.isadd = false
            this.info.isshow = true
            this.$refs.add.getOne(id)
        }
    },
    mounted() {
        this.sx()
    },
}
</script>
<style>
    
</style>