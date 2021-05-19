import Edit from '@/pages/edit/Index.vue'
import Preview from '@/pages/edit/Preview.vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Edit
    },
    {
        path: '/preview',
        component: Preview
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router