<template>
<div class="materials">
    

    <div class="materials-container">

    <div class="select-materials-container">
   <h2 style="text-align: center">Select {{ selectedType }} Material</h2>

  <div v-if="necklace === true" class="materials-selector">
              

              
           
               
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
                
              
              <span><input type="radio" id="wire" name="material" value="Nylon-wrapped beading wire" @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Nylon-wrapped beading wire - $0.10 per cm <br>(recommended)</label></span>
                      
                      
                    <select v-model="selectedMaterial.color" v-if="selectedMaterial.type === 'Nylon-wrapped beading wire'" @change="setWireColor">
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
    
       
   
  <div v-if="bracelet === true" class="materials-selector">
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
                 
              <span><input type="radio" :id="wire" value="Nylon-wrapped beading wire" @change="selectedWire" v-model="selectedMaterial.type"/>
                  <label for="wire">Nylon-wrapped beading wire - $0.10 per cm</label></span>
            
              <select v-model="selectedMaterial.color" class="colorselect" v-if="selectedMaterial.type === 'Nylon-wrapped beading wire'" @change="setWireColor">
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
      mounted: function(){
        
        
         if(this.sessionType){
             this.selectedType = this.sessionType;
         }
             
                 if(this.sessionNecklace){
             this.necklace = this.sessionNecklace;
         }
        
        if(this.sessionBracelet){
             this.bracelet = this.sessionBracelet;
         }
          
          if(this.sessionNecklaceLength){
             this.necklaceLength = this.sessionNecklaceLength;
         }
        
        if(this.sessionBraceletLength){
            this.lengthChosen = true;
             this.braceletLength = this.sessionBraceletLength;
         }
          
          if(this.sessionBraceletSize){
              this.lengthChosen = true;
             this.braceletSize = this.sessionBraceletSize;
         }
    },
    
     computed: {
         
             sessionType(){
                
                if(this.$session.has('sessionType')){
                
                return this.$session.get('sessionType');
                }
                
            },
         
             sessionNecklace(){
                
                if(this.$session.has('sessionNecklace')){
                
                return this.$session.get('sessionNecklace');
                }
                
            },
        
        sessionBracelet(){
                
                if(this.$session.has('sessionBracelet')){
                
                return this.$session.get('sessionBracelet');
                }
                
            },
         
             sessionNecklaceLength(){
                
                if(this.$session.has('sessionNecklaceLength')){
                
                return this.$session.get('sessionNecklaceLength');
                }
                
            },
         
         sessionBraceletLength(){
                
                if(this.$session.has('sessionBraceletLength')){
                
                return this.$session.get('sessionBraceletLength');
                }
                
            },
         
         sessionBraceletSize(){
                
                if(this.$session.has('sessionBraceletSize')){
                
                return this.$session.get('sessionBraceletSize');
                }
                
            },
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
             this.materialChosen = true;
             this.$emit('material', this.selectedMaterial);
             
              this.$session.set('sessionMaterial', this.selectedMaterial);
            
            this.$router.push({ name: 'ClaspComponent', params: {sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
             
            
        },
        
        setWireColor: function(){
            this.colorChosen = true;
            this.materialChosen = true;
            this.$emit('material', this.selectedMaterial);
            
             this.$session.set('sessionMaterial', this.selectedMaterial);
            
            this.$router.push({ name: 'ClaspComponent', params: {sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
            
        },
        
        setChainColor: function(){
            this.colorChosen = true;
            this.materialChosen = true;
            this.$emit('material', this.selectedMaterial);
            
             this.$session.set('sessionMaterial', this.selectedMaterial);
            
            this.$router.push({ name: 'ClaspComponent', params: {sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
      
        },
        
                backToType: function(){
            this.$router.push({name: 'necklace', sessionId: this.sessionId, params: { necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
        
        backToLength: function(){
           this.$router.push({name: 'Length', sessionId: this.sessionId, params: { necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
        
        toConfirmDetails: function(){
            
            this.$session.set('sessionMaterial', this.selectedMaterial);
            
            this.$router.push({ name: 'Confirm', params: {sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedMaterial: this.selectedMaterial, selectedType: this.selectedType}});
        }
    }
}


</script>
<style>

       .materials-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;


    
    }
    
      .select-materials-container {
        display: grid;
        grid-gap: 30px;

        justify-content: center;
    }
    
    .materials-selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
 
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
    
    .radio-button {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: flex-start;
             border: 1px solid #eee;
        align-content: flex-start;
        grid-gap: 10px;
    }
    
    .selectcolor {
   width: 50%;
    }

     @media screen and (max-width: 1200px){
         
            .materials-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  width: 860px;
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
      .select-materials-container {
        display: grid;
        grid-gap: 30px;

        justify-content: center;
    }
    
    .materials-selector {
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
         
    }
    
         @media screen and (max-width: 1000px){
         
            .materials-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  width: 640px;
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
      .select-materials-container {
        display: grid;
        grid-gap: 30px;

        justify-content: center;
    }
    
    .materials-selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 20px;
    }
    
     .size-template-necklace {
    height: 300px;
    width: 300px;
    border: 1px solid #ddd;
    }
    
    .necklace-length-img {
 
    height: 100%;
    width: 100%;
    }
    
    .size-template-bracelet {
     height: 340px;
    width: 340px;
    border: 1px solid #ddd;
    }
    
    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }
    
    .size {
       min-height: 275px;
        width: 275px;
  
    }

        .necklace-material-radios {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-gap: 20px;
    }
    
    .selectcolor {
   width: 50%;
    }   
         
    }
    
      @media screen and (max-width: 766px){
          
                       
            .materials-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  width: 860px;
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
width: 600px;
    
    }
          
          
            .size {
       min-height: 275px;
        width: 200px;
  
    }
          
    }
    
    
    @media screen and (max-width: 600px){
        
        
                
            .materials-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
width: 400px;
    
    }
        
    .materials-selector {
    display: grid;
   grid-template-rows: auto auto;
    grid-template-columns: 1fr;
             justify-content: center;
    padding: 10px;
    grid-gap: 20px;
    }
        
    }
     .size-template-necklace {
    height: 300px;
    width: 300px;
    border: 1px solid #ddd;
    
    }
    
  
    .size-template-bracelet {
     height: 340px;
    width: 340px;
    border: 1px solid #ddd;
    }
    
    .size {
        width: auto;
    }
    @media screen and (max-width: 400px){
        
                
            .materials-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  width: 860px;
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
width: 400px;
    
    }
        
         .materials-selector {
    display: grid;

   grid-template-rows: auto auto;
    grid-template-columns: 1fr;
             justify-content: center;
    padding: 10px;
    grid-gap: 20px;
    }
        
        
                
       .size-template-necklace {
    
    height: 300px;
    width: 300px;
    border: 1px solid #ddd;
    }
    
    .necklace-length-img {
 
    height: 100%;
    width: 100%;
    }
    
    .size-template-bracelet {
     height: 340px;
    width: 340px;
    border: 1px solid #ddd;
    }
    
    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }
    
    .size {
       min-height: 300px;
 width:auto;


    }
        
    }

</style>