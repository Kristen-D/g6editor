import common from 'components/js/common.js'
import { SET_PARAMS } from '../mutation-types.js'
const state = {
  params: {
    areaId: '',
    appraisalCycle: '',
    status: ''
  },
  getRoleStateUrl: '/ssa/overall/getUserRole.do',
  RoleState: false,
}


const getters = {

}


const mutations = {
  SET_PARAMS(state, p) {
    state.params = p;
  },
  SET_ROLE_STATE(state, roleState) {
    state.RoleState = roleState;
  }
}

const actions = {
  async loadUserRoleState({commit, state}) {
    let result = await common.reqBackState(state.getRoleStateUrl);
    commit('SET_ROLE_STATE', result.state);
  }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
