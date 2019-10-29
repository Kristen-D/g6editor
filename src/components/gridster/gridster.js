import commonAjax from 'components/js/common.js'
const state = {
  gridSeq: 0,
  gridData: [],
  gridRef: {},
  gridCustomMethods: {},
  gridMark: "newgrid_",
  drillDialog: {
    dialogTitle: '',
    dialogVisible: false,
    dataInfo: [],
    dialogTableShow: '',
    dialogSize: 'small',
    tableData: [],
    params :{},
    pageIndex:1,
    pageSize:5,
    total:null
  },
  flag: false,
  drillDataUrl: {
    "threat": "/ssa/home/getThreatDetail.do",
    "product": "/ssa/home/getProductDetail.do",
    "event": "/ssa/home/getEventDetail.do",
    "chinaMap": "/ssa/home/getDetailTrend.do",
    "top5": "/ssa/home/getDetailTrend.do",
    "assetsInfo": "/ssa/home/getAssetByProductType.do"
  }
}

const getters = {
  getSeq(state) {
    return state.gridMark + state.gridSeq;
  }
}


// actions
const actions = {
  addGrid({
    commit,
    state,
    dispatch,
    getters
  }, cp) {
    commit("nextSeq");
    let id = getters.getSeq;
    cp.i = id;
    state.gridData.push(cp);
  },
  changeGrid({
    commit,
    state,
    dispatch,
    getters
  }, [g, context]) {
    commit("delGrid", g);
    context.$nextTick(() => {
      state.gridData.push(g);
    })

  },


  async drillData({commit,state,dispatch,getters}, params) {
    if(state.flag) {
      return;
    }
    state.flag = true;
    await dispatch("getDrillData",params);
    state.drillDialog.dialogVisible = true;

  },
  async getDrillData({commit,state,dispatch,getters}, params){
    state.drillDialog.dialogTitle = params.name;
    state.drillDialog.params = params;
    if (params.chartName === "assetsInfo") {
      var param = {};
      param.product_type = params.productType;
      // console.log(param.product_type);
      param.pageSize =  state.drillDialog.pageSize;
      param.pageIndex = state.drillDialog.pageIndex;
      let result = await commonAjax.req(state.drillDataUrl.assetsInfo, param, this);
      state.drillDialog.dialogTitle = "设备信息";
      // state.drillDialog.dialogSize = 'large';
      state.drillDialog.tableData = result.rowData;
      state.drillDialog.total =result.total;
      state.drillDialog.dialogTableShow = 2;

    } else if (params.chartName === "chinaMap") {
      if (params.componentType == "series") {
        if (params.seriesType == "bar") {
          var param = {};
          param.pageSize =  state.drillDialog.pageSize;
          param.pageIndex = state.drillDialog.pageIndex;
          param.eventThreatTypes = params.data.eventThreatType;
          param.areaId = params.data.areaId;
          param.areaCode = params.data.areaCode;
          let result = await commonAjax.req(state.drillDataUrl.chinaMap, param, this);
          // state.drillDialog.dialogSize = 'small';
          state.drillDialog.dialogTableShow = 1;
          state.drillDialog.tableData = result.rowData;
          state.drillDialog.total =result.total;

        } else if (params.seriesType == "effectScatter") {
          var param = {};
          param.pageSize =  state.drillDialog.pageSize;
          param.pageIndex = state.drillDialog.pageIndex;
          param.areaId = params.data.areaId;
          param.areaCode = params.data.areaCode;
          param.eventThreatTypes = params.eventThreatTypes.join(",");
          let result = await commonAjax.req(state.drillDataUrl.chinaMap, param, this);
          // state.drillDialog.dialogSize = 'small';
          state.drillDialog.dialogTableShow = 1;
          state.drillDialog.tableData = result.rowData;
          state.drillDialog.total =result.total;

        }
      } else if (params.componentType == "geo") {
        //点击到地图不做展示
        return;
      }
    } else if (params.chartName === "customMap") {
      let pieData = params.data;
      pieData.pageSize =  state.drillDialog.pageSize;
      pieData.pageIndex = state.drillDialog.pageIndex;
      if (pieData.countType === 'threat') {
        let data = await commonAjax.req(state.drillDataUrl.threat, pieData, this);
        // state.drillDialog.dialogSize = 'small';
        state.drillDialog.dialogTableShow = 1;
        state.drillDialog.tableData = data.rowData;
        state.drillDialog.total =data.total;
      } else if (pieData.countType === 'product') {
        let data = await commonAjax.req(state.drillDataUrl.product, pieData, this);
        // state.drillDialog.dialogSize = 'small';
        state.drillDialog.dialogTableShow = 1;
        state.drillDialog.tableData = data.rowData;
        state.drillDialog.total =data.total;
      } else {
        let data = await commonAjax.req(state.drillDataUrl.event, pieData, this);
        // state.drillDialog.dialogSize = 'large';
        state.drillDialog.dialogTableShow = 1;
        state.drillDialog.tableData = data.rowData;
        state.drillDialog.total =data.total;
      }

    } else if (params.chartName === "top5") {
      state.drillDialog.dialogTitle = "详细信息";
      params.pageSize =  state.drillDialog.pageSize;
      params.pageIndex = state.drillDialog.pageIndex;
     var result = await commonAjax.req(state.drillDataUrl.top5, params, this);
    //  state.drillDialog.dialogSize = 'small';
     state.drillDialog.dialogTableShow = 1;
     state.drillDialog.tableData = result.rowData;
     state.drillDialog.total = result.total;
    }

  }
}

// mutations
const mutations = {
  initParam(state){
    state.drillDialog.pageIndex = 1;
    state.flag = false;
  },
  saveGirdConf(state) {
    let gridData = state.gridData;
    gridData.forEach((d) => {
      let ref = state.gridRef[d.i];
      if (ref._data.params) d.params = JSON.stringify(ref._data.params);
    })
  },
  handleCustomMethods(state, [gird, m]) {
    let ref = state.gridRef[gird.i];
    ref.customMethod(m);
  },
  addCustomMethods(state, [id, ms]) {
    let gridCustomMethods = state.gridCustomMethods
    gridCustomMethods[id] = ms;
    state.gridCustomMethods = { ...gridCustomMethods
    };
  },
  setRef(state, ref) {
    var gid = ref.data.id;
    state.data.forEach(d => {
      if (d.id == gid) {
        d.ref = ref;
      }
    })
  },
  nextSeq(state) {
    state.gridSeq++;
  },
  reloadData(state, context) {
    state.gridData = state.gridData.concat();

  },
  setGridData(state, data) {
    state.gridData = data;
  },
  delGrid(state, gdata) {
    var g = state.gridData;
    g.forEach((d, i) => {
      if (d.i == gdata.i) {
        g.splice(i, 1);
      }
    })
  },
  addGridRef(state, [id, ref]) {
    state.gridRef[id] = ref
  },
  rmRef(state, id) {
    delete state.gridRef[id];
  },

  resetGrid(state, id) {
    state.gridData.forEach(d => {
      var ref = state.gridRef[d.i]
      if (d.i == id && ref && ref.resize) {
        ref.resize();
      }
    })
  },

  resetAllGrid(state) {
    for (var id in state.gridRef) {
      var ref = state.gridRef[id] 
      if (ref && ref.resize) {
        ref.resize();
      }
    }

  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
