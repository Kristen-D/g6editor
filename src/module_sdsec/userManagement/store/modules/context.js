
import * as types from '../mutation-types'
import common from 'components/js/common.js'
const state = {
   menuId:"m09_01",
   menuName:"",
   options:{ data:[]},
   roleList:[],
   roleMap:{},
   orgList:[],
   orgMap:{},
   getRoleListUrl:"/ssa/authority/userCfg/getRoleList.do",
   getOrgListUrl:"/ssa/authority/userCfg/getOrgList.do",
}


const getters = {

}


const mutations = {

    [types.SET_CONTEXT_TITLE] (state,name) {
        state.menuName = name;
  },
  setRoleList(state,data){
    for (let i = 0; i < data.length; i++) {
      if(data[i].id != -1){
        data[i].id += "";
      }
    }
    state.roleList = data;
    state.roleList.forEach(role=>{
      state.roleMap[role.id] = role;
    });
  },
  setOrgList(state,data){
    state.orgList = data;
    // state.orgList.forEach(org=>{
    //   state.orgMap[org.value] = org;
    // });
  }
}

const actions = {
async loadRoleList({state,commit}){
   var data = await common.req(state.getRoleListUrl);
    commit('setRoleList',data);
    return  data;
  },

  async loadOrgList({state,commit}){
     var data = await common.req(state.getOrgListUrl);
      commit('setOrgList',data);
      return  data;
    }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
