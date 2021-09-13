import Edit from '@/pages/edit/Index.vue'
import Preview from '@/pages/edit/Preview.vue'
import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
import { routerMode, base } from './config';

const routes = [
    {
        path: '/',
        component: Edit
    },
    {
        path: '/preview',
        name: 'Preview',
        component: Preview
    },
]

const router = createRouter({
    history: routerMode === 'hash' ? createWebHashHistory(base) : createWebHistory(base),
    routes
})

export default router