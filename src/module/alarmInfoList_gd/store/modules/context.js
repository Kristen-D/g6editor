import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'


const state = {
   menuId:"m09_05",
   menuName:"",
   orgList:[],
   orgListUrl:"/ssa/alarmInfoList/getOrgList.do",
   userList:[],
   userListUrl:"/ssa/alarmInfoList/getUserList.do",
   alarmTypeList:[],
   alarmTypeListUrl:"/ssa/alarmInfoList/getAlarmTypeList.do",
   alarmGradeList:[],
   alarmGradeListUrl:"/ssa/alarmInfoList/getAlarmGradeList.do",
   productTypeList:[],
   productTypeListUrl:"/ssa/alarmInfoList/getProductTypeList.do",
   params:{event_type:null},
   qryTableName1:"",
   qryTableName2:"",
   test:"",
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
   bottonName:"确认导出",
   loadSet:false,
   currentPage:"1",
   currentUrl:""
}


const getters = {

}


const mutations = {

  setListTypeList(state,[data,data2,data3,data4,data5]){
    state.orgList = data;
    state.userList = data2;
    state.alarmTypeList = data3;
    state.alarmGradeList = data4;
    state.productTypeList = data5;
  },
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
  async getAlarmHandleInfoById({
    commit,
    state
  }, [params]) {
    var result = await commonAjax.req("/ssa/alarmInfoList/getAlarmHandleInfoById.do", params, this);
    return result;
  },

  async getEventSpDetail({
    commit,
    state
  }, [params]) {
    var result = await commonAjax.req("/ssa/alarmInfoList/getEventSpDetail.do", params, this);
    return result;
  },
  async getEventClDetail({
    commit,
    state
  }, [params]) {
    var result = await commonAjax.req("/ssa/alarmInfoList/getEventClDetail.do", params, this);
    return result;
  },
async  loadListTypeList({state,commit}){
  var data = await commonAjax.req(state.orgListUrl);
    var data2 = await commonAjax.req(state.userListUrl);
    var data3 = await commonAjax.req(state.alarmTypeListUrl);
      var data4 = await commonAjax.req(state.alarmGradeListUrl);
      var data5 = await commonAjax.req(state.productTypeListUrl);
   commit('setListTypeList',[data,data2,data3,data4,data5]);
    return data ;
  },
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
