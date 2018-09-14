<template>
<div class="interact-component">
    <div class="interact-container">
        

    <div class="selected">
    <div v-for="bead in canvasBeads" class="draggable" v-bind:style="{ transform: returnTransformString }">
     
        <div class="bead-box">
              <img class="bead-img-small-selected" :src="bead.image" />
        </div>
    

    </div>
        </div>
        
        <div class="dropzone">Drop 'em here.</div>
    
    </div>
</div>
</template>
<script>

const interact = require('interactjs');
    
export default {
data(){
    return {
        position: {
            x: 0,
            y: 0
        }
    }
},
name: 'InteractComponent',
    
    computed: {
        
        beads(){
            return this.$store.state.beads;
        },
        
        canvasBeads: function(){
            return this.beads.filter(bead => bead.stone === 'Opalite' );
        },
        
        returnTransformString: function(){
            
            const x = this.position.x;
            const y = this.position.y;
        
            return 'translate(' + x + 'px, ' + y + 'px)';
        }
    },
    
    mounted(){
     
        
        
        interact(".bead-img-small-selected")
            .draggable({
            autoScroll: true,
            inertia: false,
            restrict: {
                       restriction: "parent",
                       endOnly: true,
                       elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                   },
            onmove: function(event){
                
                const x = (this.position.x || 0) + event.dx;
				const y = (this.position.y || 0) + event.dy;
                
                this.position.x = x;
				this.position.y = y;
                
            }
        });
        
    }
}


</script>
<style>
    
    
    .interact-component {
    display: grid;
    justify-content: center;
    
    }
    
    .interact-container {
    width: 600px;
    height: 600px;
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
    
    border: 1px solid #ddd;
    }
    
    
    .dropzone {
    height: 300px;
        width: 600px;
        border: 1px solid red;
    }


</style>