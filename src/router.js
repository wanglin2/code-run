import Home from '@/pages/home/Index.vue'
import Edit from '@/pages/edit/Index.vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [{
        path: '/',
        component: Home
    },
    {
        path: '/edit',
        component: Edit
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router