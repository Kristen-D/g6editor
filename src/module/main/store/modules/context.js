
const state = {
  crumbList:[],
}


const getters = {

}


const mutations = {
  setCrumbList(state,data){
   state.crumbList = data;
  }
}

const actions = {
  iftest({ commit }){
    alert(888);
  },
  setCrumb({state,commit},crumb){
    let crumbList = state.crumbList;
    let c = crumbList[crumbList.length-1];
    if(c){
      c.edit=true;
    }
    crumbList.push(crumb);
  },
  delCrumb({state,commit}){
    let crumbList = state.crumbList;
    crumbList.pop();
    let c = crumbList[crumbList.length-1];
    if(c){
      c.edit=false;
    }

  },
}


export default {
  state,
  getters,
  actions,
  mutations
}
