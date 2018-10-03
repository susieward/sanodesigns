<template>
<div class="confirm">
    <div class="create-container">
  

    <div class="select-type-container">

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
               <button class="btn" @click="chooseNecklaceBeads(necklaceLength, selectedMaterial)">select your beads</button>
                 </div>
              </div>
          
          
          
                  
            <div v-if="bracelet === true">
                

                 <div class="confirm-dtails">
                   <span class="dtail-text"><strong>Size:</strong></span> <span>{{ braceletSize }} ({{ formatLength(braceletLength) }})</span>
                   <span class="dtail-text"><strong>Material:</strong></span> <span>{{ selectedMaterial.type }}</span>
                   <span class="dtail-text"><strong>Color:</strong></span> <span>{{ selectedMaterial.color }}</span>
                 </div>
              
                <div style="display: grid; justify-content: center; margin-top: 10px">
           <button class="btn" @click="chooseBraceletBeads(braceletLength, selectedMaterial)">select your beads</button>
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
         materials: ['chain', 'wire', 'stretch cord']
        

        
    }
},
    name: 'Confirm',
    
    props: ['necklace', 'bracelet', 'necklaceLength', 'braceletLength', 'braceletSize', 'selectedMaterial', 'selectedType'],

    
    methods: {
            chooseBraceletBeads: function(braceletLength, selectedMaterial){
            this.$router.push({ name: 'bracelet', params: {braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet}});
        },
        
         chooseNecklaceBeads: function(necklaceLength, selectedMaterial){
            this.$router.push({ name: 'necklace', params: {necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet}});
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
    
       .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
  .selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
    }
    
  .select-type {
    display: grid;

    grid-template-columns: auto auto;
 
    grid-gap: 40px;
    padding: 10px;
  
    }
    
    .column {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    background-color: #F4F4F4;
    transition: transform .3s;
    cursor: pointer;
    }
    
    .column:hover {
    transform: scale(1.05);
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