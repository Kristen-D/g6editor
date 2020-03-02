import common from  'components/js/common.js'
import * as types from '../mutation-types'

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

const actions={
  //原日志方法
  async  loadRoleList({state,commit}){
    // var data = await common.req(state.getRoleListUrl);
    var data = await common.reqObjBackState(state.getRoleListUrl);
    commit('setRoleList',data);
    return  data;
  },
  async   loadOrgList({state,commit}){
    // var data = await common.req(state.getOrgListUrl);
    var data = await common.reqObjBackState(state.getOrgListUrl);
    commit('setOrgList',data);
    return  data;
  },
  async  loadSysLogTable({commit,state},[id,params,url]){
    state[id].loading = true;
    if(!params)params = state[id].params;
    if(!url)url = state[id].tableUrl;
    params.pageSize =   state[id].pageSize;
    params.pageIndex =   state[id].pageIndex;
    var gridData = await common.req(url,params);
    // var gridData = await common.reqObjBackState(url,params,id);
    state[id].editRowIndex = -1;
    // gridData.rowData.forEach(row=>{
    //   row.edit = false;
    //   row.create = false;
    // })
    commit('setTableAfterLoad',[id,gridData]);
    console.log('gridData.data',gridData.rowData)
    return gridData;
  },
  // async  reloadTable({dispatch,state},id){
  //   state[id].pageIndex = 1;
  //   var data = await  dispatch('loadTableData',[id]);
  //   return data;
  //
  // },
//


  // async loadSysLogTable({commit,state},[id,params,url]){
  //   if (!params) params = state[id].params;
  //   if (!url) url = state[id].tableUrl;
  //   params.pageSize = state[id].pageSize;
  //   params.pageIndex = state[id].pageIndex;
  //   // var data = await common.req(url, params);
  //   var data = await common.reqObjBackState(url, params,id);
  //   // console.log(data);
  //   commit('setTableAfterLoad', [id, data]);
  //   state[id].load = false;
  //   return data;
  // },
  async reloadTable({dispatch,state},id) {
    state[id].pageIndex = 1;
    state[id].pageSize = 10;
    var data = await dispatch('loadSysLogTable', [id]);
    return data;
  },
  async handleCurrentChange({dispatch,state},[id,pageIndex]){
    state[id].pageIndex = pageIndex;
    return await dispatch('loadSysLogTable',[id]);
  },

  async handleSizeChange({dispatch,state},[id,pageSize]){
    state[id].pageSize = pageSize;
    return await  dispatch('loadSysLogTable',[id]);
  },



}

const mutations={
  //原日志写法
  [types.SET_CONTEXT_TITLE] (state,name) {
    state.menuName = name;
  },
  setRoleList(state,data){
    // state.roleList = data;
    state.roleList = data.data;
    state.roleList.forEach(role=>{
      state.roleMap[role.id] = role;
    });
  },
  setOrgList(state,data){
    // state.orgList = data;
    state.orgList = data.data;
    state.orgList.forEach(org=>{
      state.orgMap[org.id] = org;
    });
  },
//


  setParams(state,[id,params]) {
    for(var p in params){
      state[id].params[p] = params[p];
    }
  },
  setTableAfterLoad(state, [id, data]){
    // state[id].tableData = data.data;
    state[id].tableData = data.rowData;
    state[id].loading = false;
    state[id].total = data.total;
  },
  registerConf(state, [id, conf]) {
    state[id] = conf;
  },
  handleSelectionChange(state,[id,selectedRow]){
    state[id].multipleSelection = selectedRow;
  },


};

export default {
  state,
  getters,
  actions,
  mutations
}



