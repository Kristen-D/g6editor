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
  }
}

const actions = {
async  loadListTypeList({state,commit}){
  var data = await commonAjax.req(state.orgListUrl);
    var data2 = await commonAjax.req(state.userListUrl);
    var data3 = await commonAjax.req(state.alarmTypeListUrl);
      var data4 = await commonAjax.req(state.alarmGradeListUrl);
      var data5 = await commonAjax.req(state.productTypeListUrl);
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
