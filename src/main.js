import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Edit from './components/Edit'
import Create from './components/Create'
import VuePrism from 'vue-prism'
import './registerServiceWorker'

import axios from 'axios'
import './quasar'
var instance = axios.create({
    baseURL: 'http://192.168.178.10:3000'
})
Vue.prototype.$http = instance

Vue.use(VuePrism)
import 'prismjs/themes/prism.css'
Vue.use(VueRouter);
const routes = [
    { path: '/', component: Landing },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/edit/:id', component: Edit, name: 'Edit' },
    { path: '/create', component: Create }

]
const router = new VueRouter({
    mode: 'history',
    routes

})
new Vue({
    el: '#app',
    router,
    render: h => {
        return h(App)
    }
});