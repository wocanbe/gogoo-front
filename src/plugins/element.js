import Vue from 'vue'
import {
  Dialog,
  Loading,
  MessageBox
} from 'element-ui'

import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/loading.css'
import 'element-ui/lib/theme-chalk/message-box.css'

Vue.use(Dialog)
/* 
 * 或写为
 * Vue.component(Dialog.name, Dialog)
 */

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;