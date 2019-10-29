import {SET_DIALOG} from "../mutation-types";

let state = {
  title: '',
  visible: false,
  component: '',
  data: []
};

const mutations = {
  [SET_DIALOG] (state, data) {
    state.title = data.title;
    state.component = data.component;
    state.data = data.data;
    state.visible = true;
  }
};

export default {
  state, mutations
}
