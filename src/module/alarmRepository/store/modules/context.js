import commonAjax from 'components/js/common.js'


const state = {
   menuId:"m09_05",
   menuName:"",
   alarmTypeList:[],
   getAlarmTypeListUrl:"/ssa/alarmRepository/getAlarmTypeList.do",
   alarmGradeList:[],
   getAlarmGradeListUrl:"/ssa/alarmRepository/getAlarmGradeList.do",
   userList:[],
   getuserListUrl:"/ssa/alarmRepository/getUserList.do",
   alarmTypeTreeOption:[],
   getAlarmTypeTreeOptionUrl:"/ssa/alarmMonitor/getAlarmTypeChildRen.do"
}


const getters = {

}


const mutations = {

  setListTypeList(state,[data,data2,data3,data4]){
    state.alarmTypeList = data;
    state.alarmGradeList = data2;
    state.userList = data3;
    state.alarmTypeTreeOption = data4;
  }
}

const actions = {
async  loadListTypeList({state,commit}){
  var data = await commonAjax.req(state.getAlarmTypeListUrl);
    var data2 = await commonAjax.req(state.getAlarmGradeListUrl);
    var data3 = await commonAjax.req(state.getuserListUrl);
    var data4=null;
  //  var data4 = await commonAjax.req(state.getAlarmTypeTreeOptionUrl);
   commit('setListTypeList',[data,data2,data3,data4]);
    return data ;
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
