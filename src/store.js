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
                }
            }
        }
    },
    mutations: {

    }
})

export default store