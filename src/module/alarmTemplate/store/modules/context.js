import commonAjax from 'components/js/common.js'


const state = {
   menuId:"m09_05",
   menuName:"",
   alarmTypeList:[],
   getAlarmTypeListUrl:"/ssa/alarm_config/getAlarmTypeList.do",
   alarmGradeList:[],
   getAlarmGradeListUrl:"/ssa/alarm_config/getAlarmGradeList.do",
   userList:[],
   getuserListUrl:"/ssa/alarm_config/getUserList.do",
}


const getters = {

}


const mutations = {

  setListTypeList(state,[data,data2,data3]){
    state.alarmTypeList = data;
    state.alarmGradeList = data2;
    state.userList = data3;
  }
}

const actions = {
async  loadListTypeList({state,commit}){
  var data = await commonAjax.req(state.getAlarmTypeListUrl);
    var data2 = await commonAjax.req(state.getAlarmGradeListUrl);
    var data3 = await commonAjax.req(state.getuserListUrl);
   commit('setListTypeList',[data,data2,data3]);
    return data ;
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
