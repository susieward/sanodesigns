<template>
  <div class="necklace-selector">
       <div class="buttons-container">
          
      <span>
      <router-link to="/" tag="button" class="create-btn">start over</router-link>
          <button class="create-btn">save for later</button>
          </span>
      </div>
      
      
      <div class="necklace-selector-container">
<h2 v-if="selectedBeads.length">Design Your Necklace</h2>
          <div class="design-necklace" v-if="selectedBeads.length">
          
              
                <div class="necklace-beads">
        <div class="beads-title">
            <span><button class="btn-small-gray">edit</button></span>
              
              </div>
              
              
              <div class="selected">
      <div v-for="bead in selectedBeads">
              
              <div class="draggable-with-handler" v-draggable="draggableWithHandler">
                  
                 <div class="handler" ref="handler">
                    +
                </div>
                  
              <div class="bead-container-selected">
              <img class="bead-img-small-selected" :src="bead.image"/>
          </div>
              </div>
                  </div>
          
          
              </div>
          </div>
              
              
          <div class="necklace-template">
              
              fdgdfgsdf
              
              
              </div>
              
        
              
          </div>
         
      
          
      <bead-selector :selected-type="selectedType" @selected="setNecklaceBeads" v-if="!selectedBeads.length"></bead-selector>
      </div>
  
  </div>
</template>

<script>
import BeadSelector from './BeadSelector.vue'
export default {
    data(){
        return {
            selectedBeads: []
        }
    },
  name: 'necklace',
    props: ['necklaceLength', 'selectedType'],
    components: {
        BeadSelector
    },
    
    methods: {
        setNecklaceBeads: function(selectedBeads){
            this.selectedBeads = selectedBeads;
        }
    }
    
}
</script>

<style>
    .necklace-beads {
    display: grid;
    grid-template-rows: auto auto;
    align-content: flex-start;
        justify-content: center;
        border: 1px solid #000;
        
    }
    
    .beads-title {
    display: grid;

        padding: 0;
        margin: 0;
    }
    .selected {
    display: grid;
    grid-template-columns: auto auto;
        align-content: flex-start;

    min-height: 600px;
  
    border: 1px solid #ddd;
    }
    
    .design-necklace {
        display: grid;
        grid-template-columns: auto 900px;
        justify-content: center;
        grid-gap: 30px;
    
 

    }
    

.necklace-selector {
    display: grid;
    width: 100vw;

    }
    
.necklace-selector  h2 {
    text-align: center;
    }
    
    
       .necklace-selector-container {
    display: grid;
  

    padding: 10px;
    grid-gap: 20px;
    }
    
    .necklace-template {
 
    min-width: 500px;
    
    background-color: #f4f4f4;

    }
    

    
      .bead-img-small-selected {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
    
    .bead-container-selected {
        width: 120px;
       height: auto;
        border-radius: 50%;
    }
    
   
     .buttons-container {
    display: grid;
        margin-right: 50px;
        justify-content: flex-end;
    }
    
        .create-btn {
border: 1px solid #000;
background-color: #000;
padding: 10px 14px;
text-align: center;
font-family: 'Karla';
font-size: 18px;
line-height: 18px;
text-transform: uppercase;
color: #d9d9d9;
font-weight: 400;
cursor: pointer;
}
    
        
     .admin-bead-details {
        display: grid;
        grid-template-columns: auto auto;
justify-content: center;
      line-height: 20px;
        font-size: 14px;
    }
    
     .admin-prop-name {
    margin-right: 18px;
    }
    
    
</style>