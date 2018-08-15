<template>
<div class="length">
 
    
  <div class="selector">
              
              
              
           
               
              <div class="size-template-necklace">
                  
                <img class="necklace-length-img" src="/static/necklace-length-guide.jpg"/>
              
              </div>
              
              <div class="size">
                  
                   
                 
                  
                  <div v-if="lengthChosen === false">
                      
              <div class="radio-buttons-container">
                  
              <span><input type="radio" id="small" value="40 cm"  @change="showButton" v-model="necklaceLength"/>
              <label for="40-cm">40 cm</label></span>
              
              <span><input type="radio" id="small" value="42 cm"  @change="showButton" v-model="necklaceLength"/>
                  <label for="42-cm">42 cm</label></span>
              
              <span><input type="radio" id="small" value="45 cm"  @change="showButton" v-model="necklaceLength"/>
                  <label for="45-cm">45 cm</label></span>
                  
                  <span><input type="radio" id="small" value="50 cm"  @change="showButton" v-model="necklaceLength"/>
                      <label for="50-cm">50 cm</label></span>
                  
                  <span><input type="radio" id="small" value="60 cm"  @change="showButton" v-model="necklaceLength"/>
                      <label for="60-cm">60 cm</label></span>
                  
                  <span><input type="radio" id="small" value="80 cm"  @change="showButton" v-model="necklaceLength"/>
                      <label for="80-cm">80 cm</label></span>
                  
                  </div>
              
                  
                  </div>
      
                 
             
          </div>

    </div>
    
    
    <div v-if="selectedType === 'Bracelet'" class="selector">
              
              <div class="size-template-bracelet">
              
                  <img class="bracelet-size-img" src="/static/bracelet-size-guide.png"/>
              
              </div>
              
              <div class="size">
            
               <div class="radio-buttons-bracelet">
                   
                   <span><input type="radio" id="s" value="XS - 14 cm" @change="showLength" v-model="braceletLength"/>
                   <label for="xs">XS - 14 cm</label></span>
                   
            <span><input type="radio" id="s" value="6 inches" @change="showButton" v-model="braceletLength"/>
                   <label for="s">S - 15 cm</label></span>
              
            <span><input type="radio" id="m" value="M - 16 cm" @change="showButton" v-model="braceletLength"/>
                <label for="m">M - 16 cm</label></span>
              
            <span><input type="radio" id="l" value="L - 17 cm" @change="showButton" v-model="braceletLength"/>
                <label for="l">L - 17 cm</label></span>
              
            <span><input type="radio" id="xl" value="XL - 18 cm" @change="showButton" v-model="braceletLength"/>
                <label for="xl">XL - 18 cm</label></span>
                   
                   <span><input type="radio" id="xxl" value="XXL - 19 cm" @change="showButton" v-model="braceletLength"/>
                <label for="xxl">XXL - 19 cm</label></span>
                  </div>
              
        </div>
    </div>
    
    </div>
    
</template>
<script>

export default {
data(){
    return {
        lengthChosen: false,
        necklaceLength: '',
        braceletLength: ''
    }
},
name: 'Length',
    
props: ['selectedType'],
    
    methods: {
         showButton: function(){
            this.lengthChosen = true;
             this.$emit('nlength', this.necklaceLength);
        }
    }
}



</script>
<style>
 
    .column {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
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
    
    .select-length {
    display: grid;
justify-content: center;
    
    }
    
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
    
    .radio-buttons-container {
    display: grid;
    grid-template-rows: repeat(6, auto);
    }
    
    .radio-buttons-bracelet {
    display: grid;
    grid-template-rows: repeat(6, auto);
    }
    
    .necklace-material-radios {
    display: grid;
    grid-template-rows: repeat(3, auto);
    }
    
    
   

</style>