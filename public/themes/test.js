import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import EventEmitter from 'eventemitter3'
import './assets/style/monolisa.css'

const app = createApp(App)
app.config.globalProperties.$eventEmitter = new EventEmitter()
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
new Vue()
// 注释
/** 
 * @Author: 王林 
 * @Date: 2021-09-12 14:31:25 
 * @Desc: 注释 
 */
const number = 24534
const number2 = 0x111
const number3 = 0101010101
const number4 = 1.354
const reg = /sgdghd/img
a === b
`${sdf}`
{}
`"sfdsfhdgj'sdgfj