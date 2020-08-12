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

import './vxe-table.scss'

Vue.use(Column)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Edit)
Vue.use(Pager)

Vue.use(Table)
