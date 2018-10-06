<template>
  <div class="necklace-selector">
      
        <div class="header">
          <div class="header-container">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              
               <div class="buttons-buttons">
          <span>
      <button class="create-btn" @click="deleteLocalStorage">start over</button>
          <button class="create-btn">save for later</button>
          </span>
          </div>
              </div>
      </div>
      
      <div class="container">
   
    
 
      <div class="buttons-container-title-necklace"> 

          <h2 v-if="selectedBeads.length && editingBeads === false">Design Your Necklace</h2>
           
           <h2 v-if="!selectedBeads.length || editingBeads === true">Select Your Beads</h2>

           </div>
      <div class="necklace-selector-container">

          <div class="design-necklace" v-if="selectedBeads.length && editingBeads === false">
     <div class="necklace-template">

         <p style="color: red" v-if="maximumReached">{{ message }}</p>
              <div class="necklace-template-content">
              
           
        <canvas-component ref="canvasRef" :maximum-length="maximumLength" :total-beads-length="totalBeadsLength" :selected-beads="selectedBeads" :necklace-length="necklaceLength" :necklace="necklace" :bracelet="bracelet" @save="saveCanvas" @options="showOptions" @added="addTemplateBead" @deletebead="deleteTemplateBead" @copied="showCopied"></canvas-component>
                  
         </div>          
      </div>
                       <div class="necklace-beads">
        <div class="beads-title">
            <p style="margin-bottom: 0"><span class="instruction-number">1.</span> Click a bead once to copy it.</p>
                
            <p style="margin-bottom: 10; margin-top: 10"><span class="instruction-number">2.</span> Click anywhere in the template box to paste.<br>
            (You can repeat these steps multiple times for the same bead.)</p>
          
            
            <p style="margin-top: 0"><span class="instruction-number">3.</span> Drag template beads to position them your necklace.</p>
            <p>To rotate or delete a bead, select it by clicking on it and then click the rotate R/L or delete buttons.</p>
            <span style="font-size: 12px; line-height: normal; color: #7c7c7c; margin-bottom: 20px">(*Color of template line doesn't reflect your actual material color!)</span>
            
            </div>
              
               <button class="btn-small-gray" @click="openBeads(selectedBeads)" style="width: 200px">add/edit beads</button>
                           <span><button class="btn-small-gray" style="width: auto"@click="rotateLeft">rotate l</button> <button class="btn-small-gray"   style="width: auto" @click="rotateRight">rotate r</button></span>
                             <button class="btn-small-gray" style="width: 150px" @click="deleteBead">delete</button>
                           <button class="btn-small-gray" style="width: 150px" @click="resetBeads">reset</button>
                           
                        
 <div style="margin-top: 40px">
      
     
              <h3>Details:</h3>
                            <div class="necklace-dtails">
                   <span class="necklace-dtail-text">Length:</span> <span>{{ formatLength(necklaceLength) }}</span>
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
            <div v-for="bead in templateBeads">
            
                <span>{{ bead.stone }} ({{ formatBeadSize(bead.size) }}) x {{ bead.quantity }}</span> <span style="float: right">{{ formatPrice(bead.price) | usdollar }} per bead</span>
            
            </div>
              <p>Total: {{ total | usdollar }}</p>
           </div>
          
  
          
           </div>
            
               
              <div class="checkout-button-container">
                  
                  <div style="display: grid; justify-content: flex-end; align-self: flex-end;">
                   <button style="width: 270px; margin-left: auto" class="btn-small" @click="goToCheckout(necklaceLength, selectedBeads)">continue to checkout</button>
                  </div>
           </div>
            
          </div>
      <bead-selector :necklace="necklace" :necklace-length="necklaceLength" :bracelet="bracelet" :beads-edit="beadsEdit" :selected-type="selectedType" @selected="setNecklaceBeads" @edited="setEditedBeads" v-if="!selectedBeads.length || editingBeads === true"></bead-selector>
   
  
          </div>
      </div>
  </div>
</template>

<script>
import CanvasComponent from './CanvasComponent.vue'
import BeadSelector from './BeadSelector.vue'
export default {
    data(){
        return {
            editingBeads: false,
            beadsEdit: [],
            selectedBeads: [],
            editedBeads: [],
            isSelected: false,
            degrees: 0,
            style: {},
            selected: undefined,
            draggableState: true,
            top: 0,
            left: 0,
            dataURL: '',
            clickSave: false,
            beadSelected: false,
            selectedBead: '',
            templateBeads: [],
            max: false
        }
    },
  name: 'necklace',
    props: ['necklaceLength', 'selectedMaterial', 'necklace', 'bracelet'],
    components: {
        BeadSelector,
        CanvasComponent

    },
    

    
    computed: {
        
             sessionData(){
            
            return this.$session.getAll();
        },

        

             sessionId(){
            
            
            return this.$session.id();
        },
       
        computedStyle(){
            return this.style;
        },
        

        totalBeads(){
            return this.templateBeads;
        },
   
        
        total() {
            return Object.values(this.templateBeads)
            .reduce((acc, el) => acc + (el.quantity * el.price), 0)
            .toFixed(2);
        },
        
               
        totalBeadsLength() {
            
            
        
        return Object.values(this.templateBeads)
        .reduce((acc, el) => acc + (el.quantity * el.size), 0);
    
        },
        
        maximumLength(){
            
            if(this.necklace === true){
                
                return this.necklaceLength * 10;
                
            }
            
            if(this.necklace === false){
                
                return this.braceletLength * 10;
            }
        },
        
        message(){
            
              if(this.totalBeadsLength >= this.maximumLength){
                  
                  var msg = 'You have reached the maximum amount of beads that will fit on your chosen length! Please delete beads to continue.'
                return msg;
                
            }
        }
    },
    
 
    methods: {
    
        
        getSessionData: function(){
            
            return this.$session.getAll();
            
        },
     
        maximumReached: function(){
            if(this.totalBeadsLength >= this.maximumLength){
                  this.max = true;
            
                }
        },
        
               formatBeadSize: function(value){
            return value + '' + ' mm'
        },

        addTemplateBead: function(selectedBeadId){
            
         
            var id = Number(selectedBeadId);
            
            let templateBead = this.selectedBeads.find(bead => bead._id === id);
            
               var addedBead = this.templateBeads.find(bead => bead._id === id);
                
                if(this.templateBeads.includes(addedBead)){
                    addedBead.quantity++
               
                } else {
                    
                let copy = Object.assign({}, templateBead, {
                quantity: 1
            });
                 this.templateBeads.push(copy);
            
                }
       
            
            
        },
        
           deleteBead: function(){
            
        this.$refs.canvasRef.deleteBead();
        this.selectedBead = '';
            this.beadSelected = false;
            
        },
        
        deleteTemplateBead: function(selectedId){
            
           var id = Number(selectedId);
            
            var templateBead = this.templateBeads.find(bead => bead._id === id);
            
            if(templateBead.quantity > 1){
                
                templateBead.quantity--;
            } else {
                 var index = this.templateBeads.findIndex(bead => bead._id === id);
                
                 this.templateBeads.splice(index, 1);
            }
                
        },
        
        resetBeads: function(){
            
            this.$refs.canvasRef.resetBeads();
            this.templateBeads = [];
            this.deleteLocalBeads();
            
        },
                 
        rotateBead: function(){
            
         
                this.$refs.canvasRef.rotate();
            
          
            
        },
        
        rotateLeft: function(){
            
         
                this.$refs.canvasRef.rotateLeft();
            
          
            
        },
        
        rotateRight: function(){
            
         
                this.$refs.canvasRef.rotateRight();
            
          
            
        },
        
        deleteLocalBeads: function(){
            
           this.$store.commit('deleteLocalBeads'); 
            
        },
        
            deleteLocalStorage: function(){
            this.$store.commit('deleteLocalBeads');
            this.$session.destroy();
                if(!this.$session.exists()){
                     this.$router.push('/');
                }
  
        },
        
        
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
        
        
        setNecklaceBeads: function(selectedBeads){
            
            this.selectedBeads = selectedBeads;
            this.$session.set('selectedBeads', this.selectedBeads);

        },
        
         
        setEditedBeads: function(beadsEdit){
           
            this.selectedBeads = beadsEdit;
            this.editingBeads = false;
            this.$session.set('selectedBeads', this.selectedBeads);
            
       
        },
        
        openBeads: function(selectedBeads){
            this.$refs.canvasRef.saveBeadPositions();
            var beadsEdit = this.selectedBeads;
            this.editingBeads = true;
            this.beadsEdit = beadsEdit;
            
        },
        
        goToCheckout: function(necklaceLength, templateBeads){
            this.$refs.canvasRef.saveBeadPositions();
            this.$refs.canvasRef.print();
            if(this.clickSave === true){
                
            this.$session.set('templateBeads', this.templateBeads);
            this.$session.set('selectedBeads', this.selectedBeads);
            this.$session.set('localBeads', this.localBeads);
            
            
            this.$router.push({ name: 'Cart', params: {sessionId: this.sessionId, necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, templateBeads: this.templateBeads, necklace: this.necklace, bracelet: this.bracelet, dataURL: this.dataURL}});
            }
        },
        
        showOptions: function(selectedBead){
            
            this.beadSelected = true;
            this.selectedBead = selectedBead;
            
            
            
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
        grid-template-columns: minmax(auto, 800px) auto;
        
      
        grid-gap: 30px;
     
    
 

    }
    
    
    
       .necklace-selector-container {
    display: grid;
    padding: 10px;
    grid-gap: 20px;
           justify-content: center;
      
           
    }
    
    .necklace-template {

min-height: 700px;
   padding: 0px;
    
 

    }
    
    .necklace-template-content {

        min-height: 700px;
   


    }
    
    #temp {
    max-height: 700px;


    
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
  
    
    .selected-details p {
    margin: 0;
    padding: 0;
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
    
    
    .instruction-number {
    font-family: 'Playfair Display';
font-weight: 400;
font-size: 30px;
line-height: 30px;
    }
  
</style>