import Vue from 'vue'
import App from '@/module/App'

import '@/css/normalize.scss'
import '@/css/reset.scss'

function init () {
  new Vue({
    el: '#app',
    render: h => h(App)
  })
}

init()

