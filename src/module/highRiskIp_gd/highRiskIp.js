import App from './components/App'
import store from './store'

import common from 'components/js/common.js'
Vue.prototype.commonAjax = common



new Vue({
 el: '#app',
 store,
 render: h => h(App)
})
