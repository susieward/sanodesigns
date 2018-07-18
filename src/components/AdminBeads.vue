<template>
<div class="admin-beads">
    
     <div class="search-container">
              <p>Type to search for all properties:</p>
                <input type="text" class="searchbar" v-model="search"  placeholder="blue, round, 10 mm, smooth, etc"/>
         <p>Or, filter by: </p>
             
             <span><span><input type="checkbox" id="stone" v-model="selectedProps" value="stone"> <label for="stone">stone</label></span>
         
         <span><input type="checkbox" id="size" v-model="selectedProps" value="size"> <label for="size">size</label></span>
         
         <span><input type="checkbox" id="cut" v-model="selectedProps" value="cut"> <label for="cut">cut</label></span>
         
         <span><input type="checkbox" id="colore" v-model="selectedProps" value="color"> <label for="color">color</label></span>
         
         <span><input type="checkbox" id="shape" v-model="selectedProps" value="shape"> <label for="shape">shape</label></span>
         
         <span><input type="checkbox" id="price" v-model="selectedProps" value="price"> <label for="price">price</label></span>
         </span>
         
         {{ selectedProps }}
              </div>
    
 <div class="admin-beads-container">
    
        <div v-for="bead in filteredList" class="admin-bead" @click="openModal(bead)">
              <img class="admin-bead-img" :src="bead.image" @click="openModal(bead)"/>
              <div class="admin-bead-details">
                
                  <span class="admin-prop-name">Stone:</span> <span>{{ bead.stone }}</span> 
                  <span class="admin-prop-name">Size:</span> <span>{{ bead.size }}</span> 
                  <span class="admin-prop-name">Cut:</span> <span>{{ bead.cut }}</span> 
                  <span class="admin-prop-name">Color:</span> <span>{{ bead.color }}</span> 
                  <span class="admin-prop-name">Shape:</span> <span>{{ bead.shape }}</span> 
                  <span class="admin-prop-name">Price:</span> <span>{{ bead.price }}</span> 
                  <span class="admin-prop-name">Id:</span> <span>{{ bead._id }}</span> 
            
              </div>
              
            </div>
          </div>
        
        <bead-modal v-if="showModal === true" :bead="bead" @close="closeModal"></bead-modal>   
    
    
    </div>

</template>
<script>
import BeadModal from './BeadModal.vue'
export default {
    data() {
        return {
            showModal: false,
            search: '',
            searchProps: ['stone', 'size', 'cut', 'color', 'shape', 'price'],
            selectedProps: []
        }
    },
    name: 'AdminBeads',
    
    components: {
        BeadModal
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
        

        
        
        openModal: function(bead){
            this.showModal = true;
            this.bead = bead;
        },
        
        closeModal: function(){
            this.showModal = false;
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
    .admin-beads {
    display: grid;
    align-content: flex-start;
    }

     .admin-bead-img {
    width: 150px;
    object-fit: cover;
    cursor: pointer;
         margin: auto;

    }
    
    
    
    .admin-beads-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
        grid-gap: 30px;
        justify-content: center;
        padding: 5px;
        min-width: 700px;

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
    
    .admin-bead {

    display: grid;
    justify-content: center;
        padding: 5px;
         border: 1px solid #eee;
        cursor: pointer;
    }
    
    .admin-bead:hover {
        border: 1px solid #C4A8D1;
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
</style>