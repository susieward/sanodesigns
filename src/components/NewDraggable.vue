<template>
<div class="new-draggable">
    <div class="test-container">
        

    <div class="selected">
     
    <VueDragResize v-for="(bead, index) in canvasBeads"
                   :key="bead._id"
                   :isResizable="false"
                   :parentLimitation="true">

       
              <img class="bead-img-small-selected" :src="bead.image" />
     

        </VueDragResize>
    
    </div>
  
        
    
    </div>
</div>
</template>
<script>

import VueDragResize from 'vue-drag-resize';
    
export default {
data(){
    return {
     
    }
},
name: 'NewDraggable',

components: {
            VueDragResize
        },
    
    computed: {
        
        beads(){
            return this.$store.state.beads;
        },
        
        canvasBeads: function(){
            return this.beads.filter(bead => bead.stone === 'Opalite' );
        }
        
     
        
    }
}


</script>
<style>
    
    
    .new-draggable {
    display: grid;
    justify-content: center;
        position: relative;
    
    }
    
    .test-container {
    width: 700px;
   
    border: 1px solid blue;
    }
    
    
      .bead-img-small-selected {
    width: 100%;
         height: 100%;
  object-fit: cover;
          margin: auto;
    
    }
    
     .bead-box {
       width: 130px;
        height: 80px;
      margin: auto;
  user-select: none;
         border: 1px solid transparent;
        border-radius: 50%;
    }
    
     .selected {
        display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-auto-rows: 100px;
    
        align-content: flex-start;
    position: relative;
    border: 1px solid #ddd;
        top: 30;
         height: 300px;
    }
    
    
    .dropzone {
    height: 300px;
        width: 600px;
        border: 1px solid red;
    }


</style>