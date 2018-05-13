// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Lodash from 'lodash'
import Sbd from 'sbd'
import Compromise from 'compromise'

Vue.use(Lodash)
Vue.use(Sbd)
Vue.use(Compromise)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
