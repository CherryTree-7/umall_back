<template>
    <div>
        <el-button type="primary" @click="willAdd">添 加</el-button>
        <v-add :info="info" ref="add"></v-add>
        <v-list @edit="edit"></v-list>
    </div>
</template>
<script>
import vList from './components/list.vue'
import vAdd from './components/add.vue'
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
            }
        }
    },
    methods: {
        willAdd(){
            this.info.isshow = true
            this.info.isadd = true
        },
        edit(id){
            this.info.isshow = true
            this.info.isadd = false
            this.$refs.add.getOne(id)
        }
    },
}
</script>
<style>
    
</style>