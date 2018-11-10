<template>
<div class="add-bead">
    <h3>Add new bead</h3>
       <div class="new-bead">


        <label for="stone">Stone:</label> <input id="stone" type="text" name="stone" v-model="newBead.stone"/>

        <label for="size">Size:</label><span> <input id="size" type="number" name="size" min="01" placeholder="00" v-model="newBead.size"/>mm</span>

        <label for="cut">Cut:</label> <input id="cut" type="text" name="cut" v-model="newBead.cut"/>

        <label for="color">Color:</label> <input id="color" type="text" name="color" v-model="newBead.color"/>


        <label for="price">Price:</label> <span>$<input id="price" type="number" min="0.01" placeholder="0.00" name="price" v-model="newBead.price"/></span>

       <label for="shape">Shape:</label> <input id="shape" type="text" name="shape" v-model="newBead.shape"/>

       <label for="image" style="margin-top: 15px;">Image:</label> <div class="imgupload">

           <div v-if="!newBead.image">
     <input type="file" @change="onFileChange">
           </div>
           <div v-else>

               <img class="add-bead-img" v-bind:src="newBead.image"/>

     <button @click="removeImage">Remove image</button>
   </div>
           <span style="color:red" v-show="imgerror"> {{ imgerror }}</span>
             </div>



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
        imgerror: '',
        newBead: {
            stone: '',
            size: '',
            cut: '',
            color: '',
            price: '',
            shape: '',
            image: ''
        }

    }
},
name: 'AddBead',

    methods: {

        addBead: function(){

          if (this.newBead.stone=== "" || this.newBead.size === "" || this.newBead.cut === "" || this.newBead.color === "" || this.newBead.price === "" || this.newBead.shape === "") {
        this.error = 'All fields (including image) are required.'
    } else {

            axios.post('https://sanodesigns-server.herokuapp.com/beads', {
            stone: this.newBead.stone,
            size: this.newBead.size,
            cut: this.newBead.cut,
            color: this.newBead.color,
            price: this.newBead.price,
            shape: this.newBead.shape,

        }).then((response) => {
                this.$store.commit('addBead', {bead: response.data});
                this.newBead = {};
                this.error = '';
                this.newBead.image = '';
                this.$router.push('/admin');
            }).catch((error) => {
              this.imgerror = error.response.data;
            })
        }
      },

      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
           if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
            this.newBead.image = vm.image;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function (e) {
        this.newBead.image = '';
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
    grid-template-rows: repeat(7, auto);

    justify-content: flex-start;
        align-content: center;
          min-width: 600px;
    padding: 20px;
        border: 1px solid #ddd;
   margin-top: 20px;
    margin-bottom: 20px;
    }

    .new-bead input[type=text] {
    padding: 4px 6px;
    width: 200px;
    font-size: 16px;
        margin: 5px;
    font-family: 'Karla';
    border: 1px solid #C4A8D1;
    border-radius: 4px;
    }

    .new-bead input[type=number] {
    padding: 4px 6px;
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

    #size {
    width: 50px;
    }

    #price {
      width: 90px;
    }

    .add-bead-img-container {
    width: 250px;

    }
     .add-bead-img {
    width: 250px;
        height: auto;
    border: 1px solid #ddd;
    cursor: pointer;
    }

    .imgupload {
      margin-top: 15px;
    }

</style>
