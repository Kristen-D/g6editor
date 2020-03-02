import chartAjax from '../../api/ajax.js'
import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'
const state = {
   menuId:"m04",
   menuName:"",
   params:{event_type:null},
   qryTableName1:"",
   qryTableName2:"",
   test:"",
   eventTypeList:[],
   eventTypeListUrl:"/ssa/netAttack/getEventTypeList.do",
   ProductTypeList:[],
   ProductTypeListUrl:"/ssa/netAttack/getProductTypeList.do",
   EventThreatList:[],
   EventThreatUrl:"/ssa/netAttack/getEventThreatList.do",
   EventGradeList:[],
   EventGradeListUrl:"/ssa/netAttack/getEventGradeList.do",
   EventRiskList:[],
   EventRiskListUrl:"/ssa/netAttack/getEventRiskList.do",

}


const getters = {

}


const mutations = {
  [types.SET_CONTEXT_TITLE] (state,name) {
      state.menuName = name;
    },
  INIT_MAP (state,data) {
        // state.topData = data.topData;
         state.mapData = data.mapData;
         //state.zichanData = data.zichanData;
  },

  setContextParams(state, dateTime){
    state.params.startTime = commonAjax.formatDate(dateTime[0],"yyyy-MM-dd");
    state.params.endTime = commonAjax.formatDate(dateTime[1],"yyyy-MM-dd");
  },
  setListTypeList(state,[data,data2,data3,data4,data5]){
    state.eventTypeList=data;
    state.ProductTypeList=data2;
    state.EventThreatList=data3;
    state.EventGradeList=data4;
    state.EventRiskList=data5;

  }
}

const actions = {
    getChartInitData({ commit }) {
     return new Promise((resolve, reject) => {
        chartAjax.getChartInitData(data => {
          commit('INIT_MAP', data );
          resolve(data);
        })
     })
   },
   updateContextParams({ commit ,state}, dateTime){
     commit('setContextParams', dateTime );
     state.params  = {...state.params};
   },
   async  loadListTypeList({state,commit}){
    var  data = await commonAjax.req(state.eventTypeListUrl);
    var  data2 = await commonAjax.req(state.ProductTypeListUrl);
    var  data3 = await commonAjax.req(state.EventThreatListUrl);
    var  data4 = await commonAjax.req(state.EventGradeListUrl);
    var  data5 = await commonAjax.req(state.EventRiskListUrl);
      commit('setListTypeList',[data,data2,data3,data4,data5]);
       return data ;
     }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
