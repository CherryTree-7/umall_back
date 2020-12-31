import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {actions} from './actions'
import {state,getters,mutations} from './mutations'
import specs from './modules/specs.js'
import cate from './modules/cate.js'
import member from './modules/member.js'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        specs,
        cate,
        member
    },
    
})