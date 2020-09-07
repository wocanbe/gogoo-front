import Vue from 'vue'
import Button from 'element-ui/lib/button'
import Dialog from 'element-ui/lib/dialog'
import Loading from 'element-ui/lib/loading'
import MessageBox from 'element-ui/lib/message-box'
import Input from 'element-ui/lib/input'
import Table from 'element-ui/lib/table'
import TableColumn from 'element-ui/lib/table-column'

import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/loading.css'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/input.css'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
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