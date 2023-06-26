import { createStore } from 'vuex'
import { generateUUID, atou } from '@/utils'
import { create, request } from '@/utils/octokit'
import { ElMessage } from 'element-plus'
// 存储github token的本地存储的key
const githubTokenSaveKey = 'codeRun:githubToken'

// 生成默认编辑数据
const createDefaultData = () => {
  return {
    config: {
      codeTheme: 'OneDarkPro',
      pageThemeSyncCodeTheme: true,
      openAlmightyConsole: false,
      autoRun: false,
      layout: 'default',
      keepPreviousLogs: true,
      codeFontSize: 16
    },
    title: '未命名',
    code: {
      HTML: {
        language: 'html',
        content: ``
      },
      CSS: {
        language: 'css',
        content: ``,
        resources: []
      },
      JS: {
        language: 'javascript',
        content: ``,
        resources: []
      },
      VUE: {
        language: 'vue2',
        content: ``,
        resources: []
      }
    }
  }
}

const store = createStore({
  state() {
    return {
      uuid: generateUUID(),
      editData: createDefaultData(),
      githubToken: '',
      previewDoc: ''
    }
  },
  mutations: {
    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-12 19:51:55
     * @Desc: 设置编辑数据
     */
    setEditData(state, data) {
      state.editData = data
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-06 17:29:28
     * @Desc: 设置代码内容
     */
    setCodeContent(state, { type, code }) {
      state.editData.code[type].content = code
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-12 19:48:49
     * @Desc: 设置代码预处理器
     */
    setCodePreprocessor(state, { type, preprocessor }) {
      state.editData.code[type].language = preprocessor
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-13 20:01:01
     * @Desc: 设置资源
     */
    setCodeResource(state, { type, resources }) {
      state.editData.code[type].resources = resources
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2022-08-25 19:41:37
     * @Desc: 设置import map
     */
    setImportMap(state, importMap) {
      state.editData.code.JS.importMap = importMap
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-14 11:25:01
     * @Desc: 设置代码数据
     */
    setCode(state, data) {
      state.editData.code = data
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-15 08:08:04
     * @Desc: 设置代码主题
     */
    setCodeTheme(state, theme) {
      state.editData.config.codeTheme = theme
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-15 08:16:38
     * @Desc: 设置自动运行的状态
     */
    setAutoRun(state, autoRun) {
      state.editData.config.autoRun = autoRun
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-15 08:23:17
     * @Desc: 设置全能调试
     */
    setOpenAlmightyConsole(state, openAlmightyConsole) {
      state.editData.config.openAlmightyConsole = openAlmightyConsole
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-15 08:51:49
     * @Desc: 设置布局
     */
    setLayout(state, layout) {
      state.editData.config.layout = layout
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-20 15:41:55
     * @Desc: 设置是否保留之前的日志
     */
    setKeepPreviousLogs(state, keepPreviousLogs) {
      state.editData.config.keepPreviousLogs = keepPreviousLogs
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-09-26 15:04:09
     * @Desc: 设置编辑器字号
     */
    setCodeFontSize(state, codeFontSize) {
      state.editData.config.codeFontSize = codeFontSize
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-09-27 10:27:03
     * @Desc: 设置主题同步
     */
    setPageThemeSyncCodeTheme(state, pageThemeSyncCodeTheme) {
      state.editData.config.pageThemeSyncCodeTheme = pageThemeSyncCodeTheme
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-09-30 14:21:32
     * @Desc: 设置github token
     */
    setGithubToken(state, githubToken) {
      state.githubToken = githubToken || ''
      create(githubToken)
    },

    /**
     * @Author: 王林
     * @Date: 2021-10-03 12:57:16
     * @Desc: 设置代码标题
     */
    setCodeTitle(state, title) {
      state.editData.title = title
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2022-10-27 18:59:00
     * @Desc: 设置当前编译完成进行预览的文档
     */
    setPreviewDoc(state, previewDoc) {
      state.previewDoc = previewDoc
    }
  },
  actions: {
    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-05-12 19:49:17
     * @Desc:  获取数据
     */
    getData(ctx, { id, data }) {
      return new Promise(async (resolve, reject) => {
        try {
          let parseData = createDefaultData()
          if (id) {
            let { data } = await request(`GET /gists/${id}`, {
              gist_id: id
            })
            parseData = JSON.parse(data.files['coderun.json'].content)
          } else if (data) {
            parseData = JSON.parse(atou(data))
          }
          ctx.commit('setEditData', parseData)
          resolve()
        } catch (e) {
          console.log(e)
          ElMessage.error('请求失败')
          reject(e)
        }
      })
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-09-30 14:48:40
     * @Desc: 保存github token
     */
    saveGithubToken(ctx, githubToken) {
      ctx.commit('setGithubToken', githubToken)
      if (githubToken) {
        localStorage.setItem(githubTokenSaveKey, githubToken)
      } else {
        localStorage.removeItem(githubTokenSaveKey)
      }
    },

    /**
     * javascript comment
     * @Author: 王林25
     * @Date: 2021-09-30 14:23:10
     * @Desc:  从本地存储获取github token
     */
    getGithubToken(ctx) {
      let githubToken = localStorage.getItem(githubTokenSaveKey)
      ctx.commit('setGithubToken', githubToken)
    }
  }
})

export default store
