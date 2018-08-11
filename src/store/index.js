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
    designImg: 'http://localhost:8080/static/mock-template-edit.png'
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
        
        setNecklaceBeads: (state, {selectedBeads}) => {
            state.selectedBeads = selectedBeads;
        },
        
         setEditedBeads: (state, {beadsEdit}) => {
            state.selectedBeads = beadsEdit;
        },
        
        addSelected: (state, bead) => {
            state.selectedBeads.push(bead);
        },
        
        removeSelected: (state, id) => {
            let index = state.selectedBeads.findIndex(bead => bead._id === id);
            state.selectedBeads.splice(index, 1);
        },
        
        addEdited: (state, bead) => {
            state.beadsEdit.push(bead);
        },
        
        removeEdited: (state, id) => {
            let index = state.beadsEdit.findIndex(bead => bead._id === id);
            state.beadsEdit.splice(index, 1);
        }
    }
})

const filter = (array, key, value) => array.filter(item => item[key] === value);



export default store