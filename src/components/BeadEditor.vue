 <template>

<div class="bead-editor">
        
    <div class="modal-bead-img-container">
    <img class="modal-bead-img" :src="bead.image"/>
     </div>
              
          
   <div class="bead-details-edit">
              
      <label for="stone">Stone:</label> <input id="stone" type="text" name="stone" v-model="beadEdit.stone" :placeholder="bead.stone"/>
           
       <label for="size">Size:</label> <input id="size" type="text" name="size" v-model="beadEdit.size" :placeholder="bead.size"/>
           
       <label for="cut">Cut:</label> <input id="cut" type="text" name="cut" v-model="beadEdit.cut" :placeholder="bead.cut"/>
           
        <label for="color">Color:</label> <input id="color" type="text" name="color" v-model="beadEdit.color" :placeholder="bead.color"/>
           
        
        <label for="price">Price:</label> <input id="price" type="number" name="price" v-model="beadEdit.price" :placeholder="bead.price"/>
        
       <label for="shape">Shape:</label> <input id="shape" type="text" name="shape" v-model="beadEdit.shape" :placeholder="bead.shape"/>
    
              </div>
        
             </div>
</template>
<script>
import axios from 'axios'
export default {
data(){
    return {
        error: '',
        beadEdit: {
            stone: '',
            size: '',
            cut: '',
            color: '',
            price: '',
            shape: ''
        }
        
    }
},
name: 'BeadEditor',
    
props: ['bead'],
    
created(){
    
    this.beadEdit = Object.assign({}, this.bead);
},
    
    methods: {
        
        editBead: function(_id){
    
            
            let path = 'http://localhost:3000/beads/' + _id;
            
            axios.put(path, {
                stone: this.beadEdit.stone,
                size: this.beadEdit.size,
                cut: this.beadEdit.cut,
                color: this.beadEdit.color,
                price: this.beadEdit.price,
                shape: this.beadEdit.shape,
                _id: _id
            }).then((response) => {
                this.$store.commit('editBead', {bead: response.data});
            });
            this.$emit('close');
            
        }
    }
}

</script>
<style>

    .bead-details-edit {
         display: grid;
        grid-template-columns: auto auto;
    justify-content: flex-start;
    
        align-content: center;
        font-size: 18px;
        line-height: 30px;
    }
    
    .bead-details-edit input {
    padding: 4px 6px;
        margin: 15px;
    width: 200px;
    font-size: 16px;
    font-family: 'Karla';
    border: 1px solid #C4A8D1;
    border-radius: 4px;
    }
    
    .bead-details-edit label {
    margin-right: 20px;
    }

</style>