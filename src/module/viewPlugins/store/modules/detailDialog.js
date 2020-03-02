import common from 'components/js/common.js'
import {DATA_CENTER_GET_DETAIL_DATA} from '../mutation-types';

const assetInfoUrl = "/ssa/assetMgmt/queryAssetInfo.do";
const dataPickUrl = "/ssa/dataCenter/getTotalDataListByDetail.do";
const state = {
  dialogTitle: '',
  dialogVisible: false,
  dataInfo: [],
  chartType: '',
  dialogSize: 'small',
  tableData: [],
  pageIndex: 1,
  pageSize: 5,
  total: null
};

const actions = {
  async [DATA_CENTER_GET_DETAIL_DATA]({commit, state}, params) {
    let result;
    if (params.chartType === 'assetInfo') {
      result = await common.req(assetInfoUrl, params, this);
    } else if (params.chartType === 'dataPick' ||
      params.chartType === 'dataFlow') {
      result = await common.req(dataPickUrl, params, this);
    }
    commit(DATA_CENTER_GET_DETAIL_DATA, {result, params});
  }
};

const mutations = {
  [DATA_CENTER_GET_DETAIL_DATA](state, {result, params}) {
    state.pageIndex = params.pageIndex;
    state.chartType = params.chartType;
    params.pageSize &&  (state.pageSize = params.pageSize);
    params.dialogTitle && (state.dialogTitle = params.dialogTitle);
    state.tableData = result.rowData;
    state.total = result.total;
    state.dialogVisible = true;
  }
};

export default {
  state,
  actions,
  mutations
}
