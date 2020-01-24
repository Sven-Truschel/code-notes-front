import Vue from 'vue';

import App from './App';
import VueRouter from 'vue-router'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Edit from './components/Edit'
import Create from './components/Create'
import VuePrism from 'vue-prism'
import CKEditor from '@ckeditor/ckeditor5-vue'
import './registerServiceWorker'
import store from './store'

import axios from 'axios'
import './quasar'
var instance = axios.create({
    baseURL: 'http://192.168.178.10:3000'
})
Vue.prototype.$http = instance
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
Vue.use(VuePrism)
Vue.use(CKEditor)
import 'prismjs/themes/prism.css'
Vue.use(VueRouter);
const routes = [{
        path: '/',
        component: Landing,

    },
    { path: '/signup', component: Signup, name: 'sign-up' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/edit/:id', component: Edit, name: 'Edit', },
    { path: '/create', component: Create, name: 'Create' }

]
const router = new VueRouter({
        mode: 'history',
        routes

    })
    /* eslint-disable */

new Vue({
    el: '#app',
    router,
    store,
    render: h => {
        return h(App)
    }
});