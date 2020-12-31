<template>
    <div>
        <v-list :info="info" @edit="edit"></v-list>
        <v-edit :info="info" ref="edit"></v-edit>
    </div>
</template>
<script>
import vList from './components/list.vue'
import vEdit from './components/edit.vue'
export default {
    components:{
        vList,
        vEdit
    },
    data() {
        return {
            info:{
                isshow:false
            }
        }
    },
    methods: {
        edit(uid){
            this.$refs.edit.getOne(uid)
        }
    },
}
</script>
<style>
    
</style>