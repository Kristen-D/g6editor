import * as types from '../mutation-types'
import common from 'components/js/common.js'
const state = {
   menuId: "m09_03",
   menuName: "",
   options: { data:[]},
   roleList: [],
   roleMap: {},
   treeMenu: [],
   idMenu:[],
   getRoleListUrl: "/ssa/authority/roleCfg/getRoleList.do",
   getTreeMenuUrl: "/ssa/authority/roleCfg/getTreeMenu.do",
   getOperateFlag: "/ssa/siteAsset/getUserRole.do",
   editStatus: false,
   params: {},
   operateFlag: ''
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
  setOperateFlag(state, flag){
    state.operateFlag = flag;
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
    let treeMap = common.fmtListToTree(data,"permission_id");
    state.idMenu = treeMap.idTree;
    commit('setTreeMenu', [{name:'全部',permission_id:'-1',children:treeMap.tree}]);
  },
  async getOperateFlag({state, commit}) {
    let result = await common.reqBackState(state.getOperateFlag);
    commit('setOperateFlag', result.state);
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
