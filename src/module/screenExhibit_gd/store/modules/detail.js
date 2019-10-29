import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'


const state = {
   eventTypeList:[],
   eventTypeListUrl:"/ssa/netAttack/getEventTypeList.do",
   ProductTypeList:[],
   ProductTypeListUrl:"/ssa/netAttack/getProductTypeList.do",
   EventThreatList:[],
   EventThreatListUrl:"/ssa/netAttack/getEventThreatList.do",
   EventGradeList:[],
   EventGradeListUrl:"/ssa/netAttack/getEventGradeList.do",
   EventRiskList:[],
   EventRiskListUrl:"/ssa/netAttack/getEventRiskList.do",
   DeviceTypeList:[],
   DeviceTypeListUrl:"/ssa/netAttack/getDeviceTypeList.do",
}


const getters = {

}


const mutations = {

  setListNewTypeList(state,[data,data2,data3,data4,data5,data6]){
    state.eventTypeList=data;
    state.ProductTypeList=data2;
    state.EventThreatList=data3;
    state.EventGradeList=data4;
    state.EventRiskList=data5;
    state.DeviceTypeList=data6;

  }
}

const actions = {
  async  loadListNewTypeList({state,commit}){
   var  data = await commonAjax.req(state.eventTypeListUrl);
   var  data2 = await commonAjax.req(state.ProductTypeListUrl);
   var  data3 = await commonAjax.req(state.EventThreatListUrl);
   var  data4 = await commonAjax.req(state.EventGradeListUrl);
   var  data5 = await commonAjax.req(state.EventRiskListUrl);
   var  data6 = await commonAjax.req(state.DeviceTypeListUrl);
     commit('setListNewTypeList',[data,data2,data3,data4,data5,data6]);
      return data ;
    }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
