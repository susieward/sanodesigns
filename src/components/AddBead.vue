<template>
<div class="add-bead">
    <h3>Add new bead</h3>
       <div class="new-bead">
        
        
        <label for="stone">Stone:</label> <input id="stone" type="text" name="stone" v-model="newBead.stone"/>
           
        <label for="size">Size:</label> <input id="size" type="text" name="size" v-model="newBead.size"/>
           
        <label for="cut">Cut:</label> <input id="cut" type="text" name="cut" v-model="newBead.cut"/>
           
        <label for="color">Color:</label> <input id="color" type="text" name="color" v-model="newBead.color"/>
           
        
        <label for="price">Price:</label> <input id="price" type="text" name="price" v-model="newBead.price"/>
        
       <label for="shape">Shape:</label> <input id="shape" type="text" name="shape" v-model="newBead.shape"/>
        
            
            
        </div>
    <button class="btn-small" @click="addBead" style="width: 200px;">add bead</button>
            <span style="color:red" v-show="error"> {{ error }}</span>

    </div>
</template>
<script>
import axios from 'axios'
export default {
data(){
    return {
        error: '',
        newBead: {
            stone: '',
            size: '',
            cut: '',
            color: '',
            price: '',
            shape: ''
        }
        
    }
},
name: 'AddBead',
    
    methods: {
        
        addBead: function(){
            
            axios.post('http://localhost:3000/beads', {
            stone: this.newBead.stone,
            size: this.newBead.size,
            cut: this.newBead.cut,
            color: this.newBead.color,
            price: this.newBead.price,
            shape: this.newBead.shape
        }).then((response) => {
                this.$store.commit('addBead', {bead: response.data})
            });
            this.newBead = {};
        }
        
    }
}


</script>
<style>

    .add-bead {
    display: grid;
  justify-content: center;
        align-content: flex-start;
        padding: 30px;
min-height: 100vh;
    }
    
    .add-bead h3 {

    }
    
    .new-bead {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(6, auto);

    justify-content: flex-start;
        align-content: center;
          min-width: 600px;
    padding: 20px;
        border: 1px solid #ddd;
   margin-top: 20px;
    margin-bottom: 20px;
    }
    
    .new-bead input {
    padding: 4px 6px;
    width: 200px;
    font-size: 16px;
        margin: 5px;
    font-family: 'Karla';
    border: 1px solid #C4A8D1;
    border-radius: 4px;
    }
    
    .new-bead label {
    margin-right: 20px;
    margin-top: auto;
    margin-bottom: auto;
    }

</style>