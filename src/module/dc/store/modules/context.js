import common from 'components/js/common.js'
const state = {
  drillDialog: {
    dialogTitle: '',
    dialogVisible: false,
    dataInfo: [],
    chartType: '',
    dialogSize: 'small',
    tableData: [],
    params :{product_type:"",chartType:"",old_total:"",msg_time:"",pageIndex:"",pageSize:""},
    pageIndex:1,
    pageSize:5,
    total:null
  },
  assetInfoUrl:"/ssa/assetMgmt/queryAssetInfo.do",
  dataPickUrl:"/ssa/dataCenter/getTotalDataListByDetail.do"

}


const getters = {

}


const mutations = {

}

const actions = {
async  getDrillData({commit,state}){

state.drillDialog.params.pageIndex=state.drillDialog.pageIndex;
state.drillDialog.params.pageSize=state.drillDialog.pageSize;
    let result;
   if(state.drillDialog.params.chartType == 'assetInfo'){
     state.drillDialog.chartType = 'assetInfo';
     state.drillDialog.dialogTitle ="设备详细信息";
     result = await common.req(state.assetInfoUrl, state.drillDialog.params, this);
   }else if(state.drillDialog.params.chartType == 'dataPick'){

     state.drillDialog.chartType = 'dataPick';
     state.drillDialog.dialogTitle ="日志详细信息";
     result = await common.req(state.dataPickUrl, state.drillDialog.params, this);
   }else if(state.drillDialog.params.chartType =='dataFlow'){
     state.drillDialog.chartType = 'dataFlow';
     state.drillDialog.dialogTitle ="日志详细信息";
     result = await common.req(state.dataPickUrl, state.drillDialog.params, this);
   }

  //  console.log(result);
     state.drillDialog.tableData = result.rowData;
     state.drillDialog.total = result.total;
     state.drillDialog.dialogVisible = true;
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
