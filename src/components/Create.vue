<template>
  <div class="create">
      <div class="create-container">
      
      
        <div class="select-type-container" v-if="typeChosen === false">
            <h2>Select Jewelry Type</h2>
            <div class="select-type">
          <div class="column" id="necklace" @click="selectNecklace">
              <p class="select-text">necklace</p>
            </div>
          
            <div class="column" id="bracelet" @click="selectBracelet">
                <p class="select-text">bracelet</p>
            </div>
            </div>
          
          </div>
          
          <div class="select-length" v-if="typeChosen === true">
              <h2>Select Length</h2>
          <div v-if="necklace === true">
              <p>{{ selectedType }} lengths:</p>
              
              <input type="radio" id="small" value="12 in"  @change="showButton" v-model="necklaceLength"/>
              <label for="small">12"</label>
              
              <input type="radio" id="medium" value="14 in" @change="showButton" v-model="necklaceLength"/>
              <label for="medium">14"</label>
              
              <input type="radio" id="large" value="16 in" @change="showButton" v-model="necklaceLength"/>
              <label for="large">16"</label>
              
              <p>Length: {{ necklaceLength }}</p>
              
              <button class="btn" v-if="lengthChosen === true" @click="chooseNecklaceBeads(necklaceLength, selectedType)">select your beads</button>
          
          </div>
          
          <div v-if="bracelet === true">
              <p>{{ selectedType }} lengths:</p>
                
            <input type="radio" id="s" value="6 inches" @change="showButton" v-model="braceletLength"/>
            <label for="s">6"</label>
              
            <input type="radio" id="m" value="7 inches" @change="showButton" v-model="braceletLength"/>
            <label for="m">7"</label>
              
            <input type="radio" id="l" value="8 inches" @change="showButton" v-model="braceletLength"/>
            <label for="l">8"</label>
              
            <input type="radio" id="xl" value="9 inches" @change="showButton" v-model="braceletLength"/>
            <label for="xl">9"</label>
              
            <p>Length: {{ braceletLength }}</p>
              
           <button class="btn" v-if="lengthChosen === true" @click="chooseBraceletBeads(braceletLength, selectedType)">select your beads</button>
              
          </div>
              
         
        

              
          </div>
          
          
      
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
        showSelector: false 
        
    }
  },
    
    methods: {
        
       chooseBraceletBeads: function(braceletLength, selectedType){
            this.$router.push({ name: 'bracelet', params: {braceletLength: this.braceletLength, selectedType: this.selectedType}});
        },
        
         chooseNecklaceBeads: function(necklaceLength, selectedType){
            this.$router.push({ name: 'necklace', params: {necklaceLength: this.necklaceLength, selectedType: this.selectedType}});
        },
        
        showButton: function(){
            this.lengthChosen = true;
        },
        
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
        }
    }
}
</script>

<style>
  
    
      .create {
    display: grid;
    width: 100vw;
    }
    
    .create-container {
    display: grid;
    align-content: flex-start;
        justify-content: center;
    grid-gap: 30px;
   margin-left: 100px;
    margin-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
    
    }
    
    .create-container h2 {
    text-align: center;
    }
    
    .select-type-container {
        
    }
    
    .select-type {
    display: grid;
        justify-content: center;
    grid-template-columns: auto auto;
    max-width: 700px;
    grid-gap: 20px;
    padding: 10px;
    }
    
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

</style>