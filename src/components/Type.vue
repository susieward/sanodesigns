<template>
<div class="type">
    <div class="create-container">
      <div class="breadcrumbs">
              <span><span class="back">start</span> <span class="right-arrow">&rsaquo;</span>jewelry type</span>
          
          </div>
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
        }
   
    },

    
    methods: {
            selectNecklace: function(){
            this.necklace = true;
            this.bracelet = false;
            this.typeChosen = true;
            this.selectedType = 'Necklace';
            this.$emit('ntype', this.selectedType);
                
            this.$session.set('selectedType', 'Necklace');
            
            this.$router.push({ name: 'Length', params: { sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
            
        },
        
        selectBracelet: function(){
            this.bracelet = true;
            this.necklace = false;
            this.typeChosen = true;
            this.selectedType = 'Bracelet';
            this.$emit('btype', this.selectedType);
            
             this.$session.set('selectedType', 'Bracelet');
            
             this.$router.push({ name: 'Length', params: {necklace: this.necklace, bracelet: this.bracelet, selectedType: this.selectedType}});
        },
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
