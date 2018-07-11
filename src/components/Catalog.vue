<template>
  <div class="catalog">
      <div class="catalog-container">
      <h2>Catalog</h2>
          
           <div class="search-container">
              
                <input type="text" class="searchbar" v-model="search"/>
                
               <div v-for="result in results">{{ result }}</div>
              
              </div>
      
          <div class="beads-container">
              
            
    
          
          <div v-for="bead in filteredList" class="bead">
              <img class="bead-img" :src="bead.image"/>
              <p>{{ bead.stone }}<br>
                 {{ bead.size }}<br> 
                  {{ bead.cut }}<br>
                  {{ bead.color }}<br>
                  {{ bead.shape }}<br>
                  {{ bead.price }}
              
              
              
              
              </p>
              
          
          </div>
          
          
          </div>
      
      </div>
  </div>
</template>

<script>
export default {
  name: 'Catalog',
  data () {
    return {
        search: ''

    }
  },
    
    computed: {
        beads(){
            return this.$store.state.beads;
        },
        
        filteredList: function(){
            return this.beads.filter(bead => {
                return bead.stone.toLowerCase().includes(this.search.toLowerCase())
            })
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
     .catalog {
    display: grid;
    width: 100vw;
    }
    
    .catalog-container {
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
    
    .catalog-container h2 {
    text-align: center;
    }
    
    .beads-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
        grid-gap: 30px;
    }
    
     .bead-img {
    width: 100px;
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
    height: 50px;
    width: 500px;
    padding: 10px 12px;
    font-size: 20px;
    border: 1px solid #aaa;
    }
</style>