import commonAjax from 'components/js/common.js'


const state = {
   menuId:"m09_05",
   menuName:"",
   orgList:[],
   orgListUrl:"/ssa/alarmManager/getOrgList.do",
   userList:[],
   userListUrl:"/ssa/alarmManager/getUserList.do",
   alarmTypeList:[],
   alarmTypeListUrl:"/ssa/alarmManager/getAlarmTypeList.do",
   alarmGradeList:[],
   alarmGradeListUrl:"/ssa/alarmManager/getAlarmGradeList.do",
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

  setListTypeList(state,[data,data2,data3,data4,data5,eventType,eventThreat,eventGrade,eventRisk,deviceType]){ 
    state.orgList = data;
    state.userList = data2;
    state.alarmTypeList = data3;
    state.alarmGradeList = data4;
    state.productTypeList = data5;
    state.eventTypeList = eventType
    state.EventThreatList = eventThreat;
    state.EventGradeList = eventGrade;
    state.EventRiskList = eventRisk;
    state.DeviceTypeList = deviceType;
  }
}

const actions = {
  async getAlarmHandleInfoById({
    commit,
    state
  }, [params]) {
    var result = await commonAjax.req("/ssa/alarmManager/getAlarmHandleInfoById.do", params, this);
    return result;
  },

  async getEventSpDetail({
    commit,
    state
  }, [params]) {
    var result = await commonAjax.req("/ssa/alarmManager/getEventSpDetail.do", params, this);
    return result;
  },
  async getEventClDetail({
    commit,
    state
  }, [params]) {
    var result = await commonAjax.req("/ssa/alarmManager/getEventClDetail.do", params, this);
    return result;
  },
async  loadListTypeList({state,commit}){
  var data = await commonAjax.req(state.orgListUrl);
    var data2 = await commonAjax.req(state.userListUrl);
    var data3 = await commonAjax.req(state.alarmTypeListUrl);
      var data4 = await commonAjax.req(state.alarmGradeListUrl);
  var  data5 = await commonAjax.req(state.ProductTypeListUrl);
      var  eventType = await commonAjax.req(state.eventTypeListUrl);
      var  eventThreat = await commonAjax.req(state.EventThreatListUrl);
      var  eventGrade = await commonAjax.req(state.EventGradeListUrl);
      var  eventRisk = await commonAjax.req(state.EventRiskListUrl);
      var  deviceType = await commonAjax.req(state.DeviceTypeListUrl); 
   commit('setListTypeList',[data,data2,data3,data4,data5,eventType,eventThreat,eventGrade,eventRisk,deviceType]);
    return data ;
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
