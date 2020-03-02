import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'
import {NET_ATTACK_TYPE_LIST} from '../mutation-types'
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
    setListTypeList(state,[data,data2,data3,data4,data5,data6]){
        state.eventTypeList=data;
        state.ProductTypeList=data2;
        state.EventThreatList=data3;
        state.EventGradeList=data4;
        state.EventRiskList=data5;
        state.DeviceTypeList=data6;

    },
    [NET_ATTACK_TYPE_LIST] (state, data) {
        state.eventTypeList=data;
    }
}

const actions = {
    getChartInitData({ commit }) {
        //  return new Promise((resolve, reject) => {
        //     chartAjax.getChartInitData(data => {
        //       commit('INIT_MAP', data );
        //       resolve(data);
        //     })
        //  })
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
        var  data6 = await commonAjax.req(state.DeviceTypeListUrl);

        commit('setListTypeList',[data,data2,data3,data4,data5,data6]);
        return data ;
    },

    [NET_ATTACK_TYPE_LIST] (context) {
        return commonAjax.req(state.eventTypeListUrl).then((data) => {
            context.commit(NET_ATTACK_TYPE_LIST, data)
        });
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
