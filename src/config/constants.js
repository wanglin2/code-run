// 图片
import defaultImg from '../assets/layoutImgs/default.jpg'
import default2Img from '../assets/layoutImgs/default2.jpg'
import editImg from '../assets/layoutImgs/edit.jpg'
import edit2Img from '../assets/layoutImgs/edit2.jpg'
import editOnlyImg from '../assets/layoutImgs/editOnly.jpg'
import editOnly2Img from '../assets/layoutImgs/editOnly2.jpg'
import previewOnlyImg from '../assets/layoutImgs/previewOnly.jpg'
import previewOnly2Img from '../assets/layoutImgs/previewOnly2.jpg'
import jsImg from '../assets/layoutImgs/js.jpg'
// 布局组件
import Default from '../pages/edit/layouts/Default.vue'
import Default2 from '../pages/edit/layouts/Default2.vue'
import Edit from '../pages/edit/layouts/Edit.vue'
import Edit2 from '../pages/edit/layouts/Edit2.vue'
import EditOnly from '../pages/edit/layouts/EditOnly.vue'
import EditOnly2 from '../pages/edit/layouts/EditOnly2.vue'
import PreviewOnly from '../pages/edit/layouts/PreviewOnly.vue'
import PreviewOnly2 from '../pages/edit/layouts/PreviewOnly2.vue'
import Js from '../pages/edit/layouts/Js.vue'
import NewWindowPreview from '../pages/edit/layouts/NewWindowPreview.vue'
import VueSFC from '../pages/edit/layouts/VueSFC.vue'
import Embed from '../pages/edit/layouts/Embed.vue'

// Monaco Editor支持的语言
export const supportLanguage = {
  css: 'css',
  less: 'less',
  scss: 'scss',
  sass: 'scss',
  stylus: 'css',
  postcss: 'css',
  html: 'html',
  pug: 'pug',
  javascript: 'javascript',
  babel: 'javascript',
  typescript: 'typescript',
  coffeescript: 'coffeescript',
  vue2: 'html',
  vue3: 'html',
  livescript: 'javascript',
  json: 'json'
}

// 支持美化的语言
export const formatterParserMap = {
  css: 'css',
  scss: 'scss',
  less: 'less',
  postcss: 'css',
  html: 'html',
  javascript: 'babel',
  babel: 'babel',
  typescript: 'typescript',
  vue2: 'html',
  vue3: 'html'
}

// 支持使用es6模块语法
export const supportESModuleMap = {
  javascript: true,
  typescript: true,
  coffeescript: true,
  vue2: true,
  vue3: true
}

// monaco editor包含的语言，可通过vue.config.js的MonacoWebpackPlugin插件进行配置
export const monacoEditorInnerLanguages = [
  'css',
  'html',
  'javascript',
  'less',
  'pug',
  'scss',
  'typescript',
  'coffee'
]

// 语言id到作用域名称的映射
export const scopeNameMap = {
  html: 'text.html.basic',
  pug: 'text.pug',
  css: 'source.css',
  less: 'source.css.less',
  scss: 'source.css.scss',
  sass: 'source.sassdoc',
  typescript: 'source.ts',
  javascript: 'source.js',
  javascriptreact: 'source.js.jsx',
  coffeescript: 'source.coffee',
  json: 'source.json'
}

// 作用域名称到语法文件的映射
export const tmGrammarJsonMap = {
  'text.html.basic': 'html.tmLanguage.json',
  'text.pug': 'pug.tmLanguage.json',
  'source.css': 'css.tmLanguage.json',
  'source.css.less': 'less.tmLanguage.json',
  'source.less': 'less.tmLanguage.json',
  'source.css.scss': 'scss.tmLanguage.json',
  'source.sass': 'scss.tmLanguage.json',
  'source.sassdoc': 'sassdoc.tmLanguage.json',
  'source.stylus': 'css.tmLanguage.json',
  'source.ts': 'TypeScript.tmLanguage.json',
  'source.js': 'JavaScript.tmLanguage.json',
  'source.js.jsx': 'JavaScriptReact.tmLanguage.json',
  'source.coffee': 'coffeescript.tmLanguage.json',
  'source.js.regexp': {
    format: 'plist',
    path: 'Regular Expressions (JavaScript).tmLanguage'
  },
  'source.json': 'JSON.tmLanguage.json'
}

