//index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({

state: {
    beads: []
},
    
  
    actions: {
        
         loadBeads: function ({commit}) {
      axios.get('http://localhost:3000/beads').then((response) => {
        commit('setBeads', { beads: response.data})
        })
        }
    },
    
    mutations: {
        
        setBeads: (state, {beads}) => {
            state.beads = beads;
        }
        
    }
    
})

const filter = (array, key, value) => array.filter(item => item[key] === value);



export default store