import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EventEmitter from 'eventemitter3'
import './assets/style/monolisa.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.config.globalProperties.$eventEmitter = new EventEmitter()
app.use(router)
app.use(store)
app.mount('#app')