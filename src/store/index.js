//index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({

state: {
    beads: [],
    selectedBeads: [],
    beadsEdit: [],
    localBeads: JSON.parse(localStorage.getItem('beads-key')) || [],
    localSession: localStorage.getItem('session-key') || []
},
    
  
    actions: {
        
         loadBeads: function ({commit}) {
      axios.get('https://sanodesigns-server.herokuapp.com/beads').then((response) => {
        commit('setBeads', { beads: response.data})
        })
        }
    },
    
    mutations: {
  
        
        setBeads: (state, {beads}) => {
            state.beads = beads;
        },
        
        addBead: (state, {bead}) => {
            state.beads.push(bead);
        },
        
        editBead: (state, {bead}) =>{
        let index = state.beads.findIndex(bead => bead._id === id);
            state.beads.splice(index, 1, bead);
        },
        
        deleteBead: (state, id) => {
            let index = state.beads.findIndex(bead => bead._id === id);
            state.beads.splice(index, 1);
        },
        
        setLocalSession: (state, {session}) => {
             localStorage.setItem('session-key', session);
            
            state.localSession = session;
        },
        
        setLocalBeads: (state, {localBeads}) => {
            
       
            localStorage.setItem('beads-key', JSON.stringify(localBeads));
            
            state.localBeads = JSON.parse(localStorage.getItem('beads-key'));
           
        },
        
        deleteLocalBeads: (state) => {
            
            localStorage.removeItem('beads-key');
            state.localBeads = [];
            
        },
        
        updateLocalBeads: (state, {beadsEdit}) => {
            localStorage.setItem('beads-key', beadsEdit);
            state.localBeads = beadsEdit;
            
        }
        
        
    },
        
    
    
    getters: {
        
        opalBeads: state => {
            return state.beads.filter(bead => bead.stone === 'Opalite');
        },
        
        opalBeadsImgs: (state, getters) => {
            return getters.opalBeads.map(bead => bead.image);
        },
        
        getLocalBeads: state => {
            return state.localBeads;
        }
        
    }
})

const filter = (array, key, value) => array.filter(item => item[key] === value);



export default store