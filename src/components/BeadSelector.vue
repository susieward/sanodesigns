<template>

<div class="bead-selector">
  
      <div class="select-beads">
          
         
        
          <div class="selected-container">
              <div class="continue-btn">
              <button class="btn-small" style="width: 140px" v-if="selectedBeads.length && !beadsEdit.length" @click="finishedSelection()">continue</button><br>
              <button class="btn-small" style="width: 200px" v-if="beadsEdit.length" @click="confirmSelection()">save changes</button>
              </div>
              <h3 style="margin: 0; padding: 0">You've selected:</h3>
              
                
             
     
              
              <div class="selected-container-content">
              
              
          <div v-for="(bead, index) in selectedBeads" class="selected-bead" :key="bead._id">
              
              <div class="bead-container-selector">
                  <span class="remove" @click="remove(index)">x</span>
              <img class="bead-img-small-selector" :src="bead.image"/>
                  
          </div>
             
              </div>
                  
                  <div v-for="(bead, index) in beadsEdit" class="selected-bead" :key="bead._id">
               
              <div class="bead-container-selector">
                  <span class="remove" @click="remove(index)">x</span>
              <img class="bead-img-small-selector" :src="bead.image"/>
                  
          </div>
            
              
              
              </div>
       
          </div>
            
          </div>
   
          <div class="beads-and-search">
 <span>Search: <input type="text" class="searchbar" v-model="search"  placeholder="blue, round, Obsidian, 10 mm, smooth, $0.35, etc"/></span>

      <div class="beads-container-selector">
               
          <div v-for="bead in filteredList" class="bead" @click="select(bead)" v-bind:key="bead._id">
              
          <div class="bead-container">
              <img class="bead-img-small" :src="bead.image"/>
          </div>
              <div class="admin-bead-details">
              <span class="admin-prop-name">Stone:</span> <span>{{ bead.stone }}</span> 
                  <span class="admin-prop-name">Size:</span> <span>{{ bead.size }}</span> 
                  <span class="admin-prop-name">Cut:</span> <span>{{ bead.cut }}</span> 
                  <span class="admin-prop-name">Color:</span> <span>{{ bead.color }}</span> 
                  <span class="admin-prop-name">Shape:</span> <span>{{ bead.shape }}</span> 
                  <span class="admin-prop-name">Price:</span> <span>{{ formatPrice(bead.price) | usdollar }}</span> 
              
              
              
              
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
    
  props: ['necklaceLength', 'selectedType', 'beadsEdit'],
  data () {
    return { 
        search: '',
        searchProps: ['stone', 'size', 'cut', 'color', 'shape', 'price'], 
        selectedBeads: [],
        beadsEdit: [],
        
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
        
        
    filteredList: function(){
        var lowSearch = this.search.toLowerCase();
       
        
        return this.beads.filter(bead => {
            return this.searchProps.some( key =>
                                              
        String(bead[key]).toLowerCase().includes(lowSearch)
       );
        });

    }
    },
    
        methods: {
        
        select: function(bead){
            if(this.beadsEdit.length){
            this.beadsEdit.push(bead);
            } else {
                 this.selectedBeads.push(bead);
                
            }
        },
        
        remove: function(index){
            if(this.beadsEdit.length){
                this.beadsEdit.splice(index, 1);
           
            } else {
                 this.selectedBeads.splice(index, 1);
            }
        },
        
        finishedSelection: function(){
            
            this.$emit('selected', this.selectedBeads );
        },
        
        confirmSelection: function(){
            
            this.$emit('edited', this.beadsEdit );
        },
            
        formatPrice: function(value){
            return value.toFixed(2);
        }
    },
    
    
     filters: {
        pick: function (objects, key) {
            return objects.map(function(object) { 
    	       return object[key];
                               
     })
        },
 
    usdollar: function(value) {
      return `$${value}`;
    }
  
    

}
}
</script>

<style>
    
    
 
 
    .bead-selector {
    display: grid;
    align-content: flex-start;
    grid-gap: 20px;

    }
    
       .search-container {

    display: grid;
   align-content: center;
       justify-content: center;
    padding: 20px;
           align-items: center;
  border: 1px solid #ddd;
    }
    
    
    .searchbar {
    height: 40px;
    width: 440px;
    padding: 10px 12px;
    font-size: 18px;
    border: 1px solid #aaa;
        margin-bottom: 20px;
    }
    
   
    
    .select-beads {

    display: grid;
    grid-template-columns: auto 850px;
    min-height: 400px;
    justify-content: center;
        grid-gap: 20px;
 
    }

    .beads-container-selector {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
  
      height: 800px;
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

     .bead-img-small-selector {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
    
    .bead-container-selector {
        width: 120px;
       height: 120px;
    
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
         grid-gap: 10px;
    align-content: flex-start;
border: 1px solid #ddd;
  padding: 10px;
        width: 275px; 
 
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