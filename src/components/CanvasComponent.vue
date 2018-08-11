<template>
<div class="canvas-component">
    
   <canvas style="border: 1px solid blue" id="canvas" ref="canvas">
  
    </canvas>
    
    
    <canvas ref="selected"></canvas>
     
<img ref="canvasImage"/>
                

    
    </div>


</template>
<script>
export default {
data(){
    return {
        loadedBeads: []
    }
},
name: 'CanvasComponent',
    
    
    
    computed: {
        
        beads(){
            return this.$store.state.beads;
        },
        
        canvasBeads: function(){
            return this.beads.filter(bead => bead.stone === 'Opalite' );
        },
            
        canvasBeadImages: function(){
            return this.canvasBeads.map(bead => bead.image);
            
        }

    },
    
    methods: {
        
        loadBackground: function(){
        var canvas = this.$refs.canvas;
         var ctx = canvas.getContext("2d");

        canvas.width = 903;
        canvas.height = 657;


        var background = new Image();
        background.src = "http://localhost:8080/static/mock-template-edit.png";

            // Make sure the image is loaded first otherwise nothing will draw.
            background.onload = function(){
            ctx.drawImage(background,0,0);   
            }
        },
        
           loadBeads: function(canvasBeadImages){
            
            var beads = this.canvasBeadsImages;
            
            var canvas = this.$refs.selected;
            var ctx = canvas.getContext("2d");
            
            for (var i = 0; i < beads.length; i++){
               var bead = new Image();
          
                
                bead.onload = function(){
                    ctx.drawImage(bead, 0,0)
                }
            }
        }
   
        
        
    },
    
    mounted: function(){
        
        this.loadBackground();
        this.loadBeads();

   
    
}
}

</script>
<style>
    .canvas-component {
    display: grid;
    border: 1px solid #444;
    }
    
        
      .bead-img-small-selected {
    width: 100%;
         height: 100%;
  object-fit: cover;
          margin: auto;
    }
    
     .bead-container-selected {
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
    
</style>