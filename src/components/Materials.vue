<template>
<div class="materials">
    
   
  <div v-if="necklace === true" class="selector">
              

              
           
               
              <div class="size-template-necklace">
                  
                <img class="necklace-length-img" src="/static/necklace-length-guide.jpg"/>
              
              </div>
              
                  
                   
                 
             
                      
    <div class="size">
     <div class="necklace-material-radios">
                     
       <span><input type="radio" id="chain" value="chain"  @change="selectedChain" v-model="selectedMaterial.type"/>
              <label for="chain">Chain - $0.20 per cm</label></span>
                      
                
         
                <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Chain'" @change="setChainColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Copper">Copper</option>
                </select>
                
              
              <span><input type="radio" id="wire" value="wire"  @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Wire - $0.10 per cm</label></span>
                      
                      
                    <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Wire'" @change="setWireColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    </select>
              
              <span><input type="radio" id="cord" value="cord"  @change="selectedCord" v-model="selectedMaterial.type"/>
                  <label for="cord">Stretch cord - $0.05 per cm</label></span>
                      
                      <p v-if="selectedMaterial.type === 'Stretch cord'">Color: clear</p>
                      
                     
                     </div>
      </div>
           
                  
               <button class="btn" v-if="lengthChosen === true && materialChosen === true && colorChosen === true" @click="chooseNecklaceBeads(necklaceLength, selectedType)">select your beads</button>
    

    </div>
    
       
   
  <div v-if="bracelet === true" class="selector">
              

              
           
                <div class="size-template-bracelet">
              
                  <img class="bracelet-size-img" src="/static/bracelet-size-guide.png"/>
              
              </div>
                   
                 
             <div class="size">
        <div class="necklace-material-radios">
                     
       <span><input type="radio" id="chain" value="chain"  @change="selectedChain" v-model="selectedMaterial.type"/>
              <label for="chain">Chain - $0.20 per cm</label></span>
                      
                
         
                <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Chain'" @change="setChainColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Copper">Copper</option>
                </select>
                
              
              <span><input type="radio" id="wire" value="wire"  @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Wire - $0.10 per cm</label></span>
                      
                      
                    <select v-model="selectedMaterial.color" class="colorselect" v-if="selectedMaterial.type === 'Wire'" @change="setWireColor">
                    <option disabled value="">Select color</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    </select>
              
              <span><input type="radio" id="cord" value="cord"  @change="selectedCord" v-model="selectedMaterial.type"/>
                  <label for="cord">Stretch cord - $0.05 per cm</label></span>
                      
                      <p v-if="selectedMaterial.type === 'Stretch cord'">Color: clear</p>
                      
                     
                     </div>
      </div>
           
                  
               <button class="btn" v-if="lengthChosen === true && materialChosen === true && colorChosen === true" @click="chooseBraceletBeads(braceletLength, selectedType)">select your beads</button>
    

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
        selectedColor: ''
        
    }
},
    name: 'Materials',
    
    props: ['necklace', 'bracelet'],
    
    
    methods: {
         yes: function(){
            this.materialChosen = true;
        },
        
        selectedChain: function(){
            
            this.selectedMaterial.type = 'Chain';
             this.selectedMaterial.price = 0.20;
            
        },
        
         selectedWire: function(){
            
            this.selectedMaterial.type = 'Wire';
             this.selectedMaterial.price = 0.10;
            
        },
        
         selectedCord: function(){
            
            this.selectedMaterial.type = 'Stretch cord';
             this.selectedMaterial.color = 'clear';
             this.selectedMaterial.price = 0.05;
             this.colorChosen = true;
             this.$emit('material', this.selectedMaterial)
            
        },
        
        setWireColor: function(){
            this.colorChosen = true;
            this.$emit('material', this.selectedMaterial);
        },
        
        setChainColor: function(){
            this.colorChosen = true;
            this.$emit('material', this.selectedMaterial);
        }
    }
}


</script>
<style>
    
    .selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 20px;
    }
    
     .size-template-necklace {
    height: 375px;
    width: 375px;
    border: 1px solid #ddd;
    }
    
    .necklace-length-img {
 
    height: 100%;
    width: 100%;
    }
    
    .size-template-bracelet {
    height: 460px;
    width: 460px;
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


</style>