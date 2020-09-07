import Vue from 'vue'
import 'xe-utils'
import {
  Table,
  Column,
  Header,
  Footer,
  Filter,
  Edit,
  Pager
} from 'vxe-table'

import 'vxe-table/lib/icon/style/style.css'
import 'vxe-table/lib/table/style/style.css'
import 'vxe-table/lib/column/style/style.css'
import 'vxe-table/lib/header/style/style.css'
import 'vxe-table/lib/body/style/style.css'
import 'vxe-table/lib/footer/style/style.css'
import 'vxe-table/lib/filter/style/style.css'
import 'vxe-table/lib/menu/style/style.css'
import 'vxe-table/lib/export/style/style.css'

Vue.use(Column)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Edit)
Vue.use(Pager)

Vue.use(Table)
