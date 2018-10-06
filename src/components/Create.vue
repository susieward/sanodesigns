<template>
  <div class="create">
        <div class="header">
          <div class="header-container">
              
              <div class="title">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              </div>
              
               <div class="buttons-buttons">
          <span>
      <button class="create-btn" @click="deleteLocalStorage">start over</button>
          <button class="create-btn" @click="saveForLater">save for later</button>
          </span>
          </div>
              </div>
      </div>
     
      <div class="create-container">
            <router-view></router-view>
              
            
              
            
              
              
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
        
        
        localSession(){
            return this.$store.state.localSession;
        }

        

  },
 
    created(){
        
        this.$session.start();

    },
    
    computed: {
        
        sessionId(){
            
            
            return this.$session.id();
        }
    },
    
    methods: {
        
        saveForLater: function(){
        
            let session = this.$session.getAll();
            
            this.$store.commit('setLocalSession', {session: session});
            
            
            
        },
     
        
       chooseBraceletBeads: function(braceletLength, selectedMaterial){
            this.$router.push({ name: 'bracelet', params: {braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedMaterial: this.selectedMaterial, necklace: this.necklace, bracelet: this.bracelet}});
        },
        
         chooseNecklaceBeads: function(necklaceLength, selectedMaterial){
            this.$router.push({ name: 'necklace', params: {necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial,  necklace: this.necklace, bracelet: this.bracelet}});
        },
        
        backToType: function(){
            this.typeChosen = false;
            this.selectedType = '';
            this.lengthChosen= false;
            this.necklaceLength = '';
            this.braceletLength = ''
        },
        
        backToLength: function(){
            this.lengthChosen = false
            this.necklaceLength = '';
            this.braceletLength = ''
        },
        
        backToMaterial: function(){
            this.lengthChosen = true;
            this.materialChosen = false;
            this.selectedMaterial = {}
        },
        
        // so weird I never use comments in vue files
       
        selectNecklace: function(){
            this.necklace = true;
            this.bracelet = false;
            this.typeChosen = true;
            this.selectedType = 'Necklace';
            
        },
        
        selectBracelet: function(){
            this.bracelet = true;
            this.necklace = false;
            this.typeChosen = true;
            this.selectedType = 'Bracelet';
        },
        
      
        getNecklace: function(selectedType){
            this.typeChosen = true;
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
            this.lengthChosen = true;
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
        },
        
        getMaterial: function(selectedMaterial){
            this.selectedMaterial = selectedMaterial;
            this.materialChosen = true;
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
   grid-template-areas:
                    "header header"
                    "content content";
min-height: 100vh;
min-width: 100vw;
margin: 0;
padding: 0;
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
    
    .title {
    grid-area: title;
    display: grid;
  
    justify-content: flex-start;
    align-content: center;
        width: 500px;
    }
    
    .header h1 {
    font-family: 'Pacifico';
    font-size: 58px;
line-height: 64px;
    font-weight: 400;
color: #262626;
margin: 0;
    }
    
    .buttons-buttons {
    grid-area: buttons;
    display: grid;
   grid-gap: 20px;
      justify-content: flex-end;
      align-content: center;
        padding: 0;
  
    }
    
    
/* header media queries */
    
    
    @media screen and (max-width: 1200px){
    
        .header {
grid-area: header;
display: grid;
align-content: center;
width: 100vw;
background-color: #F4F4F4;
height: 92px;
justify-content: center;




}
    
    .header-container {
    display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 50px;
    align-content: center;
    width: 900px;
   
    }
    
    .header h1 {
    font-family: 'Pacifico';
    font-size: 48px;
line-height: 53px;
    font-weight: 400;
color: #262626;
margin: 0;
    }

}

    
    .buttons-container {
    display: grid;
        margin-right: 20px;
        margin-top: 20px;
        align-content: center;
        justify-content: flex-end;
     
    }
    
    .create-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
    .buttons-container-title {
display: grid;
  justify-content: center;

       margin-bottom: 30px;
        padding: 30px;
    padding-top: 20px;
        padding-bottom: 20px;

    }

  
    .create-container h2 {
    
    }
    
    .select-type-container {
        display: grid;
        grid-gap: 30px;

        justify-content: center;
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
    
    .select-details {
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
    
  
</style>