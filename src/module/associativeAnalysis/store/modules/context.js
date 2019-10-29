import * as types from '../mutation-types'
import common from 'components/js/common.js'
const state = {
  params: {
    event_type: null
  },
  //solr详情数据
  detailDialog:{
    visible:false,
    detailData:{}
  },




  eventTypeList: [],
  eventTypeListUrl: "/ssa/netAttack/getEventTypeList.do",
  ProductTypeList: [],
  ProductTypeListUrl: "/ssa/netAttack/getProductTypeList.do",
  EventThreatList: [],
  EventThreatListUrl: "/ssa/netAttack/getEventThreatList.do",
  EventGradeList: [],
  EventGradeListUrl: "/ssa/netAttack/getEventGradeList.do",
  EventRiskList: [],
  EventRiskListUrl: "/ssa/netAttack/getEventRiskList.do",
  DeviceTypeList: [],
  DeviceTypeListUrl: "/ssa/netAttack/getDeviceTypeList.do"
}


const getters = {

}


const mutations = {

  setListNewTypeList(state, [data, data2, data3, data4, data5, data6]) {
    state.eventTypeList = data;
    state.ProductTypeList = data2;
    state.EventThreatList = data3;
    state.EventGradeList = data4;
    state.EventRiskList = data5;
    state.DeviceTypeList = data6;

  }

}

const actions = {
  async getAlarmHandleInfoById({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/alarmInfoList/getAlarmHandleInfoById.do", params, this);
    return result;
  },
  async getEventClDetail({
    commit,
    state
  }, [params]) {
    var result = await common.req("/ssa/alarmInfoList/getEventClDetail.do", params, this);
    return result;
  },

  async loadListNewTypeList({
    state,
    commit
  }) {
    var data = await common.req(state.eventTypeListUrl);
    var data2 = await common.req(state.ProductTypeListUrl);
    var data3 = await common.req(state.EventThreatListUrl);
    var data4 = await common.req(state.EventGradeListUrl);
    var data5 = await common.req(state.EventRiskListUrl);
    var data6 = await common.req(state.DeviceTypeListUrl);
    commit('setListNewTypeList', [data, data2, data3, data4, data5, data6]);
    return data;
  },
  showDetail({commit,state}, data){
    state.detailDialog.visible = true;
    state.detailDialog.detailData = data ;
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
