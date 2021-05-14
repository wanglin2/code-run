import {
    createStore
} from 'vuex'

const store = createStore({
    state() {
        return {
            editData: {
                config: {
                    blockSize: null,
                    editorSize: null,
                    useInnerConsole: false
                },
                code: {
                    HTML: {
                        language: 'html',
                        content: ''
                    },
                    CSS: {
                        language: 'css',
                        content: '',
                        resources: []
                    },
                    JS: {
                        language: 'javascript',
                        content: '',
                        resources: []
                    }
                }
            },
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
        setCodeContent(state, {
            type,
            code
        }) {
            state.editData.code[type].content = code
        },

        /** 
         * javascript comment 
         * @Author: 王林25 
         * @Date: 2021-05-12 19:48:49 
         * @Desc: 设置代码预处理器 
         */
        setCodePreprocessor(state, {
            type,
            preprocessor
        }) {
            state.editData.code[type].language = preprocessor
        },

        /** 
         * javascript comment 
         * @Author: 王林25 
         * @Date: 2021-05-13 20:01:01 
         * @Desc: 设置资源 
         */
        setCodeResource(state, {
            type,
            resources
        }) {
            state.editData.code[type].resources = resources
        },

        /** 
         * javascript comment 
         * @Author: 王林25 
         * @Date: 2021-05-14 11:25:01 
         * @Desc: 设置代码数据 
         */
        setCode(state, data) {
            state.editData.code = data
        }
    },
    actions: {
        /** 
         * javascript comment 
         * @Author: 王林25 
         * @Date: 2021-05-12 19:49:17 
         * @Desc:  获取数据
         */
        getData(context) {
            return new Promise((resolve) => {
                // setTimeout(() => {
                //     context.commit('setEditData', {
                //         config: {
                //             blockSize: null,
                //             editorSize: null,
                //             useInnerConsole: false
                //         },
                //         code: {
                //             HTML: {
                //                 language: 'html',
                //                 content: '<div class="box"></div>'
                //             },
                //             CSS: {
                //                 language: 'less',
                //                 content: `body{\n.box{\n  width: 100px;\n  height:100px;\n  background-color: red;\n}\n}`
                //             },
                //             JS: {
                //                 language: 'javascript',
                //                 content: 'console.log(123)'
                //             }
                //         }
                //     }, )
                //     resolve()
                // }, 1000);
                resolve()
            })
        }
    }
})

export default store