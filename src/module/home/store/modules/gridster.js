import commonAjax from 'components/js/common-ajax.js'
import * as types from '../mutation-types'
const state = {
    gridSeq:0,
    data: null,
    gridMark:"mygird_",
}

const getters = {
  getSeq(state){
    return state.gridMark+state.gridSeq;
  }
}


// actions
const actions = {
    initGridsterData({commit,state,dispatch,getters},data){
      data.forEach(d=>{
        commit("nextSeq");
        let id = getters.getSeq;
        d.id =  id;
      })
      state.data =  data;
    },

}

// mutations
const mutations = {

  setRef(state,ref){
    var gid = ref.data.id;
     state.data.forEach(d=>{
       if(d.id == gid){
         d.ref = ref;
       }
     })
  },
  nextSeq(state){
    state.gridSeq++;
  },
  resetEchart(state,id){
    state.data.forEach(d=>{
      if(d.id == id &&  d.ref&&  d.ref.resize){
        d.ref.resize();
      }
    })
  },
     resetAllEchart(state){
       state.data.forEach(d=>{
         if( d.ref&&  d.ref.resize){
           d.ref.resize();
         }
       })

     }

}

export default {
  state,
  getters,
  actions,
  mutations
}
