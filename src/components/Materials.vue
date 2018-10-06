<template>
<div class="materials">
    <div class="create-container">
    
           <div class="breadcrumbs">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span> <span class="back"><router-link to="/create/session/type">jewelry type</router-link></span><span class="right-arrow">&rsaquo;</span><span class="back"><router-link to="/create/session/type/length">sizing</router-link></span><span class="right-arrow">&rsaquo;</span>material</span>
          
          </div>
   

    <div class="select-type-container">
   <h2 style="text-align: center">Select {{ selectedType }} Material</h2>

  <div v-if="necklace === true" class="selector">
              

              
           
               
              <div class="size-template-necklace">
                  
                <img class="necklace-length-img" src="/static/necklace-length-guide.jpg"/>
              
              </div>
              
                  
                   
                 
             
                      
    <div class="size">
     <div class="necklace-material-radios">
                     
       <span><input type="radio" id="Chain" name="material" value="Chain" @change="selectedChain" v-model="selectedMaterial.type"/>
              <label for="chain">Chain - $0.20 per cm</label></span>
                      
                
         
                <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Chain'" @change="setChainColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Copper">Copper</option>
                </select>
                
              
              <span><input type="radio" id="wire" name="material" value="Wire" @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Wire - $0.10 per cm</label></span>
                      
                      
                    <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Wire'" @change="setWireColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    </select>
              
              <span><input type="radio" id="cord" name="material"  value="cord" @change="selectedCord" v-model="selectedMaterial.type"/>
                  <label for="cord">Stretch cord - $0.05 per cm</label></span>
                      
                      <p v-if="selectedMaterial.type === 'Stretch cord'">Color: clear</p>
                      
                     
                     </div>
      </div>
           
                  
           
    

    </div>
    
       
   
  <div v-if="bracelet === true" class="selector">
              

              
           
                <div class="size-template-bracelet">
              
                  <img class="bracelet-size-img" src="/static/bracelet-size-guide.png"/>
              
              </div>
                   
                 
             <div class="size">
        <div class="necklace-material-radios">
                     
       <span><input type="radio" :id="chain" value="Chain" @change="selectedChain" v-model="selectedMaterial.type"/>
              <label for="chain">Chain - $0.20 per cm</label></span>
                      
                
         
                <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Chain'" @change="setChainColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Copper">Copper</option>
                </select>
                
              
              <span><input type="radio" :id="wire" value="Wire" @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Wire - $0.10 per cm</label></span>
                      
                      
                    <select v-model="selectedMaterial.color" class="colorselect" v-if="selectedMaterial.type === 'Wire'" @change="setWireColor">
                    <option disabled value="">Select color</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    </select>
              
              <span><input type="radio" :id="cord" value="cord" @change="selectedCord" v-model="selectedMaterial.type"/>
                  <label for="cord">Stretch cord - $0.05 per cm</label></span>
                      
                      <p v-if="selectedMaterial.type === 'Stretch cord'">Color: clear</p>
                      
                     
                     </div>
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
        materialChosen: false,
        selectedMaterial: {
            type: '',
            color: '',
            price: undefined
        },
        colorChosen: false,
        selectedColor: '',
               materials: ['chain', 'wire', 'stretch cord']
        
    }
},
    name: 'Materials',
    
    props: ['necklace', 'bracelet', 'necklaceLength', 'braceletLength', 'braceletSize', 'selectedType'],
    
     computed: {
             sessionId(){
            
            
            return this.$session.id();
        }
    },
    
    
    methods: {
        
        
         yes: function(){
            this.materialChosen = true;
        },
        

        
        selectedChain: function(){
         
             this.selectedMaterial.price = 0.20;
            
        },
        
         selectedWire: function(){
            
   
             this.selectedMaterial.price = 0.10;
            
        },
        
         selectedCord: function(){
            
            this.selectedMaterial.type = 'Stretch cord';
             this.selectedMaterial.color = 'clear';
             this.selectedMaterial.price = 0.05;
             this.colorChosen = true;
             
             this.$session.set('selectedMaterial', this.selectedMaterial);
            
             this.$router.push({ name: 'Confirm', params: { sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
            
        },
        
        setWireColor: function(){
            this.colorChosen = true;
            
            this.$session.set('selectedMaterial', this.selectedMaterial);
          
            this.$router.push({ name: 'Confirm', params: {necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
        },
        
        setChainColor: function(){
            this.colorChosen = true;
            
            this.$session.set('selectedMaterial', this.selectedMaterial);
           
            this.$router.push({ name: 'Confirm', params: {necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
        }
    }
}


</script>
<style>

       .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
      .select-type-container {
        display: grid;
        grid-gap: 30px;

        justify-content: center;
    }
    
    .selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
    }
    
     .size-template-necklace {
    height: 400px;
    width: 400px;
    border: 1px solid #ddd;
    }
    
    .necklace-length-img {
 
    height: 100%;
    width: 100%;
    }
    
    .size-template-bracelet {
    height: 440px;
    width: 440px;
    border: 1px solid #ddd;
    }
    
    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }
    
    .size {
       min-height: 400px;
        width: 400px;
  
    }

        .necklace-material-radios {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-gap: 20px;
    }
    
    .selectcolor {
   width: 50%;
    }

        
       .back {
 
    cursor: pointer;
   color: #ad81c0;
        
    }
    
    .back:hover {
        color: #8a52a3;
    }
    

    .right-arrow {

        font-size: 20px;
        color: #444;
        margin-right: 8px;
        margin-left: 8px;

    }
    
    .breadcrumbs {
    display: grid;
    font-size: 14px;
        line-height: 20px;
    text-transform: uppercase;
    color: #474747;
        text-align: center;
          margin-bottom: 15px;
        padding: 5px;
    }
    
    
    .headers {
    margin-bottom: 30px;
    }

</style>