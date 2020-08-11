import Vue from 'vue'
import {
  Dialog,
  Loading
} from 'element-ui'

import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/loading.css'

Vue.use(Dialog)
/* 
 * 或写为
 * Vue.component(Dialog.name, Dialog)
 */

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service