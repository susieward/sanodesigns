<template>
<transition name="modal">
        <div class="modal-mask">
     <div class="modal-content">
         <div class="modal-container">

             <div class="modal-header">

                 <div class="close-container">
                 <span class="close" @click="$emit('close')">x</span>
                 </div>
             </div>

    <div class="bead-modal-container" v-if="showEditor === false && deleteClick === false">

    <div class="modal-bead-img-container">
    <img class="modal-bead-img" :src="bead.image"/>
     </div>


   <div class="bead-details">

      <span class="prop-name">Stone:</span> <span class="bead-prop">{{ bead.stone }}</span>
    <span class="prop-name">Size:</span> <span class="bead-prop">{{ formatBeadSize(bead.size) }}</span>
     <span class="prop-name">Cut:</span> <span class="bead-prop">{{ bead.cut }}</span>
     <span class="prop-name">Color:</span> <span class="bead-prop"> {{ bead.color }}</span>
      <span class="prop-name">Shape:</span> <span class="bead-prop">{{ bead.shape }}</span>
       <span class="prop-name">Price:</span> <span class="bead-prop">{{ formatPrice(bead.price) | usdollar }}</span>

              </div>
             </div>


    <div class="bead-editor" v-if="showEditor === true && deleteClick === false">

    <div class="modal-bead-img-container">
    <img class="modal-bead-img" :src="beadEdit.image"/>



     </div>


   <div class="bead-details-edit">

      <label for="stone">Stone:</label> <input id="stone" type="text" name="stone" v-model="beadEdit.stone" :placeholder="bead.stone"/>

       <label for="size">Size:</label> <input id="size" type="number" name="size" v-model="beadEdit.size" :placeholder="bead.size"/>

       <label for="cut">Cut:</label> <input id="cut" type="text" name="cut" v-model="beadEdit.cut" :placeholder="bead.cut"/>

        <label for="color">Color:</label> <input id="color" type="text" name="color" v-model="beadEdit.color" :placeholder="bead.color"/>


        <label for="price">Price:</label> <input id="price" type="number" name="price" v-model="beadEdit.price" :placeholder="bead.price"/>

       <label for="shape">Shape:</label> <input id="shape" type="text" name="shape" v-model="beadEdit.shape" :placeholder="bead.shape"/>

       <label for="image" style="margin-top: 15px;">Image:</label>


     <span class="imgupload"><input type="file" @change="onFileChange"></span>







              </div>

             </div>

             <div class="confirm-delete" v-if="deleteClick === true">
                 <span>Are you sure you want to delete this item?<br>You can't undo this action.</span>


              </div>

     <div class="modal-btns">

        <button class="btn-small-gray" @click="openEditor(bead)" v-if="showEditor === false && deleteClick === false">edit</button>
        <button class="btn-small-gray" v-if="showEditor === false && deleteClick === false" @click="showDelete">delete</button>

         <button class="btn-small-gray" @click="closeEditor" v-if="showEditor === true && deleteClick === false">close editor</button>
         <button class="btn-small-gray" v-if="showEditor === true && deleteClick === false" @click="editBead(bead)">save changes</button>


                    <button class="btn-small" @click="deleteBead(bead._id)" v-if="showEditor === false && deleteClick === true">yes, delete</button>

         <button class="btn-small-gray" @click="hideDelete" v-if="showEditor === false && deleteClick === true">no, cancel</button>

             </div>
          </div>
            </div>

    </div>
    </transition>
</template>
<script>

import axios from 'axios'

export default {
data(){
    return {

        showEditor: false,
        deleteClick: false,
        error: '',
        beadEdit: {
            stone: '',
            size: '',
            cut: '',
            color: '',
            price: '',
            shape: '',
            image: ''
        },



    }
},
name: 'BeadModal',

props: ['bead', 'imgNornal', 'imgZoom'],

created(){

    this.beadEdit = Object.assign({}, this.bead);
},



    computed: {
        beads(){
            return this.$store.state.beads;
        }
    },

    methods: {

        showDelete: function(){
            this.deleteClick = true

        },

        hideDelete: function(){
            this.deleteClick = false;
        },

        openEditor: function (bead){
            this.showEditor = true;
            this.selectedBead = "bead"
        },

        closeEditor: function(){
            this.showEditor = false;
        },

        editBead: function(bead){


            let path = 'https://sanodesigns-server.herokuapp.com/beads/' + bead._id;

            axios.put(path, {
                stone: this.beadEdit.stone,
                size: this.beadEdit.size,
                cut: this.beadEdit.cut,
                color: this.beadEdit.color,
                price: this.beadEdit.price,
                shape: this.beadEdit.shape,
                image: this.beadEdit.image,
                _id: bead._id
            }).then((response) => {
                this.$store.commit('editBead', {bead: response.data});
                this.$store.dispatch('loadBeads');
            });
              this.$emit('close');

        },

        deleteBead: function(_id){

            let path = 'https://sanodesigns-server.herokuapp.com/beads/' +_id;

            axios.delete(path).then((response) => {
                this.$store.commit('deleteBead', _id);
            });
            this.$emit('close');
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
              this.beadEdit.image = vm.image;
          };
          reader.readAsDataURL(file);
        },
        removeImage: function (e) {
          this.beadEdit.image = '';
        },

        formatBeadSize: function(value){
         return value + '' + ' mm'
     },

     formatPrice: function(value){
     return value.toFixed(2);
 },


    moveBG: function (ev) {

      var container = this.zoomer,
          imgZoom = container.childNodes[4]; // MEMO: Yes, I can select this better


      var e = {
        w: imgZoom.offsetWidth,
        h: imgZoom.offsetHeight
      };

      var c = {
        x: Math.round((ev.clientX - (container.offsetLeft - window.scrollX)) / (e.w / 100)),
        y: Math.round((ev.clientY - (container.offsetTop - window.scrollY)) / (e.h / 100))
      };

      imgZoom.style.backgroundPosition = c.x + '% ' + c.y + '%';
    }
  },

  filters: {
    usdollar: function(value) {
      return `$${value}`;
    }
  }

    }


