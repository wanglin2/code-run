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
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-05-19 16:10:59 
 * @Desc: 生成uuid 
 */
export const generateUUID = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}