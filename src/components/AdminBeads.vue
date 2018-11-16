<template>
<div class="admin-beads">

  <div v-if="!isAuthenticated">
    <login></login>
</div>

    <div v-if="isAuthenticated">
<p style="margin: 30px;">Click on a bead to make changes.</p>
     <div class="search-container">
              <p>Type to search for all properties:</p>
                <input type="text" class="searchbar" v-model="search"  placeholder="blue, round, Obsidian, 10 mm, smooth, $0.35, etc"/>
    </div>


     <div class="admin-beads-container">
<div v-for="bead in filteredList" class="admin-bead" @click="openModal(bead)" :key="bead._id">
   <img class="admin-bead-img" :src="bead.image" @click="openModal(bead)"/>
   <div class="admin-bead-details">

       <span class="admin-prop-name">Stone:</span> <span>{{ bead.stone }}</span>
       <span class="admin-prop-name">Size:</span> <span>{{ formatBeadSize(bead.size) }}</span>
       <span class="admin-prop-name">Cut:</span> <span>{{ bead.cut }}</span>
       <span class="admin-prop-name">Color:</span> <span>{{ bead.color }}</span>
       <span class="admin-prop-name">Shape:</span> <span>{{ bead.shape }}</span>
       <span class="admin-prop-name">Price:</span> <span>{{ formatPrice(bead.price) | usdollar }}</span>
       <span class="admin-prop-name">Id:</span> <span>{{ bead._id }}</span>

   </div>
</div>

          </div>

        <bead-modal v-if="showModal === true" :bead="bead" @close="closeModal"></bead-modal>


    </div>
</div>
</template>
<script>
import Login from './Login.vue'
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
        Login,
        BeadModal
    },

    computed: {

      isAuthenticated(){
          return this.$store.getters.isAuthenticated;
      },

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

        },

        formatPrice: function(value){
            return value.toFixed(2);
        },

           formatBeadSize: function(value){
            return value + '' + ' mm'
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
  border: 1px solid transparent;
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
    height: 40px;
    width: 400px;
    padding: 10px 12px;
    font-size: 18px;
    border: 1px solid #aaa;
        margin-bottom: 20px;
    }

</style>
