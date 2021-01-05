import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import { errorAlert } from './alert'

import store from "../store"

import router from "../router"

//开发环境使用
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"


//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""

//请求拦截:设置请求头
axios.interceptors.request.use(config=>{
    if(config.url!==baseUrl+"/api/userlogin"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})


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
    //掉线处理
    if(res.data.msg==="登录已过期或访问权限受限"){
        //清除用户登录的信息 userInfo
        store.dispatch("changeUser",{})
        //跳到登录页面
        router.push("/login")
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
//登录请求
export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
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
        method: "post",
        data: qs.stringify(user)
    })
}
//商品规格删除
export const reqSpeceDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(id)
    })
}

//总数
export let reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

/************商品规格管理 end**************************/
/**********************会员管理Start**************************/
// 会员列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}
// 会员获取一条
export const reqMemberInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: uid
    })
}
//会员修改
export const reqMemberEdit = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//<-------------------------------banner轮播图管理 Start------------------------------------>
//banner添加
export const reqBannerAdd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })
}
//banner列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
    })
}
//banner轮播图获取（一条）
export const reqBannerInfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: id
    })
}
//轮播图修改
export const reqBannerEdit = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}
//轮播图删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(id)
    })
}
//<-------------------------------banner轮播图管理 End-------------------------------------->
// <---------------------------------商品管理Start-------------------------------------->
//商品添加
export const reqGoodsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}
//商品列表
export const reqGoodsList = (obj) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: obj
    })
}
//商品获取(一条)
export const reqGoodsInfo = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: id
    })
}
//商品修改
export const reqGoodsEdit = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}
//商品删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(id)
    })
}
// <---------------------------------商品管理End---------------------------------------->
//<---------------------------------秒杀活动Start---------------------------------------->
// 限时秒杀添加
export const reqSeckAdd = (user) =>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(user)
    })
}
// 限时秒杀列表
export const reqSeckList = () =>{
    return axios({
        url:baseUrl+"/api/secklist",
        method:"get"
    })
}
// 限时秒杀获取（一条）
export const reqSeckInfo = (id) =>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        method:"get",
        params:id
    })
}
// 限时秒杀修改
export const reqSeckEdit = (user) =>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(user)
    })
}
// 限时秒杀删除
export const reqSeckDel = (id) =>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify(id)
    })
}
//<-----------------------------------秒杀活动End---------------------------------------->