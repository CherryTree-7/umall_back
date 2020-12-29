import Vue from 'vue'
let vm = new Vue()

// 成功的弹框
export let successAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
      });
}
//错误的弹框
export let errorAlert = (msg) =>{
    vm.$message.error(msg);
}