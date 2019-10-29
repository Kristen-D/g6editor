import commonAjax from 'components/js/common.js'


const state = {
   menuId:"m08_01",
   menuName:"",
   listTypeList:[],
   getListTypeUrl:"/ssa/blackWhiteList/getListType.do",
}


const getters = {

}


const mutations = {

  setListTypeList(state,data){
    state.listTypeList = data;
  }
}

const actions = {
async  loadListTypeList({state,commit}){
  var data = await commonAjax.req(state.getListTypeUrl);
   commit('setListTypeList',data);
    return data ;
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
