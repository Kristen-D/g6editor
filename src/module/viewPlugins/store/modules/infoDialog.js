import common from 'components/js/common.js'
const state = {
  infoConfig:{
    component:"",
    data:null,
    i:null,
    title:"",
    dialogTableVisible:false
  }
}


const getters = {

}


const mutations = {
  setConfig(state, config){
    state.infoConfig = {...config}; 
  }
}

const actions = {

 }


export default {
  state,
  getters,
  actions,
  mutations
}