// 编辑器列表
export const defaultEditorMap = {
  HTML: {
    title: 'HTML',
    language: 'html',
    content: '',
    showAddBtn: false,
    disableDrag: true,
    showTouchBar: true
  },
  CSS: {
    title: 'CSS',
    language: 'css',
    content: '',
    showAddBtn: true,
    disableDrag: false,
    showTouchBar: true
  },
  JS: {
    title: 'JS',
    language: 'javascript',
    content: '',
    showAddBtn: true,
    disableDrag: false,
    showTouchBar: true
  },
  VUE: {
    title: 'VUE',
    language: 'vue2',
    content: '',
    showAddBtn: true,
    disableDrag: true,
    showTouchBar: false
  }
}

// 预处理器列表
export const preprocessorListMap = {
  HTML: [
    {
      label: 'HTML',
      value: 'html'
    },
    {
      label: 'Pug',
      value: 'pug'
    }
  ],
  JS: [
    {
      label: 'JavaScript',
      value: 'javascript'
    },
    {
      label: 'Babel',
      value: 'babel'
    },
    {
      label: 'TypeScript',
      value: 'typescript'
    },
    {
      label: 'CoffeeScript',
      value: 'coffeescript'
    },
    {
      label: 'LiveScript',
      value: 'livescript'
    }
  ],
  CSS: [
    {
      label: 'CSS',
      value: 'css'
    },
    {
      label: 'LESS',
      value: 'less'
    },
    {
      label: 'SCSS',
      value: 'scss'
    },
    {
      label: 'SASS',
      value: 'sass'
    },
    {
      label: 'Stylus',
      value: 'stylus'
    },
    {
      label: 'PostCss',
      value: 'postcss'
    }
  ],
  VUE: [
    {
      label: 'Vue2',
      value: 'vue2'
    },
    {
      label: 'Vue3',
      value: 'vue3'
    }
  ]
}

// 语言文件类型映射列表
export const langTypeMap = {
  html: ['text/html'],
  pug: ['.pug'],
  javascript: ['.js'],
  babel: ['.js', '.jsx'],
  typescript: ['.ts'],
  coffeescript: ['.coffee'],
  livescript: ['.mlx'],
  css: ['text/css'],
  less: ['.less'],
  scss: ['.scss'],
  sass: ['.sass'],
  stylus: ['.styl'],
  postcss: ['.pcss'],
  vue2: ['.vue'],
  vue3: ['.vue']
}

// 常用cdn服务
export const cdnSiteList = [
  {
    name: 'BootCDN',
    url: 'https://www.bootcdn.cn/'
  },
  {
    name: '又拍云',
    url: 'http://jscdn.upai.com/'
  },
  {
    name: 'Staticfile CDN',
    url: 'http://staticfile.org/'
  },
  {
    name: '75CDN 前端静态资源库',
    url: 'https://cdn.baomitu.com/'
  },
  {
    name: '字节跳动静态资源公共库',
    url: 'https://cdn.bytedance.com/'
  },
  {
    name: 'cdnjs',
    url: 'https://cdnjs.com/'
  },
  {
    name: 'jsDelivr',
    url: 'https://www.jsdelivr.com/'
  },
  {
    name: 'unpkg',
    url: 'https://unpkg.com/'
  }
]

// 布局列表
export const layoutList = [
  {
    name: '默认',
    value: 'default'
  },
  {
    name: '编辑视图',
    value: 'edit'
  },
  {
    name: '新开窗口预览',
    value: 'newWindowPreview'
  },
  {
    name: 'Vue单文件',
    value: 'vue'
  },
  {
    name: '纯编辑',
    value: 'editOnly'
  },
  {
    name: '纯预览',
    value: 'previewOnly'
  },
  {
    name: '纯js',
    value: 'js'
  },
  {
    name: '默认(对调)',
    value: 'default2'
  },
  {
    name: '编辑视图2',
    value: 'edit2'
  },
  {
    name: '纯编辑(带控制台)',
    value: 'editOnly2'
  },
  {
    name: '纯预览(带控制台)',
    value: 'previewOnly2'
  }
]

// 布局预览图片映射
export const previewImgMap = {
  default: defaultImg,
  default2: default2Img,
  edit: editImg,
  edit2: edit2Img,
  editOnly: editOnlyImg,
  editOnly2: editOnly2Img,
  previewOnly: previewOnlyImg,
  previewOnly2: previewOnly2Img,
  js: jsImg
}

