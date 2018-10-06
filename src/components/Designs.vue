<template>
  <div class="designs">
        <div class="header">
          <div class="header-container">
              
              <div class="title">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              </div>
              
               <div class="buttons-buttons">
          <span>
      <button class="create-btn" @click="deleteLocalStorage">start over</button>
          <button class="create-btn" @click="saveForLater">save for later</button>
          </span>
          </div>
              </div>
      </div>
     
      <div class="create-container">

              
            
              
            
              
              
              </div>
          </div>
              

</template>
<script>
export default {
data() {
    return {
        
    }
},
    
    name: 'Designs',
    
    props: [],
    
    computed: {
        
        sessionId(){
            
            return this.$session.id();
        }
    }
}

</script>