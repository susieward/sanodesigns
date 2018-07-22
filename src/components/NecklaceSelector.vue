<template>
  <div class="necklace-selector">
       <div class="buttons-container">
          
      <span>
      <router-link to="/" tag="button" class="create-btn">start over</router-link>
          <button class="create-btn">save for later</button>
          </span>
      </div>
      
      
      <div class="necklace-selector-container">
          
          <div class="selected" v-if="selectedBeads.length">
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
          
         
      
          
      <bead-selector @selected="setNecklaceBeads" v-if="!selectedBeads.length"></bead-selector>
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
    
    .selected {
    display: grid;
    grid-template-columns: auto auto auto auto;
    min-height: 200px;
    max-width: 600px;
    }
    
    .beads-and-search {
    display: grid;
        grid-template-rows: auto auto;
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
  justify-content: center;
    border: 1px solid #ddd;
    padding: 10px;
    grid-gap: 20px;
       
      
    }
    
    .necklace-template {
    height: auto;
    width: 500px;
    border: 1px solid #ddd;
    background-color: #f4f4f4;
    }
    
    .select-beads {
    display: grid;
    grid-template-columns: auto auto;
    min-height: 400px;
    min-width: 500px; 
    border: 1px solid #ddd;
    }

    .beads-container-selector {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
   justify-content: flex-start;
      max-height: 500px;
        max-width: 900px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
    
    .bead-container {
        width: 100px;
       height: auto;
        border: 1px solid #ddd;
        border-radius: 50%;
    }
    
     .bead-img-small {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
   .search-container {
    display: grid;
    justify-content: center;
        align-items: center;
         align-content: flex-start;
    padding: 30px;
    min-width: 700px;
 
    }
    
    
    .searchbar {
    height: 50px;
    width: 500px;
    padding: 10px 12px;
    font-size: 20px;
    border: 1px solid #aaa;
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
    
    .selected-container {
    display: grid;
    grid-template-columns: auto auto;
    align-content: flex-start;
    border: 1px solid #ddd;
  
        min-width: 200px; 
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