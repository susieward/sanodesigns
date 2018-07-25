<template>
  <div class="necklace-selector">
      
      
           
      <div class="buttons-buttons">
          <span>
      <router-link to="/" tag="button" class="create-btn">start over</router-link>
          <button class="create-btn">save for later</button>
          </span>
          </div>
 
      <div class="buttons-container-title"> <h2 v-if="selectedBeads.length">Design Your Necklace</h2>
           
           <h2 v-if="!selectedBeads.length">Select Your Beads</h2>
           
           </div>
      
      <div class="necklace-selector-container" style="position: relative">

          <div class="design-necklace" v-if="selectedBeads.length">
          
              
                <div class="necklace-beads">
        <div class="beads-title">
            <span><button class="btn-small-gray">edit</button></span>
            <p>Drag and drop your beads to position them on your necklace.</p>
            
              </div>
              
              
              <div class="selected">
                 
      <div v-for="bead in selectedBeads" style="position: relative">
              
         <vue-draggable-resizable :resizable="false" :w="100" :h="100" :drag-handle="'.drag'" style="user-select: none;"> 
             <div class="drag"></div>
            
             <div class="bead-container-selected">
              <img class="bead-img-small-selected" :src="bead.image"/>
             </div>
           
         </vue-draggable-resizable>
             
          
                  </div>
                  
          
              </div>
          </div>
              
              
          <div class="necklace-template">
              <div class="necklace-template-content">
              </div>

              </div>
              
       
              
          </div>
          
          <div class="necklace-container-bottom" v-if="selectedBeads.length">
         
       <div class="necklace-details">
              
            <div class="your-beads-list">
            <div v-for="bead in selectedBeads">
            
                {{ bead.stone }}
                {{ bead.size }}
                {{ bead.price }}
            
            </div>
                <p>Beads total: $4.80</p>
            </div>
            
            <div class="notes">
            <h3>Notes:</h3>
                
            <textarea></textarea>
            
            
            </div>
           
           
              
              </div>
              
              <div class="checkout-button-container">
                   <button class="btn-small">save and checkout</button>
           </div>
          </div>
          
      <bead-selector :selected-type="selectedType" @selected="setNecklaceBeads" v-if="!selectedBeads.length"></bead-selector>
      </div>
  
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
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
        BeadSelector,
        VueDraggableResizable

    },
    
    methods: {
        setNecklaceBeads: function(selectedBeads){
            this.selectedBeads = selectedBeads;
        }
    }
    
}
</script>

<style>
    
    .drag {
      color: #000;
   margin-bottom: 0px;
    cursor: pointer;
     width: 30px;
   height:30px;
        font-size: 20px;
        position: absolute;
        top: 25%;
        left: 45%;

        padding: 20px;
    }
    
       .bead-img-small-selected {
    width: 100%;
         height: 100%;
  object-fit: cover;
      user-select: none;
          margin: auto;
           border: 1px solid transparent;
          border-radius: 80%;
  
   
    }
    
    .bead-container-selected {
       width: 130px;
        height: 80px;
      margin: auto;
  user-select: none;
         border: 1px solid transparent;
        border-radius: 50%;
    }
    

    
    .necklace-beads {
    display: grid;
   
       
    align-content: flex-start;
     
        border: 1px solid #000;
        width: 300px;
        padding: 10px;
        
    }
    
    .beads-title {
    display: grid;

        padding: 0;
        margin: 0;
    }
   
    
    .selected {
        display: grid;
    grid-template-columns: auto auto;
        grid-auto-flow: row;
        grid-template-rows: auto auto auto auto auto auto;
        align-content: flex-start;
    min-height: 400px;
    border: 1px solid #ddd;
    }
    
    .design-necklace {
        display: grid;
        grid-template-columns: auto minmax(auto, 900px);
        
        justify-content: center;
        grid-gap: 30px;
        max-width: 1000px;
    
 

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
           justify-content: center;
    }
    
    .necklace-template {
    display: grid;

 
    min-width: 400px;
    
    background-color: #f4f4f4;

    }
    
    .necklace-template-content {

    }
    
  

    
   
    
    .buttons-container-title {
display: grid;
  justify-content: center;

       margin-bottom: 20px;
        padding: 30px;
    padding-top: 20px;
        padding-bottom: 20px;
  
    }
    
    .buttons-buttons {
    display: grid;
        justify-content: flex-end;
        padding-top: 5px;
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
    
    .bead {

    display: grid;
    justify-content: center;
        padding: 5px;
         border: 1px solid #eee;
        cursor: pointer;
    }
    
    .bead:hover {
        border: 1px solid #C4A8D1;
    }
    
    .necklace-container-bottom {
    display: grid;
  
   
    }
    
    .necklace-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
 
        align-content: center;

    }
    
    .your-beads-list {
    padding: 30px;
      border: 1px solid #ddd;  
    }
    
    .notes {
    display: grid;
    border: 1px solid #ddd;
    min-height: 200px;
    align-content: flex-start;
    padding: 20px;
    }
    
    .notes textarea {
    min-height: 200px;
    }
    
    .checkout-button-container {
    display: grid;
    justify-content: flex-end;
  
     
        align-content: center;
    grid-gap: 30px;
    border: 1px solid #ddd;
    padding: 30px;
    }
    
    
</style>