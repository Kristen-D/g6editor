 import App from './components/App'
import store from './store'

import commonAjax from 'components/js/common.js'

Vue.prototype.commonAjax = commonAjax

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
