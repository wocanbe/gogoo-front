import Vue from 'vue'
import {
  Button,
  Dialog,
  Loading,
  MessageBox,
  Select,
  Option
} from 'element-ui'

import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/loading.css'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/select.css'
import 'element-ui/lib/theme-chalk/option.css'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
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