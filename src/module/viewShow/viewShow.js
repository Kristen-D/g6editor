 import App from './components/App'
import store from '../viewPlugins/store'
import commonAjax from 'components/js/common.js'
Vue.prototype.common = commonAjax
Vue.prototype.commonAjax = commonAjax
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
