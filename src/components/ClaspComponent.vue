<template>
<div class="clasp-component">
    <div class="clasp-component-container">
    
          <div class="select-clasp-container">
   <h2 style="text-align: center">Select Clasp</h2>

  <div class="clasp-selector">
      
      
    
           
           <div class="option">
                  <div class="clasp-image">
                      <img class="clasp-img" src="/static/lobster.jpg"/></div>
               
               <span class="rad"><input type="radio" id="lobster" value="Lobster"  @change="selectClasp" v-model="selectedClasp"/>
              <label for="lobster">Lobster</label></span>
           </div>
           
      <div class="option">
           <div class="clasp-image">
           <img class="clasp-img" src="/static/toggle.jpg"/>
           </div>
            
          <span class="rad"><input type="radio" id="toggle" value="Toggle"  @change="selectClasp" v-model="selectedClasp"/>
                  <label for="toggle">Toggle</label></span>
              </div>
      
    
      

      
    
              </div>
        </div>
    
    </div>
    </div>
</template>
<script>
    
export default {
    
data(){
    return {
        claspChosen: false,
        selectedClasp: ''
    }
},
name: 'ClaspComponent',
    
props: ['necklace', 'bracelet', 'necklaceLength', 'braceletLength', 'braceletSize', 'selectedMaterial', 'selectedType', 'selectedMaterial'],
    
 mounted: function(){
        
          
          if(this.$session.has('sessionType')){
             this.selectedType = this.$session.get('sessionType')
         }
        
          if(this.$session.has('sessionNecklace')){
             this.necklace = this.$session.get('sessionNecklace')
         }
        
         if(this.$session.has('sessionBracelet')){
             this.bracelet = this.$session.get('sessionBracelet')
         }
          
          if(this.$session.has('sessionNecklaceLength')){
             this.necklaceLength = this.$session.get('sessionNecklaceLength')
         }
        
         if(this.$session.has('sessionBraceletLength')){
             this.braceletLength = this.$session.get('sessionBraceletLength')
         }
          
          if(this.$session.has('sessionBraceletSize')){
             this.braceletSize = this.$session.get('sessionBraceletSize')
         }
        
         if(this.$session.has('sessionMaterial')){
             this.selectedMaterial = this.$session.get('sessionMaterial')
         }
    },
    
     computed: {
     
              
        sessionId(){
            
            
            return this.$session.id();
        },

        
        sessionData(){
            
            return this.$session.getAll();
        }

    },
    
methods: {
    
    selectClasp: function(){
        this.claspChosen = true;
        this.$session.set('sessionClasp', this.selectedClasp);
            
            this.$router.push({ name: 'Confirm', params: {sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType, selectedClasp: this.selectedClasp}});
        
    }
}
    
 
    
}


</script>
<style>
    
    .clasp-component-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;

    }
    
    .select-clasp-container {
        display: grid;

grid-gap: 30px;
        justify-content: center;

    }
    
    .clasp-selector {
    display: grid;
    grid-template-columns: auto auto;


    padding: 10px;
    grid-gap: 40px;
    }
    

    
    .option {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
       grid-template-rows: auto auto;
    }
    
    .clasp-image {
      height: 200px;
    width: 200px;
    border: 1px solid #ddd;  
        
        
    }
    
    .clasp-img {
      height: 100%;
    width: 100%;   
    }
    
     .clasp-radios {
         grid-area: radio;
       display: grid;
        grid-template-columns: auto auto;

  
    }
    
    .rad {
        margin: auto;
    }
    
    
/* media queries */
    
    
    @media screen and (max-width: 1200px){
        
   .clasp-component-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
       width: 860px;

    
    }
 
     .select-clasp-container {
        display: grid;


        justify-content: center;
    }
    

    
    .clasp-selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
    }
    
  
    }
    
       @media screen and (max-width: 1000px){
        
   .clasp-component-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 640px;

    
    }
 
     .select-clasp-container {
        display: grid;
         grid-gap: 30px;


        justify-content: center;
    }
    
   
    
    .clasp-selector {
    display: grid;
    grid-template-columns: auto auto;
justify-content: center;
    padding: 10px;
    grid-gap: 20px;

    }
   
    }
    
    
       @media screen and (max-width: 766px){
           
    .clasp-component-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 600px;

    
    }
           
           
           
              .clasp-selector {
    display: grid;
    grid-template-columns: auto auto;
justify-content: center;
    padding: 10px;
    grid-gap: 20px;
 
    }
           
   
    
    }
    
    
    
    
    @media screen and (max-width: 600px){
        
        
    .clasp-component-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 400px;

    
    }
       
        
    .clasp-selector {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
justify-content: center;
        align-items: center;
    padding: 10px;
    grid-gap: 20px;
 
    }
        
        
    }
    
    
       @media screen and (max-width: 400px){
           
   .clasp-component-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 400px;

    
    }
           
           
           
              .clasp-selector {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
justify-content: center;
    padding: 10px;
    grid-gap: 20px;
 
    }
           
           
  
           
    }
</style>