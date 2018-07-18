<template>
  <div class="necklace-selector">
       <div class="buttons-container">
          
      <span>
      <button class="create-btn">start over</button>
          <button class="create-btn">save for later</button>
          </span>
      </div>
      <div class="necklace-selector-container">
      <div class="necklace-template">
              
              
              </div> 
      
      
      <div class="select-beads">
          <h2>Select {{ selectedType }} Beads</h2>
          
        
      Length: {{ necklaceLength }}
          
          <div class="selected-container">
          
          <div v-for="bead in selectedBeads">
              
              <div class="draggable-with-handler" v-draggable="draggableWithHandler">
                  
                 <div class="handler" ref="handler">
                    I am Handler
                </div>
                  
              <div class="bead-container-selected">
              <img class="bead-img-small-selected" :src="bead.image"/>
          </div>
              </div>
              
              </div>
          
          </div>
          
           <div class="search-container">
              
                <input type="text" class="searchbar" v-model="search"/>
                
               <div v-for="result in results">{{ result }}</div>
              
              </div>
          
      <div class="beads-container-selector">
         
          
          <div v-for="bead in filteredList">
              
          <div class="bead-container">
              <img class="bead-img-small" :src="bead.image"/>
          </div>
              <p>{{ bead.stone }}<br>
                 {{ bead.size }}<br> 
                  {{ bead.cut }}<br>
                  {{ bead.color }}<br>
                  {{ bead.shape }}<br>
                  {{ bead.price }}
              
              
              
              
              </p>
            <input type="checkbox" v-model="selectedBeads" v-bind:value="bead">
          
          </div> 
          </div>
      </div>
     
      </div>
  </div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive'
export default {
  name: 'necklace',
    props: ['necklaceLength', 'selectedType'],
  data () {
    return { 
        search: '',
        searchProps: ['stone', 'size', 'cut', 'color', 'shape', 'price'],
        selectedBeads: [],
        draggableValue: {
            handle: undefined
        }
    }
  },
    
    mounted() {
            this.draggableWithHandler.handle = this.$refs.handler;
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
     },
    
    directives: {
    Draggable

    
}
}
</script>

<style>
    
.necklace-selector {
    display: grid;
    width: 100vw;

    }
    
.necklace-selector  h2 {
    text-align: center;
    }
    
    
       .necklace-selector-container {
    display: grid;
    grid-template-columns: auto auto;
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
    min-height: 400px;
    min-width: 500px;  
    }

    .beads-container-selector {
    display: grid;
    grid-template-columns: auto auto auto auto;
        grid-gap: 20px;
   justify-content: flex-start;
        overflow: scroll;
    max-height: 400px;
    }
    
    
    .bead-container {
        width: 120px;
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
    padding: 30px;
    min-width: 700px;
 
    }
    
    
    .searchbar {
    height: 40px;
    width: 400px;
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
    grid-template-columns: auto auto auto auto auto;
    justify-content: flex-start;
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
    
</style>