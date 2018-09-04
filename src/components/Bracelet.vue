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
   
      <div class="necklace-selector-container">

          <div class="design-necklace" v-if="selectedBeads.length && editingBeads === false">
               
          <div class="necklace-template">
              
              <div class="necklace-template-content">
                  
       
            <konva-component :selected-beads="selectedBeads" :necklace-length="necklaceLength" :bracelet-length="braceletLength" :necklace="necklace" :bracelet="bracelet" @save="saveCanvas"></konva-component>
   
    
   
              </div>
           </div>
              
              
                             <div class="necklace-beads">
        <div class="beads-title">
            <p>Drag your beads to position them on your necklace.</p>
            <span style="font-size: 12px; line-height: normal; color: #7c7c7c; margin-bottom: 20px">(*Color of template line doesn't reflect your actual material color!)</span>
            
            </div>
              
                 <button class="btn-small-gray" @click="openBeads(selectedBeads)" style="width: 200px">edit beads</button>
                           
 <div style="margin-top: 40px">
              <h3>Details:</h3>
                            <div class="necklace-dtails">
                   <span class="necklace-dtail-text">Size:</span> <span>{{ braceletSize }} ({{ formatLength(braceletLength) }})</span>
                   <span class="necklace-dtail-text">Material:</span> <span>{{ selectedMaterial.type }}</span>
                   <span class="necklace-dtail-text">Color:</span> <span>{{ selectedMaterial.color }}</span>
                 </div>
            
                
          </div> 
        </div>
              
         
       
              
          </div>
          
          <div class="necklace-container-bottom" v-if="selectedBeads.length && editingBeads === false">
         
        <div class="necklace-details">
              
            <div class="your-beads-list">
                <h3>Beads:</h3> 
            <div v-for="bead in selectedBeads">
            
                <span>{{ bead.stone }} ({{ formatBeadSize(bead.size) }})</span> <span style="float: right">{{ formatPrice(bead.price) | usdollar }}</span>
            
            </div>
              <p>Total: {{ total | usdollar }}</p>
           </div>
          
  
          
           </div>
              
             <div class="checkout-button-container">
                  
                  <div style="display: grid; justify-content: flex-end; align-self: flex-end;">
                  <p v-if="clickSave === false" style="margin-bottom: 20px; text-align: right;">Please click "save design" before checking out.</p>
                   <button style="width: 270px; margin-left: auto" class="btn-small" @click="goToCheckout(braceletLength, selectedBeads)">continue to checkout</button>
                  </div>
           </div>
          </div>
          
      <bead-selector :necklace="necklace" :bracelet="bracelet" :beads-edit="beadsEdit" :selected-type="selectedType" @selected="setBraceletBeads" @edited="setEditedBeads" v-if="!selectedBeads.length || editingBeads === true"></bead-selector>
      </div>
          
      </div>
  </div>
</template>

<script>
    
import KonvaComponent from './KonvaComponent.vue'
import BeadSelector from './BeadSelector.vue'
export default {
  name: 'bracelet',
    props: ['braceletLength', 'braceletSize', 'selectedMaterial', 'necklace', 'bracelet'],
  data () {
    return {
        editingBeads: false,
          beadsEdit: [],
            selectedBeads: [],
        draggableState: true,
            top: 0,
            left: 0,
            dataURL: '',
            clickSave: false

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
        
         
        saveCanvas: function(dataURL){
                this.dataURL = dataURL;
                this.clickSave = true;
            
        },
        
      formatLength: function(value){
            return value + '' + ' cm'
        },
        
           formatBeadSize: function(value){
            return value + '' + ' mm'
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
            this.$router.push({ name: 'Cart', params: {braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedBeads: this.selectedBeads, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, dataURL: this.dataURL}});
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
    
          .header {
grid-area: header;
display: grid;
align-content: center;
width: 100vw;
background-color: #F4F4F4;
justify-content: center;
height: 103px;
  margin-bottom: 34px;


}

   .header-container {
    display: grid;
    grid-template-areas: "title buttons";
        grid-gap: 10px;
    align-content: center;
    width: 1060px;

        padding-bottom: 2px;

   
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
    
     .necklace-dtails {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(3, 1fr);
    justify-content: flex-start;
        align-content: center;

    
    
    
    }
    
    .necklace-dtail-text {
    margin-right: 30px;
    font-size: 16px;
        margin-bottom: 5px;
        line-height: 24px;
    }
    
     .checkout-button-container {
    display: grid;
    justify-content: flex-end;
    align-content: center;
    grid-gap: 30px;
    padding: 30px;
    }
    
       .necklace-template {

min-height: 700px;
   padding: 0px;
    
 

    }

</style>