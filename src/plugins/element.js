import Vue from 'vue'
import Button from 'element-ui/lib/button'
import Dialog from 'element-ui/lib/dialog'
import Loading from 'element-ui/lib/loading'
import MessageBox from 'element-ui/lib/message-box'
import Input from 'element-ui/lib/input'
import Table from 'element-ui/lib/table'
import TableColumn from 'element-ui/lib/table-column'
import Select from 'element-ui/lib/select'
import Option from 'element-ui/lib/option'
import Alert from 'element-ui/lib/alert'
import Popover from 'element-ui/lib/popover'
import Transfer from 'element-ui/lib/transfer'
import Form from 'element-ui/lib/form'
import FormItem from 'element-ui/lib/form-item'
import Switch from 'element-ui/lib/switch'

import 'element-ui/lib/theme-chalk/icon.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/loading.css'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/table.css'
import 'element-ui/lib/theme-chalk/table-column.css'
import 'element-ui/lib/theme-chalk/select.css'
import 'element-ui/lib/theme-chalk/option.css'
import 'element-ui/lib/theme-chalk/alert.css'
import 'element-ui/lib/theme-chalk/popover.css'
import 'element-ui/lib/theme-chalk/transfer.css'
import 'element-ui/lib/theme-chalk/form.css'
import 'element-ui/lib/theme-chalk/form-item.css'
import 'element-ui/lib/theme-chalk/switch.css'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Alert)
Vue.use(Popover)
Vue.use(Transfer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)

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