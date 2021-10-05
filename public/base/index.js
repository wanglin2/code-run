// 拦截localStorage的方法，避免非法操作他人的github token
(() => {
    let shieldList = ['codeRun:githubToken'];
    let shieldMethod = ['clear', 'key'];
    ['getItem', 'setItem', 'removeItem', 'clear', 'key'].forEach((method) => {
        let originMethod = window.localStorage[method]
        window.localStorage[method] = function (...args) {
            if (shieldList.includes(args[0]) || shieldMethod.includes(method)) {
                console.log('本次操作已被禁止：', method)
                return null;
            }
            return originMethod.apply(window.localStorage, args);
        }
    })
})()

// 如果你有在cookie上也存储敏感信息，那么也需要禁止对cookie的操作
Object.defineProperty(document, 'cookie', {
    configurable: false,
    enumerable: false,
    get() {
        console.log('本次操作已被禁止：', 'cookie')
        return null;
    }
})