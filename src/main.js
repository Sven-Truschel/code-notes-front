import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Edit from './components/Edit'
import Create from './components/Create'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen)
library.add(faTrashAlt)
library.add(faUserSecret)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);
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