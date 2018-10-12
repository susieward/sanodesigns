<template>
<div class="confirm">
    
    <div class="confirm-container">


    <div class="select-confirm-container">

             <div class="select-details">

                  <h2 style="text-align: center">Confirm {{ selectedType }} Details</h2>
              </div>
  
             <div v-if="necklace === true">
                 
               <div class="confirm-dtails">
                   <span class="dtail-text"><strong>Length:</strong></span> <span>{{ formatLength(necklaceLength) }}</span>
                   <span class="dtail-text"><strong>Material:</strong></span> <span>{{ selectedMaterial.type }}</span>
                   <span class="dtail-text"><strong>Color:</strong></span> <span>{{ selectedMaterial.color }}</span>
                 </div>
         
                <div style="display: grid; justify-content: center; margin-top: 10px">
                    
               <button v-if="!beadsChosen" class="btn" @click="chooseNecklaceBeads(necklaceLength, selectedMaterial)">select your beads</button>
                    
                    <button v-if="beadsChosen" class="btn" @click="chooseNecklaceBeads(necklaceLength, selectedMaterial)">resume your design</button>
                 </div>
              </div>
          
          
          
                  
            <div v-if="necklace === false">
                

                 <div class="confirm-dtails">
                   <span class="dtail-text"><strong>Size:</strong></span> <span>{{ braceletSize }} ({{ formatLength(braceletLength) }})</span>
                   <span class="dtail-text"><strong>Material:</strong></span> <span>{{ selectedMaterial.type }}</span>
                   <span class="dtail-text"><strong>Color:</strong></span> <span>{{ selectedMaterial.color }}</span>
                 </div>
              
                <div style="display: grid; justify-content: center; margin-top: 10px">
                    
           <button v-if="!beadsChosen" class="btn" @click="chooseBraceletBeads(braceletLength, selectedMaterial)">select your beads</button>
                    
                    <button v-if="beadsChosen" class="btn" @click="chooseBraceletBeads(braceletLength, selectedMaterial)">resume your design</button>
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
         materials: ['chain', 'wire', 'stretch cord'],

        
    }
},
    name: 'Confirm',
    
    props: ['necklace', 'bracelet', 'necklaceLength', 'braceletLength', 'braceletSize', 'selectedMaterial', 'selectedType'],
    
      mounted: function(){
          this.getData();
          
          if(this.$session.has('sessionType')){
             this.selectedType = this.$session.get('sessionType')
         }
        
          if(this.$session.has('sessionNecklace')){
             this.necklace = this.$session.get('sessionNecklace')
         }
        
         if(this.$session.has('sessionBracelet')){
             this.bracelet = this.$session.get('sessionBracelet')
         }
          
          if(this.$session.has('sessionNecklaceLength')){
             this.necklaceLength = this.$session.get('sessionNecklaceLength')
         }
        
         if(this.$session.has('sessionBraceletLength')){
             this.braceletLength = this.$session.get('sessionBraceletLength')
         }
          
          if(this.$session.has('sessionBraceletSize')){
             this.braceletSize = this.$session.get('sessionBraceletSize')
         }
        
         if(this.$session.has('sessionMaterial')){
             this.selectedMaterial = this.$session.get('sessionMaterial')
         }
        
        this.localBeads = this.$store.state.localBeads;
        
    },
    
     computed: {
         
         beadsChosen(){
             
            return this.$session.has('sessionSelected');
             
         },
       
         
        sessionId(){
            
            
            return this.$session.id();
        },

        
        sessionData(){
            
            return this.$session.getAll();
        }
    },

    
    methods: {
        
        getData: function(){
            
            this.$session.getAll();
            
        },
            chooseBraceletBeads: function(braceletLength, selectedMaterial){
            this.$router.push({ name: 'bracelet', sessionId: this.$sessionId, params: { braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet}});
        },
        
         chooseNecklaceBeads: function(necklaceLength, selectedMaterial){
             
            this.$router.push({name: 'necklace', sessionId: this.sessionId, params: { necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
        
           backToType: function(){
            this.$router.push({name: 'necklace', sessionId: this.sessionId, params: { necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
        
        backToLength: function(){
           this.$router.push({name: 'Length', sessionId: this.sessionId, params: { necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
        
        backToMaterial: function(){
           this.$router.push({name: 'Materials', sessionId: this.sessionId, params: { necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
        
             
        formatPrice: function(value){
            return value.toFixed(2);
        },
        
        formatLength: function(value){
            return value + '' + ' cm'
        },
        
              formatMaterialPrice: function(value){
            return value.toFixed(2) + '' + ' per cm'
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
    
       .confirm-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
  
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;

   
    }
    
  .confirm-selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
       
    }
    
    
      .select-confirm-container {
        display: grid;
        grid-gap: 30px;


        justify-content: center;
    }

    
    .select-text {
    font-size: 22px;
line-height: 25px;
color: #262626;
font-family: 'Playfair Display';
font-weight: 400;
    text-align: center;
    margin: auto;
    padding: 0;
}
    
     
    .confirm-details {
        display: grid;
        justify-content: center;
    }
    
    .dtails {
       display: grid;
        justify-content: center;

 
    }
    
    
    
     .confirm-dtails {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(3, 1fr);
max-width: 600px;
    margin: auto;
    padding: 20px;
         padding-top: 5px;
        align-content: center;
        justify-content: center;
    
    
    
    }
    
    .dtail-text {
    margin-right: 60px;
    font-size: 16px;
        margin-bottom: 10px;
        line-height: 24px;
    }
    
      @media screen and (max-width: 1200px){
         
          .confirm-container {

        width: 860px;
    
    }   
         
    }
    
      @media screen and (max-width: 1000px){
         
    .confirm-container {
 
        width: 640px;
    
    }   
         
    }
    
      @media screen and (max-width: 766px){
         
    .confirm-container {
 
    width: 600px;
    
    }    
         
    }
 
    
     @media screen and (max-width: 600px){
        
         
       .confirm-container {
  
width: 400px;
    
    }
        
        
    }
    
    @media screen and (max-width: 400px){
        
        .confirm-container {
        width: 390px;
    
        }
        
        .confirm-dtails {
        max-width: 300px;
        
        }
        
        .confirm h2 {
        font-size: 30px;
        }
        
        
        
    }

</style>