//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '@/components/HelloWorld.vue')
    },
    {
        path: '/views',
        name: 'views.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/components/views/Index.vue')
    },
    {
        path: '/views/create',
        name: 'views.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/components/views/Create.vue')
    },
    {
        path: '/views/edit/:id',
        name: 'views.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/components/views/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router