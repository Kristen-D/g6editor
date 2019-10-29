import App from './components/App'

import common from 'components/js/common.js'
import VueRouter from 'vue-router'

Vue.prototype.commonAjax = common

new Vue({
 el: '#app',
 render: h => h(App)
})
