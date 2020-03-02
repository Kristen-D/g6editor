import chartAjax from '../../api/ajax.js'
import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'

// let resizeEvent = document.createEvent('HTMLEvents');
// resizeEvent.initEvent('resize', true, true);
// window.dispatchEvent(resizeEvent);

const state = {
  menuId: "m04",
  menuName: "",
  params: {event_type: null, dateRange:'month'},
  qryTableName1: "",
  qryTableName2: "",
  test: "",
  eventTypeList: {},
  eventTypeListUrl: "/ssa/netAttack/getEventTypeList.do",
  ProductTypeList: [],
  ProductTypeListUrl: "/ssa/netAttack/getProductTypeList.do",
  EventThreatList: {},
  EventThreatListUrl: "/ssa/netAttack/getEventThreatList.do",
  EventGradeList: [],
  EventGradeListUrl: "/ssa/netAttack/getEventGradeList.do",
  EventRiskList: {},
  EventRiskListUrl: "/ssa/netAttack/getEventRiskList.do",
  DeviceTypeList: {},
  DeviceTypeListUrl: "/ssa/netAttack/getDeviceTypeList.do",
  orgList: [],
  orgListUrl: "/ssa/situationAnaly/geOrgList.do",
  scorelist: [],
  scorelistUrl: "/ssa/situationAnaly/getScoreList.do",
  totalScore: ""
};

const mutations = {
  [types.SET_CONTEXT_TITLE](state, name) {
    state.menuName = name;
  },
  INIT_MAP(state, data) {
    // state.topData = data.topData;
    state.mapData = data.mapData;
    //state.zichanData = data.zichanData;
  },

  setContextParams(state, dateTime) {
    state.params.startTime = commonAjax.formatDate(dateTime[0], "yyyy-MM-dd");
    state.params.endTime = commonAjax.formatDate(dateTime[1], "yyyy-MM-dd");
  },
  setListTypeList(state, [data, data2, data3, data4, data5, data6, data7]) {

    state.eventTypeList = data;
    state.ProductTypeList = data2;
    state.EventThreatList = data3;
    state.EventGradeList = data4;
    state.EventRiskList = data5;
    state.orgList = data6;

    // state.scorelist=data7.scorelist;
    // state.totalScore=data7.totalScore;
  },
  [types.EVENT_TYPE_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.eventTypeList[data[i].id] = data[i].text;
    }
  },
  [types.PRODUCT_TYPE_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.productTypeList[data[i].id] = data[i].text;
    }
  },
  [types.EVENT_THREAT_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.EventThreatList[data[i].id] = data[i].text;
    }
  },
  [types.EVENT_GRADE_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.EventGradeList[data[i].id] = data[i].text;
    }
  },
  [types.EVENT_RISK_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.EventRiskList[data[i].id] = data[i].text;
    }
  },
  [types.DEVICE_TYPE_LIST](state, data) {
    for (let i = 0; i < data.length; i++) {
      state.DeviceTypeList[data[i].id] = data[i].text;
    }
  }
};

const actions = {
  getChartInitData({commit}) {
    return new Promise((resolve, reject) => {
      chartAjax.getChartInitData(data => {
        commit('INIT_MAP', data);
        resolve(data);
      })
    })
  },
  updateContextParams({commit, state}, dateTime) {
    commit('setContextParams', dateTime);
    state.params = {...state.params};
  },
  async loadListTypeList({state, commit}) {
    var data = await commonAjax.req(state.eventTypeListUrl);
    var data2 = await commonAjax.req(state.ProductTypeListUrl);
    var data3 = await commonAjax.req(state.EventThreatListUrl);
    var data4 = await commonAjax.req(state.EventGradeListUrl);
    var data5 = await commonAjax.req(state.EventRiskListUrl);
    var data6 = await commonAjax.req(state.orgListUrl);
    var data7 = await commonAjax.req(state.scorelistUrl);
    commit('setListTypeList', [data, data2, data3, data4, data5, data6, data7]);
    return data;
  },
  [types.EVENT_TYPE_LIST]({commit}) {
    return commonAjax.req(state.eventTypeListUrl).then(data => {
      commit(types.EVENT_TYPE_LIST, data);
    });
  },
  [types.PRODUCT_TYPE_LIST]({commit}) {
    return commonAjax.req(state.productTypeListUrl).then(data => {
      commit(types.PRODUCT_TYPE_LIST, data);
    });
  },
  [types.EVENT_THREAT_LIST]({commit}) {
    return commonAjax.req(state.EventThreatListUrl).then(data => {
      commit(types.EVENT_THREAT_LIST, data);
    });
  },
  [types.EVENT_GRADE_LIST]({commit}) {
    return commonAjax.req(state.EventGradeListUrl).then(data => {
      commit(types.EVENT_GRADE_LIST, data);
    });
  },
  [types.EVENT_RISK_LIST]({commit}) {
    return commonAjax.req(state.EventRiskListUrl).then(data => {
      commit(types.EVENT_RISK_LIST, data);
    });
  },
  [types.DEVICE_TYPE_LIST]({commit}) {
    return commonAjax.req(state.DeviceTypeListUrl).then(data => {
      commit(types.DEVICE_TYPE_LIST, data);
    });
  }
};


export default {
  state,
  actions,
  mutations
}
