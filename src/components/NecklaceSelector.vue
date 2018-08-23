<template>
  <div class="necklace-selector">
      
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
   
    
 
      <div class="buttons-container-title-necklace"> <h2 v-if="selectedBeads.length && editingBeads === false">Design Your Necklace</h2>
           
           <h2 v-if="!selectedBeads.length || editingBeads === true">Select Your Beads</h2>
           </div>
          
      
      <div class="necklace-selector-container" style="position: relative">

          <div class="design-necklace" v-if="selectedBeads.length && editingBeads === false">
          
              
                <div class="necklace-beads">
        <div class="beads-title">
            
            <p>Drag and drop your beads to position them on your necklace.</p>
            
            
              </div>
              
                 <button class="btn-small-gray" @click="openBeads(selectedBeads)" style="width: 200px">edit beads</button>
                    
              
         <p>Selected: {{ selected }}</p>
                <button class="btn-small" @click="rotate">rotate</button> 
          </div>
              
              
          <div class="necklace-template">
              
              <div class="necklace-template-content">
              
                  <div class="svg-container">
        <canvas ref="canvas"></canvas>
         </div>          
     
    <VueDragResize v-for="(bead, index) in selectedBeads"
                   :key="bead._id"
                   :isResizable="false"
                   :parentLimitation="true"
                   :isDraggable="draggableState"
                   @dragging="changePosition"
                   
                   >

       
              <img class="bead-img-small-selected-alt" :src="bead.image" />
     

        </VueDragResize>
    
   
              </div>
          
              <p>{{ top }} and {{ left }}</p>
              <span><button class="btn-small" @click="stop">stop</button> <button class="btn-small" @click="start">start</button>
              </span>
              
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
           
           <div class="selected-details"><p>Length: {{ necklaceLength }}</p> <p>Material: {{ selectedMaterial.type }}</p> <p>Color: {{ selectedMaterial.color }}</p></div>
              
              </div>
              
              <div class="checkout-button-container">
                   <button class="btn-small" @click="goToCheckout(necklaceLength, selectedBeads)">save and checkout</button>
           </div>
          </div>
          
      <bead-selector :necklace="necklace" :bracelet="bracelet" :beads-edit="beadsEdit" :selected-type="selectedType" @selected="setNecklaceBeads" @edited="setEditedBeads" v-if="!selectedBeads.length || editingBeads === true"></bead-selector>
      </div>
  
      </div>
  </div>
</template>

<script>
import CanvasComponent from './CanvasComponent.vue'
import VueDragResize from 'vue-drag-resize'
import BeadSelector from './BeadSelector.vue'
export default {
    data(){
        return {
            editingBeads: false,
            beadsEdit: [],
            selectedBeads: [],
            isSelected: false,
            degrees: 0,
            style: {},
            selected: undefined,
            draggableState: true,
            top: 0,
            left: 0
         
        }
    },
  name: 'necklace',
    props: ['necklaceLength', 'selectedMaterial', 'necklace', 'bracelet'],
    components: {
        BeadSelector,
        VueDragResize,
        CanvasComponent

    },
    
 
    
    
    computed: {
        
       
        computedStyle(){
            return this.style;
        },
        

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
        
        loadCanvasTemplate: function(){
            
            var canvas = this.$refs.canvas;
            var ctx = canvas.getContext("2d");
          
            ctx.beginPath();
            ctx.arc(95,50,40,0,2*Math.PI);
            ctx.stroke();
        },
        
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
        
        copyImg: function(temp){
            this.copied = true;
            this.src = temp.srcElement.src;
            
            
        },
        
        setNecklaceBeads: function(selectedBeads){
            
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
        
        goToCheckout: function(necklaceLength, selectedBeads){
            this.$router.push({ name: 'Cart', params: {necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, selectedBeads: this.selectedBeads, necklace: this.necklace, bracelet: this.bracelet}});
        },
            rotate: function(){
            
         
            var degrees = this.degrees += 36;
            
            this.style = {
                transform: 'rotate('+degrees+'deg)'
            }
        },
        
        revert: function(){
            var degrees = this.degrees;
            degrees = 0;
             this.style = {
                transform: 'rotate('+degrees+'deg)'
            }
        },
        
        onActivated: function(bead){
            this.selected = bead._id;
        },
            formatPrice: function(value){
            return value.toFixed(2);
        }
    
    
      
  
  },
    
  filters: {
    usdollar: function(value) {
      return `$${value}`;
    }
  },
    
    
}
</script>

<style>
    
    .necklace-selector {
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
    
.necklace-selector  h2 {
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
    
    
       .buttons-container-title-necklace {
display: grid;
  justify-content: center;

       margin-bottom: 20px;
        padding: 30px;
    padding-top: 20px;
        padding-bottom: 10px;

    }
  
    
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
    
    
    
       .necklace-selector-container {
    display: grid;
    padding: 10px;
    grid-gap: 20px;
           justify-content: center;
            position: relative;
      
           
    }
    
    .necklace-template {
    display: grid;
border: 1px solid #eee;
 position: relative;
   padding: 5px;
    
 

    }
    
    .necklace-template-content {
 display: grid;
        
        border: 1px solid #eee;
        position: relative;
        height: 600px;
    }
    
    #temp {
    max-height: 700px;
        border: 1px solid #ddd;
   position: relative;
    
    }
    
    .template-copy {
    max-height: 700px;
    border: 1px solid blue;
    min-height: 200px;
    }
    
    #template-copy-img {
    max-height: 700px;
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
  
        background-color: #f4f4f4;
    }
    
    .notes {
    display: grid;
 
    min-height: 200px;
    align-content: flex-start;
    padding: 20px;
    background-color: #f4f4f4;
    }
    
    .notes p {
    padding-top: 0;
      
    }
    
    .notes textarea {
    min-height: 200px;
    }
    
    .checkout-button-container {
    display: grid;
    justify-content: flex-end;
  
     
        align-content: center;
    grid-gap: 30px;
    
    padding: 30px;
    }
    
    .edit-beads-link {
    color: #8a52a3;
    cursor: pointer;
 
    display: grid;
  align-content: flex-end;
    grid-template-rows: auto auto;
        justify-content: flex-start;
    }
    
    #left {
    font-size: 40px;
 
    margin: 0;
    padding: 0;
    }
    
    .notes-textarea {
        font-family: 'Karla';
         font-weight: 300;
    font-size: 16px;
    padding: 10px 12px;
    min-height: 150px;
    border: 1px solid #777;
    border-radius: 8px;
    }
    
    .dragcontainer {
         -webkit-transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    transition-property: transform;
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
    
     .svg-container {
    display: grid;
    width: auto;
    height: auto;

         position: relative;
         border: 1px solid red;
    }
    
    svg {
    border: 1px solid #eee;
        margin: auto;
       
        
    }
    
    .ellipse-class {

    }
    
    .selected-details {
    display: grid;
grid-template-columns: auto auto auto;
        justify-content: center;
        grid-gap: 15px;
    text-align: center;
        margin-bottom: 30px;

    }
    
    .selected-details p {
    margin: 0;
    padding: 0;
    }
  
</style>