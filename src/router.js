import Vue from 'vue'
import VueRouter from 'vue-router'

import Form from './components/Form.vue'
import Table from './components/Table.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode : 'history',
    routes : [
        { path: '/', redirect: '/form' },
        { path: '/form', component: Form },
        { path : '/table', component: Table }
    ]
    
})