/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-05-07 10:32:20 
 * @Desc: 拼接html 
 */
export const assembleHtml = (head, body) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    ${head}
</head>
<body>
    ${body}
</body>
</html>`
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-05-07 18:51:15 
 * @Desc: 判断类型 
 */
export const type = (obj) => {
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}