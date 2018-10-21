//index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = new Vuex.Store({

state: {
    beads: [],
    token: localStorage.getItem('user-token') || '',
    status: '',
    localBeads: JSON.parse(localStorage.getItem('beads-key')) || [],
    savedSessions: JSON.parse(localStorage.getItem('saved-sessions')) || [],
    sessions: []
},


    actions: {

         loadBeads: function ({commit}) {
      axios.get('https://sanodesigns-server.herokuapp.com/beads').then((response) => {
        commit('setBeads', { beads: response.data})
        })
        },

        loadSessions: function({commit}){

            var saved = window.localStorage.getItem('saved-sessions');

            if(saved){
                    commit('setSessions', {saved: JSON.parse(saved)});

            }

        }
    },

    mutations: {

      AUTH_REQUEST: (state) => {
          state.status = 'loading'
      },

      AUTH_SUCCESS: (state, {token}) => {
          localStorage.setItem('user-token', token)

           axios.defaults.headers.common['Authorization'] = token

          state.status = 'success'
          state.token = token
      },

      AUTH_ERROR: (state) => {
          localStorage.removeItem('user-token')
          state.status = 'error'

      },

      AUTH_LOGOUT: (state) => {
          localStorage.removeItem('user-token')
          delete axios.defaults.headers.common['Authorization']
          state.token = ''
      },


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


        setSessions: (state, {saved}) => {


            state.sessions = saved;

        },

        saveSession: (state, {session}) => {

            let sessions = state.sessions;
            sessions.push(session);

             localStorage.setItem('saved-sessions', JSON.stringify(sessions));

            state.savedSessions = JSON.parse(localStorage.getItem('saved-sessions'));

        },

        deleteSession: (state, id) => {

           let sessions = state.sessions;

            let index = sessions.findIndex(session => session.id === id);

            sessions.splice(index, 1);

            localStorage.setItem('saved-sessions', JSON.stringify(sessions));

            state.savedSessions = JSON.parse(localStorage.getItem('saved-sessions'));

        },

        deleteSessions: (state) => {

            localStorage.removeItem('saved-sessions');
            state.sessions = [];
            state.savedSessions = [];

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

      isAuthenticated: state => !!state.token,

      authStatus: state => state.status,

        savedIds: state => {

            return state.savedSessions.map(session => session.id);
        },

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
