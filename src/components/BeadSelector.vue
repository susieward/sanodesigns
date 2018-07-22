<template>
<div class="bead-selector">
    

      <h2>Select {{ selectedType }} Beads</h2>
      <div class="select-beads">
          
 
          <div class="selected-container">
          <p>Your beads:</p>
              <button class="btn-small" v-if="selectedBeads.length" @click="finishedSelection()">done</button>
              
          <div v-for="bead in selectedBeads">
              
              <div class="bead-container-selected">
              <img class="bead-img-small-selected" :src="bead.image"/>
          </div>
              </div>
              
            
          
          </div>
          
           
          <div class="beads-and-search">
              <div class="search-container">
              <p>Search all beads:</p>
                <input type="text" class="searchbar" v-model="search"  placeholder="blue, round, Obsidian, 10 mm, smooth, $0.35, etc"/>
               
              
        
    </div>
         
      <div class="beads-container-selector">
          
          <div v-for="bead in filteredList">
              
          <div class="bead-container">
              <img class="bead-img-small" :src="bead.image"/>
          </div>
              <div class="admin-bead-details">
              <span class="admin-prop-name">Stone:</span> <span>{{ bead.stone }}</span> 
                  <span class="admin-prop-name">Size:</span> <span>{{ bead.size }}</span> 
                  <span class="admin-prop-name">Cut:</span> <span>{{ bead.cut }}</span> 
                  <span class="admin-prop-name">Color:</span> <span>{{ bead.color }}</span> 
                  <span class="admin-prop-name">Shape:</span> <span>{{ bead.shape }}</span> 
                  <span class="admin-prop-name">Price:</span> <span>{{ bead.price }}</span> 
              
              
              
              
              </div>
            <input type="checkbox" v-model="selectedBeads" v-bind:value="bead">
          
          </div> 
          </div>
          </div>
          
      </div>
     
      </div>
    

</template>
<script>
export default {
    name: 'BeadSelector',
    
  props: ['necklaceLength', 'selectedType'],
  data () {
    return { 
        search: '',
        searchProps: ['stone', 'size', 'cut', 'color', 'shape', 'price'], 
        selectedBeads: [],
        
                selectedStone: undefined,
             selectedSize: undefined,
            selectedColor: undefined,
            selectedShape: undefined,
        selectedProps: [],
      
    }
  },
    
    
    computed: {
        

        beads(){
            return this.$store.state.beads;
        },
        
        beadShapes () {
           var nonSorted = [...new Set(this.beads.map(b => b.shape))];
            
            var sorted = nonSorted.sort(function(a, b){
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
            });
            return sorted;
            },
        
        beadStones () {
            var nonSorted = [...new Set(this.beads.map(b => b.stone))];
            
            var sorted = nonSorted.sort(function(a, b){
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
            });
            return sorted;
            },
        
        beadSizes () {
            var nonSorted = [...new Set(this.beads.map(b => b.size))];
            
            var sorted = nonSorted.sort(function(a, b){
                return a-b;
            });
            return sorted;
            },
        beadColors () {
            var nonSorted = [...new Set(this.beads.map(b => b.color))];
            
            var sorted = nonSorted.sort(function(a, b){
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
            });
            return sorted;
            },
        
        beadPrices () {
            var nonSorted = [...new Set(this.beads.map(b => b.price))];
            
            var sorted = nonSorted.sort(function(a, b){
                return a-b;
            });
            return sorted;
            },
        
        beadCuts () {
            var nonSorted = [...new Set(this.beads.map(b => b.cut))];
            
            var sorted = nonSorted.sort(function(a, b){
                if (a < b) return -1;
                else if (a > b) return 1;
                return 0;
            });
            return sorted;
            },
        
        allPropValues: function(){
            
            return [].concat(this.beadShapes, this.beadStones, this.beadSizes, this.beadColors, this.beadPrices, this.beadCuts);
        },
        
    filteredList: function(){
        var lowSearch = this.search.toLowerCase();
        var allPropValues = this.allPropValues;
        
        var selectedFilters = [this.selectedStone || this.selectedSize || this.selectedCut || this.selectedColor || this.selectedShape || this.selectedPrice];
        
           if(!this.selectedProps.length){
        
        return this.beads.filter(bead => {
            return this.searchProps.some( key =>
                                              
        String(bead[key]).toLowerCase().includes(lowSearch)
       );
        });
           }
    }
    },
    
    methods: {
        
        finishedSelection: function(){
            
            this.$emit('selected', this.selectedBeads );
        },
        
           reset: function(){
            this.selectedFilters = [];
            this.selectedProps = [];
        },
        addSelectedStone: function(){
          
            this.selectedProps.push('stone');
            
        },
        addSelectedSize: function(){
      
            this.selectedProp('size');
            
        },
        addSelectedCut: function(){
           
            this.selectedProps.push('cut');
            
        },
        addSelectedColor: function(){
          
            this.selectedProps.push('color');
            
        },
        addSelectedShape: function(){
          
            this.selectedProps.push('shape');
            
        },
        addSelectedPrice: function(){
         
           this.selectedProps.push('price');
            
        },
        hideSelector: function(){
            this.selectorVisible = false;
        },
        
        showSelector: function(){
            this.selectorVisible = true;
        }
        
    }, 
    
    
     filters: {
        pick: function (objects, key) {
            return objects.map(function(object) { 
    	       return object[key];
                               
     })
        }
     }
    

}
</script>

<style>
    
    
    .beads-and-search {
    display: grid;
        grid-template-rows: auto auto;
    }
    
.necklace-selector {
    display: grid;
    width: 100vw;

    }
    
.necklace-selector  h2 {
    text-align: center;
    }
    
    
       .necklace-selector-container {
    display: grid;
  justify-content: center;
    border: 1px solid #ddd;
    padding: 10px;
    grid-gap: 20px;
       
      
    }
    
    .necklace-template {
    height: auto;
    width: 500px;
    border: 1px solid #ddd;
    background-color: #f4f4f4;
    }
    
    .select-beads {
    display: grid;
    grid-template-columns: auto auto;
    min-height: 400px;
    min-width: 500px; 
    border: 1px solid #ddd;
    }

    .beads-container-selector {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
   justify-content: flex-start;
      max-height: 500px;
        max-width: 900px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
    
    .bead-container {
        width: 100px;
       height: auto;
        border: 1px solid #ddd;
        border-radius: 50%;
    }
    
     .bead-img-small {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
   .search-container {
    display: grid;
    justify-content: center;
        align-items: center;
         align-content: flex-start;
    padding: 30px;
    min-width: 700px;
 
    }
    
    
    .searchbar {
    height: 50px;
    width: 500px;
    padding: 10px 12px;
    font-size: 20px;
    border: 1px solid #aaa;
    }
    
     .bead-img-small-selected {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
    
    .bead-container-selected {
        width: 120px;
       height: auto;
        border-radius: 50%;
    }
    
    .selected-container {
    display: grid;
    grid-template-columns: auto auto;
    align-content: flex-start;
    border: 1px solid #ddd;
  
        min-width: 200px; 
    }
    
     .buttons-container {
    display: grid;
        margin-right: 50px;
        justify-content: flex-end;
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
    
        
     .admin-bead-details {
        display: grid;
        grid-template-columns: auto auto;
justify-content: center;
      line-height: 20px;
        font-size: 14px;
    }
    
     .admin-prop-name {
    margin-right: 18px;
    }
    
    
</style>