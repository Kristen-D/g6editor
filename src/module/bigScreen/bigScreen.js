import App from './views/App'
import common from '../../components/js/common.js'
import store from './store'
Vue.prototype.ajax = common;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
