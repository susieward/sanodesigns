if (process.env.NODE_ENV === 'production') {
    window.endpoint = 'https://sanodesigns-server.herokuapp.com';
} else {
    window.endpoint = 'http://localhost:3000';
}
// Global Variables
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


require('./css/main.css');
require('./js/main.js');
require('webpack-jquery-ui/draggable');
require('webpack-jquery-ui/droppable');
const interact = require('interactjs');



import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './store/index.js'
import { sync } from 'vuex-router-sync'
import App from './App'
import Home from './components/Home.vue'
import Create from './components/Create.vue'
import NecklaceSelector from './components/NecklaceSelector.vue'
import Bracelet from './components/Bracelet.vue'
import BeadSelector from './components/BeadSelector.vue'
import Catalog from './components/Catalog.vue'
import Cart from './components/Cart.vue'
import Admin from './components/Admin.vue'
import AdminBeads from './components/AdminBeads.vue'
import AddBead from './components/AddBead.vue'
import Type from './components/Type.vue'
import Length from './components/Length.vue'
import Materials from './components/Materials.vue'
import Confirm from './components/Confirm.vue'
import Designs from './components/Designs.vue'
import VueSession from 'vue-session'
import Toasted from 'vue-toasted';

Vue.use(Toasted)

var options = {
    persist: true
}

Vue.use(VueSession, options)

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    
    {
        path: '/create/type',
      name: 'Create',
      component: Create,
        children: [
        {
            path: '',
            name: 'Type',
            component: Type,
            props: true
        },
            
        {
            path: '/:sessionId/length',
            name: 'Length',
            component: Length,
            props: true
        },
        {
            path: '/:sessionId/type/material',
            name: 'Materials',
            component: Materials,
            props: true
            },
        {
            path: '/:sessionId/type/confirm',
            name: 'Confirm',
            component: Confirm,
            props: true
            },
        ]
    },
    

    { path: '/:sessionId/bracelet',
             name: 'bracelet',
             component: Bracelet,
             props: true
            },
    { path: '/:sessionId/necklace',
             name: 'necklace',
             component: NecklaceSelector,
             props: true
    },
    { path: '/designs',
             name: 'Designs',
             component: Designs,
             props: true
    },
    { path: '/beads',
             name: 'BeadSelector',
             component: BeadSelector,
             props: true
    },
   
    {
        path: '/catalog',
        name: 'Catalog',
        component: Catalog
        
    },
    {
        path: '/:sessionId/cart',
        name: 'Cart',
        component: Cart,
        props: true
        
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '',
                component: AdminBeads
            },
            {
                path: 'add',
                component: AddBead
            }
        ]
    }
  ]

const router = new VueRouter({
mode: 'history',
routes,
scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
    }
});

sync(store, router);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
    router,
    store,
    created(){
        this.$store.dispatch('loadBeads');
        this.$store.dispatch('loadSessions');
    },
  render: h => h(App)
})
