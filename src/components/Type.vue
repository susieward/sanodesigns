<template>
<div class="type">
    <div class="type-container">
<div class="select-type-container">
     
            <h2 style="text-align: center">Select Jewelry Type</h2>
            
            <div class="select-type">
          <div class="column" id="necklace" @click="selectNecklace">
              <p class="select-text">necklace</p>
            </div>
          
            <div class="column" id="bracelet" @click="selectBracelet">
                <p class="select-text">bracelet</p>
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
        necklace: false,
        bracelet: false,
        typeChosen: false,
        selectedType: '',
    }
},
    name: 'Type',
    
    computed: {
        
        sessionId(){
            return this.$session.id();
        },
        
        sessionData(){
            
            return this.$session.getAll();
        }
   
    },

    
    methods: {
            selectNecklace: function(){
            this.necklace = true;
            this.bracelet = false;
            this.typeChosen = true;
            this.selectedType = 'Necklace';
            this.$emit('ntype', this.selectedType);
            
            this.$session.set('sessionNecklace', this.necklace);
            this.$session.set('sessionBracelet', this.bracelet);
            this.$session.set('sessionType', this.selectedType);
            
            this.$router.push({ name: 'Length', params: { sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
            
        },
        
        selectBracelet: function(){
            this.bracelet = true;
            this.necklace = false;
            this.typeChosen = true;
            this.selectedType = 'Bracelet';
            this.$emit('btype', this.selectedType);
            
            this.$session.set('sessionNecklace', this.necklace);
            this.$session.set('sessionBracelet', this.bracelet);
             this.$session.set('sessionType', 'Bracelet');
            
             this.$router.push({ name: 'Length', params: {necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
    }

}

</script>
<style>
    
       .type-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
    .select-type-container {
        display: grid;
        grid-gap: 30px;
        justify-content: center;
     
    }
    
  .type-selector {
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
    
@media screen and (max-width: 1200px){
    
    .type-container {
    width: 860px;
   }    
}
    
@media screen and (max-width: 1000px){
    
    .type-container {
    width: 640px;
    }    
}
    
@media screen and (max-width: 766px){
    
    .type-container {
    width: 600px;
    }    
}
    
@media screen and (max-width: 600px){
    
    .type-container {
    width: 400px;
    
    }
    
     .column {
    display: grid;
    justify-content: center;
    width: 225px;
    height: 225px;
    background-color: #F4F4F4;
    transition: transform .3s;
    cursor: pointer;
    margin: auto;
    }
        
        
    .select-type {
    display: grid;

    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    align-items: center;
    grid-gap: 20px;
    padding: 10px;

    }
    }
    
@media screen and (max-width: 400px){
        
        
    .type-container {
    width: 390px;
    }
 
        
    
}
    


</style>
