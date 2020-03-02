import common from 'components/js/common.js'
const state = {
  drillData: {
    title: '',
    dialogTableVisible: false,
    params: {},
    tableData: [],
    total: 0,
    pageIndex: 1,
    pageSize: 5,
    totalColumns: [],
    columnList: [],
    customColumnList: []
  },
  parameters: {
  },
  drillUrl: '/ssa/netattack_gdnx/queryAlarmInfoDetail.do',
  getColUrl: '/ssa/customColumn/getDrillCols.do'
}


const getters = {

}


const mutations = {
  openDrillDialogTable(state, params) {
    state.drillData.pageIndex = 1;
    state.parameters = {...params};
    state.drillData.dialogTableVisible = true;
  },

  setDrillDataAfterLoad(state, gridData) {
    state.drillData.tableData = gridData.rowData;
    state.drillData.total = gridData.total;
  }
}

const actions = {
  async  loadDrillTableData({commit,state}){
      state.parameters.pageIndex = state.drillData.pageIndex;
      state.parameters.pageSize = state.drillData.pageSize;
      state.parameters.title = state.drillData.title;
      let gridData = await common.req(state.drillUrl, state.parameters);
      commit('setDrillDataAfterLoad', gridData);
    },

  async listCurrentChange({dispatch,state}, [id, pageIndex] ){
     state.drillData.pageIndex = pageIndex;
     await dispatch('loadDrillTableData');
   },

  async getDrillColumns({dispatch, state}, [context, title]) {
    state.drillData.title = title;
    let columns = await common.req(state.getColUrl, state.parameters);
    state.drillData.totalColumns = columns.totalColumns;
    state.drillData.queryName = columns.conditions;
    let list = [];
    if (columns.customColumns) {
      list = columns.customColumns;
    } else {
      list = columns.defaultColumns;
    }
    state.drillData.customColumnList = list;
    let obj = new Object();
    if (list.length > 0) {
      list.forEach((c) => {
        let arra  = c.split(':');
        let descriptor = Object.create({ value: null, writable: true, enumerable: true, configurable: true });
        descriptor.value = arra[1];
        Object.defineProperty(obj, arra[0], descriptor);
      });
      state.drillData.columnList = obj;
      // let ob = "{";
      // for (let x in list) {
      //   ob = ob + list[x] + ",";
      // }
      // console.log(ob);
      // let nob = ob.substring(0, ob.length - 1) + "}";
      // console.log(nob);
      // state.drillData.columnList = JSON.parse(nob);
      if(state.drillData.queryDisplayFlag) {
        dispatch('loadSelections');
      }
    }
  },

  async loadSelections({state}) {
    let data = await common.req('/ssa/customColumn/getSecurityEventSelections.do');
    state.drillData.SecurityEventTypes = data.SecurityEventType;
    state.drillData.ProductTypes = data.ProductType;
  },

  async queryByConditions({dispatch, state}, params) {
    dispatch('loadDrillTableData');
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
