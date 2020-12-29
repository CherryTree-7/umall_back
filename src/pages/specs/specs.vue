<template>
    <div>
        <el-button type="primary" @click="willAdd">添 加</el-button>
        <v-list></v-list>
        <v-add :info="info"></v-add>
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
        }
    },
    
}
</script>
<style>
    
</style>