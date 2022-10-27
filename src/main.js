import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EventEmitter from 'eventemitter3'
import './assets/style/monolisa.css'
import 'element-plus/dist/index.css'
import { ElLoadingDirective } from 'element-plus'
import 'nprogress/nprogress.css'
import './assets/iconfont/iconfont.css'

const create = () => {
  const app = createApp(App)
  app.config.globalProperties.$eventEmitter = new EventEmitter()
  app.use(router)
  app.use(store)
  app.directive('loading', ElLoadingDirective)
  app.mount('#app')
}

const init = () => {
  store.dispatch('getGithubToken')
  create()
}
init()