// 布局组件映射
export const layoutMap = {
  default: Default,
  default2: Default2,
  edit: Edit,
  edit2: Edit2,
  editOnly: EditOnly,
  editOnly2: EditOnly2,
  previewOnly: PreviewOnly,
  previewOnly2: PreviewOnly2,
  js: Js,
  newWindowPreview: NewWindowPreview,
  vue: VueSFC,
  embed: Embed
}

// 编辑器字号
export const codeFontSizeList = [12, 14, 16, 18, 20, 22, 24].map(item => {
  return {
    name: item + 'px',
    value: item
  }
})

// 默认的界面主题配置
// https://code.visualstudio.com/api/references/theme-color
export const defaultViewThemeConfig = {
  // 标题栏背景颜色
  '--header-background': [
    'titleBar.activeBackground',
    'titleBar.inactiveBackground',
    '#1e1f26'
  ],
  // 标题栏logo颜色
  '--header-logo-color': [
    'titleBar.activeForeground',
    'titleBar.inactiveForeground',
    '#fff'
  ],

  // 标题栏按钮的背景颜色
  '--header-btn-background': ['none'],
  // 标题栏的按钮边框颜色
  '--header-btn-border-color': ['titleBar.activeForeground', '#444857'],
  // 标题栏的按钮颜色
  '--header-btn-color': ['titleBar.activeForeground', '#fff'],

  // 标题栏的下拉菜单的背景颜色
  '--dropdown-background': [
    'menu.background',
    'dropdown.background',
    '#1e1f26'
  ],
  // 标题栏的下拉菜单的边框颜色
  '--dropdown-box-border-color': ['menu.border', 'dropdown.border', 'none'],
  // 标题栏的下拉菜单的颜色
  '--dropdown-color': ['menu.foreground', 'dropdown.foreground', '#fff'],
  // 标题栏的下拉菜单hover时的背景颜色
  '--dropdown-hover-background': ['menu.selectionBackground', '#5a5f73'],
  // 标题栏的下拉菜单hover时的颜色
  '--dropdown-hover-color': ['menu.selectionForeground', '#fff'],

  // 拖动条的背景颜色
  '--touch-bar-background': [
    'scrollbarSlider.background',
    'scrollbarSlider.activeBackground',
    'scrollbarSlider.hoverBackground',
    '#333642'
  ],
  // 拖动条左/上边框颜色
  '--touch-bar-border-left-color': [
    'menu.separatorBackground',
    'rgba(255, 255, 255, 0.05)'
  ],
  // 拖动条右/下边框颜色
  '--touch-bar-border-right-color': [
    'menu.separatorBackground',
    'rgba(0, 0, 0, 0.4)'
  ],

  // 编辑器背景颜色
  '--editor-background': ['editor.background', '#1d1e22'],
  // 编辑器标题栏的背景颜色
  '--editor-header-background': [
    'editorGroupHeader.tabsBackground',
    'editor.background',
    '#1d1e22'
  ],
  // 编辑器标题栏的标题颜色
  '--editor-header-title-color': [
    'tab.activeForeground',
    'editor.foreground',
    '#aaaebc'
  ],
  // 编辑器标题栏的其他部分颜色
  '--editor-header-color': [
    'tab.activeForeground',
    'editor.foreground',
    '#606266'
  ],
  // 编辑器标题栏下边框颜色
  '--editor-header-border-bottom-color': [
    'editorGroup.border',
    'editorGroupHeader.tabsBorder',
    'rgba(255, 255, 255, 0.05)'
  ],

  // 控制台背景颜色
  '--console-background': [
    'panel.background',
    'terminal.background',
    '#131417'
  ],
  // 命令输入栏背景颜色
  '--command-background': ['terminal.background', 'rgba(255, 255, 255, 0.1)'],
  // 命令输入栏颜色
  '--command-color': ['terminal.foreground', '#fff']
}

// ES模块CDN
export const esModuleCdnUrl = 'https://unpkg.com/'
export const handleEsModuleCdnUrl = (module, useModule = true) => {
  return `${esModuleCdnUrl}${module}${useModule ? '?module' : ''}`
}

// 嵌入模式的编辑器tab列表
export const getEmbedCodeTypeListMap = layout => {
  return layout === 'vue' ? ['VUE'] : ['HTML', 'CSS', 'JS']
}

// 嵌入模式的缩放列表
export const scaleTypeList = [
  {
    name: '1x',
    value: 1
  },
  {
    name: '0.5x',
    value: 0.5
  },
  {
    name: '0.25x',
    value: 0.25
  }
]

// 默认的importMap
export const defaultImportMapStr = `{
	"imports": {
	}
}`
