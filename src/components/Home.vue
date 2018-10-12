<template>
  <div class="home">
 
      <div class="home-container">


<h2>Create Your Own Design</h2>
      <div class="start" v-if="!hasSession">
          <router-link to="/create/type" tag="button" class="btn">get started</router-link>
          </div>
          
          <div class="start" v-if="hasSession">
          
              <button class="btn" @click="continueSession">continue</button>
               <p style="text-align: center">or</p>
              
            <button class="btn" @click="newSession">start new design</button>
          
          
          </div>
          
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {}
 },

    
    computed: {
        
        hasSession(){
            
            return this.$session.exists();
        },
        
        beads(){
            return this.$store.state.beads;
        },
        
        sessionId(){
            return this.$session.id();
        },
        
   
        
          sessionData(){
            
            
            return this.$session.getAll();
        },
        
            savedSessions(){
            
            return this.$store.state.savedSessions;
        },
        
        sessions(){
            
            return this.$store.state.sessions;
        },
    },
    
    methods: {
        
        continueSession: function(){
            
            if(this.$session.exists()){
                  this.$router.push({ name: 'Confirm', params: {sessionId: this.sessionId}})
                }
            
        },
        
        newSession: function(){
            
           this.$store.commit('deleteLocalBeads');
            this.$session.destroy();
            if(!this.$session.exists()){
                    this.$router.push('/create/type');
                }
            
        },
        
            deleteLocalStorage: function(){
            this.$store.commit('deleteLocalBeads');
            this.$session.destroy();
            if(!this.$session.exists()){
                    this.$router.push('/');
                }
  
        },
        
        deleteSessions: function(){
            
            this.$store.commit('deleteSessions');
            
        }
        
    }

}
</script>

<style>
    
    .bead-img {
    width: 100px;
    object-fit: cover;
    }
    
.home {
display: grid;

    align-content: flex-start;

grid-template-areas:

                    "content content";

margin: 0;
padding: 0;
border: 1px solid #eee;
    justify-content: center;

    }
    

    
    .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
 
    
    }
    
    .buttons-container-title {
display: grid;
  justify-content: center;

       margin-bottom: 30px;
        padding: 30px;
    padding-top: 20px;
        padding-bottom: 20px;

    }


    .home-container h2 {
    text-align: center;
    }
    
    .start {
    display: grid;
    justify-content: center;
    padding: 10px;
    }
    
     @media screen and (max-width: 1200px){
     .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 860px;
    
    }     
         
         
    }
    
     @media screen and (max-width: 1000px){
     .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 640px;
    
    }     
         
         
    }
    
    
     @media screen and (max-width: 766px){
     .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 600px;
    
    }     
         
         
    }
    
        @media screen and (max-width: 600px){
            

            
    .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 400px;
    
    }
    }
     
    @media screen and (max-width: 400px){
        
        
           .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 390px;
 
    }
        
    }

</style>