</script>
<style>

    .bead-modal {

    }
.fil {
  border: none;
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
display: grid;
    justify-content: center;
align-items: center;
  background-color: rgba(0, 0, 0, .5);
transition: opacity .3s ease;
}

.modal-content {
display: grid;
position: relative;
align-content: flex-start;
background-color: #fefefe;
padding: 25px;
width: 830px;
min-width: auto;
min-height: 400px;
overflow: scroll;
max-height: 550px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}
    .modal-container {
    display: grid;
    grid-gap: 20px;
    padding: 0px;

    }

    .modal-header {
    display: grid;


    }

    .close-container {
    display: grid;
    justify-content: flex-end;
    }

    .close {
    color: #a4a4a4;
    font-size: 28px;
    cursor: pointer;
    transition: 0.2s;
    }

    .close:hover {
    color: #000;
    }

    .modal-items {
    display: grid;
    background-color: #f9f9f9;
    padding: 20px;
    grid-gap: 0;
    min-height: 250px;
    align-items: flex-start;
    }

    .bead-details {
        display: grid;
        grid-template-columns: auto auto;
    justify-content: flex-start;
        align-content: center;
        font-size: 18px;
        line-height: 30px;

    }

    .bead-modal-container {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
        align-content: center;
    grid-gap: 20px;

        min-height: 350px;
    }

    .modal-bead-img-container {
    width: 350px;

    }
     .modal-bead-img {
    width: 100%;
        height: auto;
    border: 1px solid #ddd;
    cursor: pointer;
    }

    .prop-name {
    margin-right: 30px;
    color: #222;

    }

    .bead-prop {

    }

    .modal-btns {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 200px;


    }

    #1 {
    display: grid;
    justify-content: flex-start;
    }

    #2 {
    display: grid;
    justify-content: center;

    }

    .bead-editor {
         display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
        align-content: center;
    grid-gap: 20px;

        min-height: 350px;
    }

    .bead-details-edit {
         display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: repeat(7, auto);
    justify-content: flex-start;
        align-content: center;
        font-size: 18px;
        line-height: 30px;
    }

    .bead-details-edit input[type=text] {
    padding: 4px 6px;
    width: 200px;
    font-size: 16px;
        margin: 5px;
    font-family: 'Karla';
    border: 1px solid #C4A8D1;
    border-radius: 4px;
    }

    .bead-details-edit input[type=number] {
    padding: 4px 6px;
    width: 200px;
    font-size: 16px;
        margin: 5px;
    font-family: 'Karla';
    border: 1px solid #C4A8D1;
    border-radius: 4px;
    }

    .bead-details-edit label {
    margin-right: 20px;
    margin-top: auto;
    margin-bottom: auto;
    }

    .confirm-delete {
    display: grid;
justify-content: center;
        align-items: center;
       font-size: 18px;
        line-height: 24px;
        padding: 100px;
        min-height: 350px;
        text-align: center;
        color: red;
    }
        .confirm-delete span {
            padding: 20px;
        }


    .zoomer {
  position: relative;
  width: 640px;
  height: 640px;
  border: 0;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  //box-shadow: 0px 5px 10px #000;

  transition: all .5s ease-out;

  &:hover {
    // border-radius: 50%;
    cursor: move;
    .normal {
      opacity: 0;
      transform: scale(1.1);
    }
    .plus {
      opacity: 0;
      transform: scale(.8);
    }
  }
}

.img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: white;
  transition: all ease-out .3s;
}

.normal {
  z-index: 20;
  background-size: contain;
}

img.normal {
  opacity: 0;
  width: 100%;
}

.zoom {
  z-index: 10;
  transition: none;
}

.plus {
  position: absolute;
  transition: all ease-out .4s;
  width: 60px;
  height: 60px;
  z-index: 30;
  left: calc(50% - 30px);
  top: calc(50% - 30px);
}


.imgupload {
  margin-top: 15px;
}

</style>
