import commonAjax from 'components/js/common.js'


const state = {
   menuId:"m09_06",
   menuName:"",
   emailTemplateList:[],
   getEmailTemplateListUrl:"/ssa/platformIntf_alarmIntf/getEmailTemplateList.do",
}


const getters = {

}


const mutations = {
  setListTypeList(state,[data]){
    state.emailTemplateList = data;
  }
}

const actions = {
async  loadListTypeList({state,commit}){

    var data = await commonAjax.req(state.getEmailTemplateListUrl);
   commit('setListTypeList',[data]);
    return data ;
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
