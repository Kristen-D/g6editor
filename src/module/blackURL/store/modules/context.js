
import * as types from '../mutation-types'
import common from 'components/js/common.js'
import Vue from 'vue'
const state = {
   menuId: "m09_03",
   menuName: "",
   options: { data:[]},
   roleList: [],
   roleMap: {},
   treeMenu: [],
   idMenu:[],
   getRoleListUrl: "/ssa/blackURL/getListToGrid.do",
   getTreeMenuUrl: "/ssa/authority/roleCfg/getTreeMenu.do",
   editStatus: false,
   params: {},
}


const getters = {

}


const mutations = {
    [types.SET_CONTEXT_TITLE] (state,name) {
        state.menuName = name;
  },
  setRoleList(state,data){
    state.roleList = data;
    state.roleList.forEach(role=>{
      state.roleMap[role.id] = role;
    });
  },
  setTreeMenu(state, data) {
    state.treeMenu = data;
  },
  setCheckedTreeMenu(state, newMenu) {
    state.treeMenu = newMenu;
  },
  changeEditStatus(state, editStatus) {
    state.editStatus = editStatus;
  },
  // changeDetailShow(state, detailShow) {
  //   console.log('==================');
  //   console.log(detailShow);
  //   state.detail = detailShow;
  //
  // },
  changeParams(state, row){
    state.params = row;
  },

}

const actions = {
  async loadRoleList({state, commit}) {
     var data = await common.req(state.getRoleListUrl);
      commit('setRoleList', data);
      return  data;
    },
  async loadTreeMenu({state, commit}) {
    var data = await common.req(state.getTreeMenuUrl);
    let treeMap = common.fmtListToTree(data,"permissionId");
    state.idMenu = treeMap.idTree;
    commit('setTreeMenu', [{name:'全部',permissionId:'-1',children:treeMap.tree}]);
  },
 }


export default {
  state,
  getters,
  actions,
  mutations
}
