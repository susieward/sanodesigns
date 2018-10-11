<template>
  <div class="designs">
     
      <div class="designs-container">
          
          <h2 style="text-align: center; margin-bottom: 35px">My Designs</h2>
    
           <div class="saved-designs" v-if="deleteAllClick === false">
      
               <div v-for="session in sessions" class="session">
               
                   
                   <div class="design-preview">
        <img :src="session.dataURL" class="design-preview-img"/>
        </div>
                   <div class="session-details">
               <p>{{ session.selectedType }}<br>
                   <span v-if="session.necklace">{{ formatLength(session.necklaceLength) }}</span>
                   
                   
                   <span v-if="session.bracelet">{{ session.braceletSize }} ({{ formatLength(session.braceletLength) }})</span>
                   
                   <br>
                   {{ session.selectedMaterial.type }}, {{ session.selectedMaterial.color }}

                   {{ session.bracelet }}
                   </p>
                   </div>
               <button class="btn-xsmall-gray" @click="deleteSession(session.id)">delete</button>
               
                <button class="btn-xsmall-gray" @click="resumeSession(session.id)">resume</button>
               </div>
               
    
               
          
          </div>
          
          <div>
          <button class="btn-small" @click="showDeleteAll" v-if="deleteAllClick === false">delete all designs</button>
          </div>
          
          <div v-if="deleteAllClick === true">
          
          <p>Are you sure you want to delete all saved designs? You can't undo this action!</p>
              
              <p><span>
                  
                  <button class="btn-small-gray" @click="deleteSessions">yes, delete</button>
                <button class="btn-small-gray" @click="cancelDeleteAll">no, cancel</button>
                  
                  </span></p>
          
          </div>
          
            
              
            
              
              
              </div>
          </div>
              

</template>
<script>
export default {
data() {
    return {
        
        deleteAllClick: false
        
    }
},
    
    name: 'Designs',
    
    props: [],
    
   
    
    computed: {

        savedSessions(){
            
            return this.$store.state.savedSessions;
        },
        
        sessions(){
            
            return this.$store.state.sessions;
        },
        
        savedIds(){
            
            return this.$store.getters.savedIds;
        },
        
        sessionId(){
            return this.$session.id();
        },

        
        sessionData() {
            return this.$session.getAll();
        }
        
        
    },
    
    methods: {
        
          formatLength: function(value){
            return value + '' + ' cm'
        },
        
        showDeleteAll: function(){
           
            this.deleteAllClick = true;
            
        },
        
        cancelDeleteAll: function(){
            
            this.deleteAllClick = false;
            
        },
        
        deleteAll: function(){
            
            this.$store.commit('deleteSessions');
            
        },
        
        deleteSession: function(id){
            
            this.$store.commit('deleteSession', id);
            
        },
        
        resumeSession: function(id){
            
            var sessId = id;
        
          var sessions = this.$store.state.sessions;
            
            var session = sessions.find(sess => sess.id === sessId);
            
           this.$session.start();
            
            
            this.$session.set('sessionType', session.selectedType);
            this.$session.set('sessionNecklace', session.necklace);
            this.$session.set('sessionBracelet', session.bracelet);
            this.$session.set('sessionNecklaceLength', session.necklaceLength);
            this.$session.set('sessionBraceletLength', session.braceletLength);
            this.$session.set('sessionBraceletSize', session.braceletSize);
            this.$session.set('sessionMaterial', session.selectedMaterial);
            this.$session.set('sessionSelected', session.selectedBeads);
            this.$session.set('sessionTemplate', session.templateBeads);
            this.$session.set('sessionLocal', session.localBeads);
            this.$session.set('sessionDataURL', session.dataURL);
            
            this.$router.push('/')
            
            


            
        
            
            
        }
        
        
    }
}

</script>
<style>
    
    
    .designs {
display: grid;

align-content: flex-start;
grid-template-areas:
                    "content content";
min-height: 100vh;
min-width: 100vw;
margin: 0;
padding: 0;
    }
    
    
    .designs-container {
        
grid-area: content;
display: grid;
width: 1050px;
padding-top: 20px;
padding: 30px;
grid-gap: 30px;
padding-top: 20px;
margin-right: auto;
margin-left: auto;

    }
    
    
.saved-designs {
display: grid;
grid-template-columns: auto auto auto auto;

width: 900px;
margin: auto;
justify-content: flex-start;
grid-gap: 25px;
margin-bottom: 30px;
    
}
    
.session {
width: 250px;
   border: 1px solid #ddd;
        
}
    
    .session-details {
  padding: 8px;
 
    }
    
.session-img {
        
}


    .design-preview {
    width: 250px;
    height: auto;
    border-bottom: 1px solid #ddd;
    }
    
    .design-preview-img {
    height: 100%;
    width: 100%;
           
    }
    



</style>