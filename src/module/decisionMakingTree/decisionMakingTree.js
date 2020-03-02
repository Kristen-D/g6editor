import App from './components/App'
import store from './store' 
import common from 'components/js/common.js'
Vue.prototype.common = common



new Vue({
 el: '#app',
 store,
 render: h => h(App)
})
