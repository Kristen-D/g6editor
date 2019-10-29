import App from './components/App'
import commonAjax from 'components/js/common.js'

Object.defineProperty(Vue.prototype, 'common', { value: commonAjax })

new Vue({
  el: '#app',
  render: h => h(App)
});
