// 根据 /public/themes 目录下的主题文件自动生成 /src/config/codeThemeLsit.js 文件
const path = require('path')
const fs = require('fs-extra')

const themePath = path.resolve(__dirname, '../public/themes')
const filePath = path.resolve(__dirname, '../src/config/codeThemeList.js')

const files = fs.readdirSync(themePath)
const list = []
files.forEach((file) => {
    let value = path.parse(file).name
    list.push({
        name: value.replace(/([A-Z])/g, '-$1').split('-').filter((item) => {
            return !!item;
        }).join(' '),
		value,
		custom: true,
		loaded: false,
		cache: ''
    })
})
// list.push(
//     {
// 		name: "经典",
// 		value: "vs",
// 	},
// 	{
// 		name: "深色",
// 		value: "vs-dark",
// 	},
// 	{
// 		name: "高对比度深色",
// 		value: "hc-black",
// 	}
// )
fs.ensureFileSync(filePath)
const fileData = `
// 该文件根据 /public/themes 目录下的主题文件自动生成，请勿直接修改，请运行命令：npm run createThemeList
export const codeThemeList = ` + JSON.stringify(list, null, 4)
fs.writeFileSync(filePath, fileData)
console.log('完成')