// import common from  'components/js/common.js'

const state = {
};

const getters = {
};

const actions={

};

const mutations={
  setParams(state,[id,params]) {
    for(var p in params){
      state[id].params[p] = params[p];
    }
  },
  registerConf(state, [id, conf]) {
    state[id] = conf;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}



