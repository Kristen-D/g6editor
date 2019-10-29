import common from 'components/js/common.js'
// initial state
// shape: [{ id, quantity }]
const state = {
  orderType:{ascending:"asc",   descending:"desc"},
}

// getters
const getters = {

}


// actions
const actions = {
async  loadTableData({commit,state},[id,params,url]){
    state[id].loading = 'load';
    if(!params)params = state[id].params;
    if(!url)url = state[id].tableUrl;
    params.pageSize = state[id].pageSize;
    params.pageIndex = state[id].pageIndex;
    var data = await common.reqBackState(url,params);
    // state[id].editRowIndex = -1;
    // gridData.rowData.forEach(row=>{
    //   row.edit = false;
    //   row.create = false;
    // })
    commit('setTableAfterLoad',[id,data]);
    return data.gridData;
  },
async  reloadTable({dispatch,state},id){
    var data = await  dispatch('loadTableData',[id]);
    state[id].pageIndex = 1;
    return data;

 },
async handleCurrentChange({dispatch,state},[id,pageIndex]){
   state[id].pageIndex = pageIndex;
   return await dispatch('loadTableData',[id]);
 },
 async handleDelete({commit,state,dispatch},[context,i,row]){
   var id = context.id
     context.$confirm('此操作将删除该行, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(async() => {
        var msg = await common.req(state[id].delUrl, row, context);
        state[id].tableData.splice(i, 1);
        context .$message({ type: 'success',   message: msg });
     })
 },
async saveEdit({commit,state,dispatch},[context,i,row]){
   var id = context.id;
   var msg = await common.req(state[id].saveUrl,row);
   await dispatch('reloadTable',id);
   context.$message({ type: 'success',   message: msg });
   return  msg;
 },
 async handleEdit({commit,state,dispatch},[id,i,row]){
     var tableData = state[id].tableData;
     var editRowIndex = state[id].editRowIndex;
     if(editRowIndex!=-1){
       commit('cancelEdit', id);
     }

     state[id].editRowIndex = i;
     state[id].editRowTemp =  {...row};
     row.edit = true;
     state[id].tableData =  tableData.concat();
 },
 async addRow({commit,state,dispatch},[id,newRow]){
   newRow.create = true;
   newRow.edit = true;
   commit('cancelEdit',id);
   state[id].tableData.push(newRow);
   state[id].editRowIndex = state[id].tableData.length-1;
 },
 async handleSortChange({commit,state,dispatch},[id,val]){
     var params = state[id].params;
     params.sort = val.order;
     params.sort_key = val.prop;
    if(val.order!=null){
      params.sort = state.orderType[val.order];
    }
    await dispatch('reloadTable',id);
 }



}

// mutations
const mutations = {
  registerConf(state,[id,conf]){
    state[id] = conf;
  },
  setTableAfterLoad(state,[id, result]){
    if(result.state){
      var gridData = result.data;
      state[id].tableData = gridData.rowData;
      state[id].loading = 'loaded';
      state[id].total = gridData.total;
    }else {
      state[id].loading = 'wrong';
    }

  },
  cancelEdit(state,id){
    var i = state[id].editRowIndex;
     if(i==-1)return;
    var tableData = state[id].tableData;
    var row = tableData[i];
    if(row.create){
        tableData.pop();
    }else{
      row.edit = false;
      row.create = false;
    }
    state[id].editRowIndex=-1;
    state[id].tableData =  tableData.concat();
  },

  setParams(state,[id,params]){
    for (var p in params) {
        state[id].params[p] = params[p];
    }

  },
  handleSelectionChange(state,[id,selectedRow]){
    state[id].multipleSelection = selectedRow;
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
