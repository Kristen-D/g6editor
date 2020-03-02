import App from './components/App'
import common from 'components/js/common.js'
Vue.prototype.utils = common

new Vue({
  el: '#app',
  render: h => h(App)
})
