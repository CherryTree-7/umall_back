import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import { errorAlert } from './alert'

//开发环境使用
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"


//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""


//响应拦截
axios.interceptors.response.use(res => {
    // 统一处理失败
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    // 统一处理数组是null的情况
    if (!res.data.list) {
        res.data.list = []
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

// post 带有文件，参数转换
function dataToFormData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}

// 菜单管理
// 菜单添加接口
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//菜单列表接口
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
//删除
export const reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//一条数据
export const reqMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: obj
    })
}
//修改接口
export const reqMenuUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色添加
export const reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}
//角色获取
export const reqRoleInfo = (user) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: user
    })
}
//角色修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色删除
export const reqRoleDel = (user) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(user)
    })
}
//管理员添加
export const reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}
//管理员列表
export const reqManageList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}
//管理员删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(uid)
    })
}
//管理员获取一条数据
export const reqManageInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: uid
    })
}
//管理员修改
export const reqManageEdit = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}


// <-----------------------------商品分类----------------------------------->
//商品添加
export const reqCateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}
//商品分类列表
export const reqCateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: p
    })
}
//商品分类获取（一条）
export const reqCateInfo = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: id
    })
}
//商品规格修改
export const reqCateEdit = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}
//商品分类删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(id)
    })
}
// <-------------------------------商品规格Start----------------------------->
//商品规格添加
export const reqSpecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//商品规格列表
export const reqSpecsList = (user) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: user
    })
}
//商品规格获取（一条）
export const reqSpecsInfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: id
    })
}
//商品规格修改
export const reqSpeceEdit = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method:"post",
        data:qs.stringify(user)
    })
}
//商品规格删除
export const reqSpeceDel = (id) =>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify(id)
    })
}

//总数
export let reqSpecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}

/************商品规格管理 end**************************/