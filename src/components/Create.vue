<template>
  <div class="create">

     
      <div class="create-container">
    
              <div class="breadcrumbs" v-if="typeRoute">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span>jewelry type</span>
          
          </div>
          
          <div class="breadcrumbs" v-if="lengthRoute">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span> <span class="back" @click="backToType">jewelry type</span><span class="right-arrow">&rsaquo;</span>sizing</span>
          
          </div>
          
          <div class="breadcrumbs" v-if="materialsRoute">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span> <span class="back" @click="backToType">jewelry type</span><span class="right-arrow">&rsaquo;</span><span class="back" @click="backToLength">sizing</span><span class="right-arrow">&rsaquo;</span>material</span>
          
          </div>
          
          <div class="breadcrumbs" v-if="confirmRoute">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span> <span class="back" @click="backToType">jewelry type</span><span class="right-arrow">&rsaquo;</span><span class="back" @click="backToLength">sizing</span><span class="right-arrow">&rsaquo;</span><span class="back" @click="backToMaterial">material</span><span class="right-arrow">&rsaquo;</span>confirm details</span>
          
          </div>


            <router-view @ntype="getNecklace" @btype="getBracelet" @nlength="getNecklaceLength" @blength="getBraceletLength" @material="getMaterial"></router-view>
              
            
              
            
              
              
              </div>
          </div>
              

</template>

<script>

export default {
  name: 'Create',
  data () {
    return {
        necklace: false,
        bracelet: false,
        typeChosen: false,
        lengthChosen: false,
        selectedType: '',
        necklaceLength: '',
        braceletLength: '',
        braceletSize: '',
        materialChosen: false,
        materials: ['chain', 'wire', 'stretch cord'],
        selectedMaterial: {
            type: '',
            color: '',
            price: undefined
        }
       }
        },
    
    computed: {
        
         
        sessionId(){
            
            
            return this.$session.id();
        },
        
        sessionData(){
            
            
            return this.$session.getAll();
        },
        
        localSession(){
            return this.$store.state.localSession;
        },
        
        typeRoute(){
            
            return this.$store.state.route.name === 'Type'
            
        },
        
        lengthRoute(){
            
            return this.$store.state.route.name === 'Length'
            
        },
        
        materialsRoute(){
            
            return this.$store.state.route.name === 'Materials'
        },
        
        confirmRoute(){
            
            return this.$store.state.route.name === 'Confirm'
            
        }

        

  },
 
    mounted: function(){
        
        if(!this.$session.exists()){
        this.$session.start();
           
        }
        
        
        
    },
   
    methods: {
     
        
       chooseBraceletBeads: function(braceletLength, selectedMaterial){
            this.$router.push({ name: 'bracelet', params: {braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet}});
        },
        
         chooseNecklaceBeads: function(necklaceLength, selectedMaterial){
            this.$router.push({ name: 'necklace', params: {necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial,  necklace: this.necklace, bracelet: this.bracelet}});
        },
        
        backToType: function(){
            this.typeChosen = true;
            this.selectedType = '';
            this.$session.remove('sessionType')
            this.$router.push({ name: 'Type'});
        },
        
        backToLength: function(){
            this.lengthChosen = true;
            this.necklaceLength = '';
            this.braceletLength = '';
            this.braceletSize = '';
            this.$session.remove('sessionNecklaceLength');
            this.$session.remove('sessionBraceletLength');
            this.$session.remove('sessionBraceletSize');
            this.$router.push({ name: 'Length'});
        },
        
        backToMaterial: function(){
            this.materialChosen = true;
            this.selectedMaterial = {}
            this.$session.remove('sessionMaterial');
            this.$router.push({ name: 'Materials'});
        },
        
       
        selectNecklace: function(){
            this.necklace = true;
            this.bracelet = false;
            this.selectedType = 'Necklace';
            
        },
        
        selectBracelet: function(){
            this.bracelet = true;
            this.necklace = false;
            this.selectedType = 'Bracelet';
        },
        
      
        getNecklace: function(selectedType){
            this.neckace = true;
            this.bracelet = false;
            this.selectedType = selectedType;
            
        },
        
        getBracelet: function(selectedType){
             this.typeChosen = true;
            this.neckace = false;
            this.bracelet = true;
            this.selectedType = selectedType;
        },
        
        getNecklaceLength: function(necklaceLength){
            
            this.necklaceLength = necklaceLength;

        },
        
        getBraceletLength: function(braceletLength){
            this.braceletLength = braceletLength;
            
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
        },
        
        getMaterial: function(selectedMaterial){
            this.selectedMaterial = selectedMaterial;

        },
        
        formatPrice: function(value){
            return value.toFixed(2);
        },
        
        formatLength: function(value){
            return value + '' + ' cm'
        },
        
        formatMaterialPrice: function(value){
            return value.toFixed(2) + '' + ' per cm'
        },
        
        deleteLocalStorage: function(){
            this.$store.commit('deleteLocalBeads');
            this.$session.destroy();
            if(!this.$session.exists()){
                     this.$router.push('/');
                }
  
        },
        
    },
    
    filters: {
        usdollar: function(value) {
      return `$${value}`;
    }
    }
    
}
</script>

<style>
  
    
      .create {
    display: grid;
    align-content: flex-start;
   grid-template-areas: "content content";
width: 100vw;
margin: 0;
padding: 0;
justify-content: center;


    }
    

           .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    

  
    .create-container h2 {
    
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
    
    
    
    
       @media screen and (max-width: 1200px){
           
           
           .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 860px;
    
    }
    }
    
       @media screen and (max-width: 1000px){
        
           
           .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 640px;

            
    
    }
    }
    
    
          @media screen and (max-width: 766px){
              
                .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 600px;
            
    
    }       
              
              
    }
    
     @media screen and (max-width: 600px){
    .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 400px;
         
    }
    }
    
    
    @media screen and (max-width: 400px){
        
             .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    justify-content: center;
    grid-gap: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
width: 390px;
            
    
    }  
        
        
        
    }
  
</style>