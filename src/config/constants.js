// 图片
import defaultImg from "../assets/layoutImgs/default.jpg";
import default2Img from "../assets/layoutImgs/default2.jpg";
import editImg from "../assets/layoutImgs/edit.jpg";
import edit2Img from "../assets/layoutImgs/edit2.jpg";
import editOnlyImg from "../assets/layoutImgs/editOnly.jpg";
import editOnly2Img from "../assets/layoutImgs/editOnly2.jpg";
import previewOnlyImg from "../assets/layoutImgs/previewOnly.jpg";
import previewOnly2Img from "../assets/layoutImgs/previewOnly2.jpg";
import jsImg from "../assets/layoutImgs/js.jpg";
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

// 支持的语言
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
	vue3: 'html'
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

// monaco editor包含的语言，可通过vue.config.js的MonacoWebpackPlugin插件进行配置
export const monacoEditorInnerLanguages = ['css', 'html', 'javascript', 'less', 'pug', 'scss', 'typescript', 'coffee']

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
    coffeescript: 'source.coffee'
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
    }
}

// 编辑器列表
export const defaultEditorMap = {
	HTML: {
		title: 'HTML',
		language: 'html',
		content: '',
		showAddBtn: false,
		disableDrag: true,
		showTouchBar: true,
	},
	CSS: {
		title: 'CSS',
		language: 'css',
		content: '',
		showAddBtn: true,
		disableDrag: false,
		showTouchBar: true,
	},
	JS: {
		title: 'JS',
		language: 'javascript',
		content: '',
		showAddBtn: true,
		disableDrag: false,
		showTouchBar: true,
	},
	VUE: {
		title: 'VUE',
		language: 'vue2',
		content: '',
		showAddBtn: true,
		disableDrag: true,
		showTouchBar: false,
	}
}

// 预处理器列表
export const preprocessorListMap = {
	HTML: [
		{
			label: 'HTML',
			value: 'html',
		},
		{
			label: 'Pug',
			value: 'pug',
		},
	],
	JS: [
		{
			label: 'JavaScript',
			value: 'javascript',
		},
		{
			label: 'Babel',
			value: 'babel',
		},
		{
			label: 'TypeScript',
			value: 'typescript',
		},
		{
			label: 'CoffeeScript',
			value: 'coffeescript',
		},
	],
	CSS: [
		{
			label: 'CSS',
			value: 'css',
		},
		{
			label: 'LESS',
			value: 'less',
		},
		{
			label: 'SCSS',
			value: 'scss',
		},
		{
			label: 'SASS',
			value: 'sass',
		},
		{
			label: 'Stylus',
			value: 'stylus',
		},
		{
			label: 'PostCss',
			value: 'postcss',
		},
	],
	VUE: [
		{
			label: 'Vue2',
			value: 'vue2',
		},
		// {
		// 	label: 'Vue3',
		// 	value: 'vue3',
		// }
	]
}

// 常用cdn服务
export const cdnSiteList = [
	{
		name: 'BootCDN',
		url: 'https://www.bootcdn.cn/',
	},
	{
		name: '又拍云',
		url: 'http://jscdn.upai.com/',
	},
	{
		name: 'Staticfile CDN',
		url: 'http://staticfile.org/',
	},
	{
		name: '75CDN 前端静态资源库',
		url: 'https://cdn.baomitu.com/',
	},
	{
		name: '字节跳动静态资源公共库',
		url: 'https://cdn.bytedance.com/',
	},
	{
		name: 'cdnjs',
		url: 'https://cdnjs.com/',
	},
	{
		name: 'jsDelivr',
		url: 'https://www.jsdelivr.com/',
	},
]

// 布局列表
export const layoutList = [
	{
		name: '默认',
		value: 'default',
	},
	{
		name: '编辑视图',
		value: 'edit',
	},
	{
		name: '新开窗口预览',
		value: 'newWindowPreview',
	},
	{
		name: 'Vue单文件',
		value: 'vue',
	},
	{
		name: '纯编辑',
		value: 'editOnly',
	},
	{
		name: '纯预览',
		value: 'previewOnly',
	},
	{
		name: '纯js',
		value: 'js',
	},
	{
		name: '默认(对调)',
		value: 'default2',
	},
	{
		name: '编辑视图2',
		value: 'edit2',
	},
	{
		name: '纯编辑(带控制台)',
		value: 'editOnly2',
	},
	{
		name: '纯预览(带控制台)',
		value: 'previewOnly2',
	},
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
	js: jsImg,
};

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
	vue: VueSFC
}