
import * as types from '../mutation-types'
import common from 'components/js/common.js'
import Vue from 'vue'
const state = {
   treeMenu: [],
   idMenu:[],
   getTreeMenuUrl: "/ssa/tenant/getMenus.do",
   editStatus: false
}


const getters = {

}


const mutations = {
  setTreeMenu(state, data) {
    state.treeMenu = data;
  },
  changeEditStatus(state, editStatus) {
    state.editStatus = editStatus;
  },
}

const actions = {
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
