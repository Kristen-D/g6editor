import common from 'components/js/common.js'
const state = {
  assetInfo:{
    tableData:[],
    productType:"",
    pageSize:5,
    pageIndex:1,
    total:0
  },


  drillDialog: {
    dialogTitle: '',
    dialogVisible: false,
    dataInfo: [],
    chartType: '',
    dialogSize: 'small',
    tableData: [],
    params :{},
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
async  getDrillData({commit,state}, params){

   params.pageSize =  state.drillDialog.pageSize;
   params.pageIndex = state.drillDialog.pageIndex;
    let result;
   if(params.chartType == 'assetInfo'){
     state.drillDialog.chartType = 'assetInfo';
     state.drillDialog.dialogTitle ="设备详细信息";
     result = await common.req(state.assetInfoUrl, params, this);
   }else if(params.chartType == 'dataPick'){

     state.drillDialog.chartType = 'dataPick';
     state.drillDialog.dialogTitle ="日志详细信息";
     result = await common.req(state.dataPickUrl, params, this);
   }else if(params.chartType =='dataFlow'){
     state.drillDialog.chartType = 'dataFlow';
     state.drillDialog.dialogTitle ="日志详细信息";
     result = await common.req(state.dataPickUrl, params, this);
   }

   
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
