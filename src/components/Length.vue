<template>
<div class="length">
     <div class="create-container">
         
            <div class="breadcrumbs">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span> <span class="back" @click="backToType">jewelry type</span><span class="right-arrow">&rsaquo;</span>sizing</span>
          
          </div>
         
    <div class="select-type-container">
     <h2 style="text-align: center" v-if="lengthChosen === false">Select {{ selectedType }} <span v-if="necklace === true">Length</span><span v-if="bracelet === true">Size</span></h2>
    
     <div v-if="necklace === true" class="selector">
              
   
              
           
               
              <div class="size-template-necklace">
                  
                <img class="necklace-length-img" src="/static/necklace-length-guide.jpg"/>
              
              </div>
              
              <div class="size">
                  
                   
                 
                  
                  <div v-if="lengthChosen === false">
                      
              <div class="radio-buttons-container">
                  
                  
              <span><input type="radio" id="small" value="40"  @change="showButton" v-model="necklaceLength"/>
              <label for="40-cm">40 cm</label></span>
              
              <span><input type="radio" id="small" value="42"  @change="showButton" v-model="necklaceLength"/>
                  <label for="42-cm">42 cm</label></span>
              
              <span><input type="radio" id="small" value="45"  @change="showButton" v-model="necklaceLength"/>
                  <label for="45-cm">45 cm</label></span>
                  
                  <span><input type="radio" id="small" value="50"  @change="showButton" v-model="necklaceLength"/>
                      <label for="50-cm">50 cm</label></span>
                  
                  <span><input type="radio" id="small" value="60"  @change="showButton" v-model="necklaceLength"/>
                      <label for="60-cm">60 cm</label></span>
                  
                  <span><input type="radio" id="small" value="80"  @change="showButton" v-model="necklaceLength"/>
                      <label for="80-cm">80 cm</label></span>
                  
                  </div>
              
                  
                  </div>
      
                 
             

         </div>
    </div>
    
    
    <div v-if="bracelet === true" class="selector">
              
              <div class="size-template-bracelet">
              
                  <img class="bracelet-size-img" src="/static/bracelet-size-guide.png"/>
              
              </div>
              
              <div class="size">
            
               <div class="radio-buttons-bracelet">
                   
                   <span><input type="radio" id="s" value="14" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                   <label for="xs">XS - 14 cm</label></span>
                   
            <span><input type="radio" id="s" value="15" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                   <label for="s">S - 15 cm</label></span>
              
            <span><input type="radio" id="m" value="16" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="m">M - 16 cm</label></span>
              
            <span><input type="radio" id="l" value="17" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="l">L - 17 cm</label></span>
              
            <span><input type="radio" id="xl" value="18" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="xl">XL - 18 cm</label></span>
                   
                   <span><input type="radio" id="xxl" value="19" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="xxl">XXL - 19 cm</label></span>
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
        lengthChosen: false,
        necklaceLength: undefined,
        braceletLength: undefined,
        braceletSize: ''
    }
},
name: 'Length',
    
props: ['necklace', 'bracelet', 'selectedType'],
    
    methods: {
         showButton: function(){
            this.lengthChosen = true;
             this.$emit('nlength', this.necklaceLength);
              this.$router.push({ name: 'Materials', params: {necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, selectedType: this.selectedType}});
        },
        
        sendBraceletLength: function(braceletLength){
            this.lengthChosen = true;
            this.getBraceletLength(braceletLength);
             this.$router.push({ name: 'Materials', params: {necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedType: this.selectedType}});
        },
        
         getBraceletLength: function(braceletLength){
            this.braceletLength = braceletLength;
            this.lengthChosen = true;
            
            if(this.braceletLength === '14'){
                this.braceletSize = 'XS';
            }
            
            if(this.braceletLength === '15'){
                this.braceletSize = 'S';
            }
            
            if(this.braceletLength === '16'){
                this.braceletSize = 'M';
            }
            
            if(this.braceletLength === '17'){
                this.braceletSize = 'L';
            }
            
            if(this.braceletLength === '18'){
                this.braceletSize = 'XL';
            }
            
            if(this.braceletLength === '19'){
                this.braceletSize = 'XXL';
            }
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