<template>
  <div class="bracelet-selector">
      
       <div class="header">
          <div class="header-container">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              
               <div class="buttons-buttons">
          <span>
      <router-link to="/" tag="button" class="create-btn">start over</router-link>
          <button class="create-btn">save for later</button>
          </span>
          </div>
              </div>
      </div>
      
      <div class="container">
          
          <div class="buttons-container-title"> <h2 v-if="selectedBeads.length && editingBeads === false">Design Your Bracelet</h2>
           
           <h2 v-if="!selectedBeads.length || editingBeads === true">Select Your Beads</h2>
           
           </div>
   
      <div class="necklace-selector-container" style="position: relative">

          <div class="design-necklace" v-if="selectedBeads.length && editingBeads === false">
               
          <div class="necklace-template">
              
              <div class="necklace-template-content">
                  
       
            <konva-component :selected-beads="selectedBeads" :necklace-length="necklaceLength" :necklace="necklace" :bracelet="bracelet" @save="saveCanvas"></konva-component>
                  <p>Image:</p>
                  <img :src="dataURL">     
     
   
    
   
              </div>
          
            
              
              </div>
              
              
                <div class="necklace-beads">
        <div class="beads-title">
            
            <p>Drag and drop your beads to position them on your bracelet.</p>
            
            
              </div>
              
                 <button class="btn-small-gray" @click="openBeads(selectedBeads)" style="width: 200px">edit beads</button>
                    
              
         
          </div>
              
         
       
              
          </div>
          
          <div class="necklace-container-bottom" v-if="selectedBeads.length && editingBeads === false">
         
       <div class="necklace-details">
              
            <div class="your-beads-list">
                <h3 style="margin-bottom: 0">Beads:</h3> 
            <div v-for="bead in selectedBeads">
            
                {{ bead.stone }}
                {{ bead.size }}
                {{ formatPrice(bead.price) | usdollar }}
            
            </div>
              <p>Total: {{ total | usdollar }}</p>
           </div>
           
           <div class="selected-details"><p>Length: {{ braceletLength }}</p> <p>Material: {{ selectedMaterial.type }}</p> <p>Color: {{ selectedMaterial.color }}</p></div>
              
              </div>
              
              <div class="checkout-button-container">
                   <button class="btn-small" @click="goToCheckout(braceletLength, selectedBeads)">save and checkout</button>
           </div>
          </div>
          
      <bead-selector :necklace="necklace" :bracelet="bracelet" :beads-edit="beadsEdit"  @selected="setBraceletBeads" @edited="setEditedBeads" v-if="!selectedBeads.length || editingBeads === true"></bead-selector>
      </div>
          
      </div>
  </div>
</template>

<script>
    
import KonvaComponent from './KonvaComponent.vue'
import BeadSelector from './BeadSelector.vue'
export default {
  name: 'bracelet',
    props: ['braceletLength', 'selectedMaterial', 'necklace', 'bracelet'],
  data () {
    return {
        editingBeads: false,
          beadsEdit: [],
            selectedBeads: [],
        draggableState: true,
            top: 0,
            left: 0

    }
  },
    
    components: {
        BeadSelector,
        KonvaComponent
    },
    
    computed: {
        
          totalBeads(){
        return this.selectedBeads;
        },
        
        total() {
        return Object.values(this.totalBeads)
        .reduce((acc, el) => acc + el.price, 0)
        .toFixed(2);
        }
    },
    
    methods: {
        
         stop: function(){
        this.draggableState = false;
        },
        
        start: function(){
            this.draggableState = true;
        },
        
        
        changePosition: function(top, left){
            this.top = top;
            this.left = left;
 
            },
        
        setBraceletBeads: function(selectedBeads){
            
            this.selectedBeads = selectedBeads;
           
    
        },
        
        setEditedBeads: function(beadsEdit){
            this.selectedBeads = beadsEdit;
            this.editingBeads = false;
        },
        
        openBeads: function(selectedBeads){
            
            var beadsEdit = this.selectedBeads;
            this.editingBeads = true;
            this.beadsEdit = beadsEdit;
            
        },
        
         goToCheckout: function(braceletLength, selectedBeads){
            this.$router.push({ name: 'Cart', params: {braceletLength: this.braceletLength, selectedBeads: this.selectedBeads, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet}});
        },
        
         formatPrice: function(value){
            return value.toFixed(2);
        }
    
    },
    
     filters: {
    usdollar: function(value) {
      return `$${value}`;
    }
  }
    
   
}
    

</script>

<style>
    
    .bracelet-selector {
  display: grid;

align-content: flex-start;
grid-template-areas:
                    "header header"
                    "content content";
min-height: 100vh;
min-width: 100vw;
margin: 0;
padding: 0;

    }
    
.bracelet-selector  h2 {
    text-align: center;
    }
    
    
    .container {
    display: grid;
    grid-area: content;
  
    max-width: 1100px;
        justify-content: center;
        margin-right: auto;
        margin-left: auto;
    }
    
         .necklace-selector-container {
    display: grid;
    padding: 10px;
    grid-gap: 20px;
           justify-content: center;

      
           
    }
    

    
 
    
      
       .bead-img-small-selected {
    width: 100%;
         height: 100%;
  object-fit: cover;
      user-select: none;
          margin: auto;
           border: 1px solid transparent;
          border-radius: 80%;
          -webkit-transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    transition-property: transform;
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
     grid-gap: 15px;
   
        width: 300px;
   
        
    }
    
    .edit-btn-container {
    width: 100%;
    }
    
    .beads-title {
    display: grid;

        padding: 0;
        margin: 0;
    }
   
    
    .selected {
        display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: 100px;
    
        align-content: flex-start;
    
    border: 1px solid #ddd;
    }
    
    .design-necklace {
        display: grid;
        grid-template-columns: auto minmax(auto, 800px);
        
      
        grid-gap: 30px;
     
    
 

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
  
        background-color: #f4f4f4;
    }
    
        .selected-alt {
        display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-auto-rows: 100px;
    
        align-content: flex-start;
    position: relative;
    border: 1px solid #ddd;
        top: 30;
         height: 300px;
    }
    
        .bead-img-small-selected-alt {
    width: 100%;
         height: 100%;
  object-fit: cover;
          margin: auto;
          cursor: pointer;
            position: absolute;
    }
    
    

</style>