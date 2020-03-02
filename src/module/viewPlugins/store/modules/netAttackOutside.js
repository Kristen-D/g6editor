import * as types from '../mutation-types';
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
    EventThreatListUrl:"/ssa/netAttack/getEventThreatList.do",
    EventGradeList:[],
    EventGradeListUrl:"/ssa/netAttack/getEventGradeList.do",
    EventRiskList:[],
    EventRiskListUrl:"/ssa/netAttack/getEventRiskList.do",
};

const actions = {
    [types.NET_ATTACK_OUTSIDE_THREAT](context) {
        return commonAjax.req(state.EventThreatListUrl).then((data) => {
            context.commit(types.NET_ATTACK_OUTSIDE_THREAT, data)
        })
    }
};

const mutations = {
    [types.NET_ATTACK_OUTSIDE_THREAT] (state, data) {
        state.EventThreatList = data;
    }
};

export default {
    actions, state, mutations
}