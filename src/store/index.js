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
        
        changeLeft: (state, payload) => {
            state.beads[payload.id].left = payload.left;
        },
        
        changeTop: (state, payload) => {
            state.beads[payload.id].top = payload.top;
        },
        
         START_MOVE: (state, { targetId })=> {
    state.targets.forEach(target => {
      if (target.id === targetId) {
        target.isDragging = true;
      }
    });
  },
      
  STOP_MOVE: (state, { targetId }) =>{
    state.targets.forEach(target => {
      if (target.id === targetId) {
        target.isDragging = false;
      }
    })
                          
  },
                          
  MOVE: (state, { targetId, position }) => {
    state.targets.forEach(target => {
      if (target.id === targetId) {
        target.x = position.x;
        target.y = position.y;
      }
    })
  }

},
    
    getters: {
        
        opalBeads: state => {
            return state.beads.filter(bead => bead.stone === 'Opalite');
        },
        
        opalBeadsImgs: (state, getters) => {
            return getters.opalBeads.map(bead => bead.image);
        }
        
    }
})

const filter = (array, key, value) => array.filter(item => item[key] === value);



export default store