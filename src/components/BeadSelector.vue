<template>
<div class="bead-selector">
    

      <div class="select-beads">
          
         
        
          <div class="selected-container">
     <h3 style="margin-bottom: 0">You've selected:</h3>
              <div class="selected-container-content">
              
              
          <div v-for="(bead, index) in selectedBeads" class="selected-bead">
              
              <div class="bead-container-selector">
                  <span class="remove" @click="remove(index)">x</span>
              <img class="bead-img-small-selector" :src="bead.image"/>
                  
          </div>
              <p>{{ bead.stone }}<br>
                  {{ bead.size }}<br>
                  {{ bead.price }}</p>
              </div>
       
          <div v-for="(bead, index) in beadsEdit" class="selected-bead">
               
              <div class="bead-container-selector">
                  <span class="remove" @click="remove(index)">x</span>
              <img class="bead-img-small-selector" :src="bead.image"/>
                  
          </div>
              <p>{{ bead.stone }}<br>
                  {{ bead.size }}<br>
                  {{ bead.price }}</p>
              
              
              </div>
          </div>
               <div class="continue-btn">
              <button class="btn-small" v-if="selectedBeads.length && !beadsEdit.length" @click="finishedSelection()">continue</button><br>
              <button class="btn-small" v-if="beadsEdit.length" @click="confirmSelection()">done</button>
              </div>
          
          </div>
         
          
           
          <div class="beads-and-search">
              <div class="search-container">
              <p>Search by any category:</p>
                <input type="text" class="searchbar" v-model="search"  placeholder="blue, round, Obsidian, 10 mm, smooth, $0.35, etc"/>
               
              
        
    </div>
         
      <div class="beads-container-selector">
          
          <div v-for="bead in filteredList" class="bead" @click="select(bead)">
              
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
    
  props: ['necklaceLength', 'selectedType', 'beads-edit'],
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
        
        select: function(bead){
            if(!this.beadsEdit.length){
            this.selectedBeads.push(bead);
            } else {
                this.beadsEdit.push(bead);
            }
        },
        
        remove: function(index){
            if(!this.beadsEdit.length){
            this.selectedBeads.splice(index, 1);
            } else {
                this.beadsEdit.splice(index, 1);
            }
        },
        
        finishedSelection: function(){
            
            this.$emit('selected', this.selectedBeads );
        },
        
        confirmSelection: function(){
            
            this.$emit('edited', this.beadsEdit );
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
        grid-gap: 30px;
        align-content: flex-start;
    }
 
   
    
    .select-beads {
    display: grid;
    grid-template-columns: auto 850px;
    min-height: 400px;
    justify-content: center;
        grid-gap: 30px;

    }

    .beads-container-selector {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
  
      height: 500px;
        width: 850px;
       
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
    
    .bead-container {
        width: 140px;
       height: 140px;
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
   align-content: flex-start;
    padding: 0px;
    min-width: 700px;
 
    }
    
    
    .searchbar {
    height: 40px;
    width: 440px;
    padding: 10px 12px;
    font-size: 18px;
    border: 1px solid #aaa;
    }
    
     .bead-img-small-selector {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
    
    .bead-container-selector {
        width: 120px;
       height: 120px;
        border: 1px solid #ddd;
  border-radius: 50%;
    }
    
    .selected-container {
    display: grid;
   align-content: flex-start;
grid-gap: 15px;
    padding: 0px;


    }
    
     .selected-container-content {
    display: grid;
    grid-template-columns: auto auto;
    align-content: flex-start;
border: 1px solid #ddd;
  padding: 10px;
        width: 300px; 
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
    
    .bead {

    display: grid;
    justify-content: center;
        grid-gap: 2px;
        padding: 5px;
        cursor: pointer;
         border: 1px solid transparent;
    }
    
    .bead:hover {
        border: 1px solid #C4A8D1;
    }
    
    .selected-bead {
   

    }
    
    .selected-bead p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    }
    
    .remove {
    color: red;
    font-size: 20px;
    position: absolute;
    top: 10;
    left: 10;
    cursor: pointer;
    }
    
    .continue-btn {
    display: grid;
    align-content: flex-end;
    width: 100%;
    }
    
</style>