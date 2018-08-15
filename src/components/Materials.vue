<template>
<div class="materials">
    
   
  <div class="selector">
              

              
           
               
              <div class="size-template-necklace">
                  
                <img class="necklace-length-img" src="/static/necklace-length-guide.jpg"/>
              
              </div>
              
                  
                   
                 
             
                      
    <div class="size">
     <div class="necklace-material-radios">
                     
       <span><input type="radio" id="chain" value="chain"  @change="selectedChain" v-model="selectedMaterial.type"/>
              <label for="chain">Chain - $0.20 per cm</label></span>
                      
                
         
                <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'chain'" @change="setChainColor">
                    <option disabled value="">Select color</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="copper">Copper</option>
                </select>
                
              
              <span><input type="radio" id="wire" value="wire"  @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Wire - $0.10 per cm</label></span>
                      
                      
                    <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'wire'" @change="setWireColor">
                    <option disabled value="">Select color</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    </select>
              
              <span><input type="radio" id="cord" value="cord"  @change="selectedCord" v-model="selectedMaterial.type"/>
                  <label for="cord">Stretch cord - $0.05 per cm</label></span>
                      
                      <p v-if="selectedMaterial.type === 'cord'">Color: clear</p>
                      
                     
                     </div>
      </div>
           
                  
               <button class="btn" v-if="lengthChosen === true && materialChosen === true && colorChosen === true" @click="chooseNecklaceBeads(necklaceLength, selectedType)">select your beads</button>
    

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
            color: ''
        },
        colorChosen: false,
        selectedColor: ''
        
    }
},
    name: 'Materials',
    
    
    methods: {
         yes: function(){
            this.materialChosen = true;
        },
        
        selectedChain: function(){
            
            this.selectedMaterial.type = 'chain';
            
        },
        
         selectedWire: function(){
            
            this.selectedMaterial.type = 'wire';
            
        },
        
         selectedCord: function(){
            
            this.selectedMaterial.type = 'cord';
            
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
    height: 500px;
    width: 500px;
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
    }


</style>