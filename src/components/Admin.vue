<template>
<div class="admin">

    <div class="admin-container">

    <div class="admin-header">
    <router-link to="/admin"><h2>Admin Panel</h2></router-link>
        <div class="admin-links" v-if="isAuthenticated">
            <router-link class="admin-link" to="/admin">all beads</router-link>
            <router-link class="admin-link" to="/admin/add">add new bead</router-link>


               <span class="logout-link" @click='logout()'>logout</span>

        </div>
    </div>


       <router-view></router-view>

    </div>




    </div>
</template>
<script>
export default {
data(){
  return {

  }
},

    name: 'Admin',


    computed: {
        isAuthenticated(){
            return this.$store.getters.isAuthenticated;
        },

        beads(){
            return this.$store.state.beads;
        }
    },

    methods: {

      logout: function(){
          this.$store.commit('AUTH_LOGOUT')
          this.$router.push('/admin')
      }
    }
}


</script>
<style>
    .admin {
    display: grid;
    width: 100vw;
    min-height: 100vh;
    justify-content: center;
    margin-bottom: 100px;
    }

    .admin h2 {
    margin: 0;
    padding: 0;
    }

    .admin-container {
    width: 975px;
    border: 1px solid #ddd;
    min-height: 500px;

    }

    .admin-header {
    display: grid;
    grid-template-columns: auto auto;
    align-content: center;
    grid-gap: 30px;
    margin-bottom: 30px;
    padding: 15px;
    border: 1px solid #ddd;
    border-top: none;
    border-right: none;
    border-left: none;
    }

    .admin-links {
    display: grid;
   grid-auto-flow: column;
        align-content: center;
        justify-content: flex-end;
    grid-gap: 20px;
    margin: 0;
    padding: 0;

    }

    .admin-link{
    font-size: 16px;
    border-bottom: 1px solid #ad81c0;
    padding-bottom: 0px;
    }

    .logout-link {
      color: #ad81c0;
      font-size: 16px;
      border-bottom: 1px solid #ad81c0;
      padding-bottom: 0px;
      cursor: pointer;
    }

    .logout-link:hover {
      color: #8a52a3;
    }

</style>
