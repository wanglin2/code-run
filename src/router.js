import Edit from '@/pages/edit/Index.vue'
import Preview from '@/pages/edit/Preview.vue'
import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
import { routerMode } from './config';

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
    history: routerMode === 'hash' ? createWebHashHistory() : createWebHistory(),
    routes
})

export default router