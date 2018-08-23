<template>
<div class="konva-component">
    <div class="konva-component-container">
    <canvas id="canvas" ref="canvas" style="border: 1px solid #ddd;" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" width="600" height="400"></canvas>


    </div>
    </div>
</template>
<script>
import Bead from './Bead.vue'
export default {
data(){
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
        isDragging: false,
        images: []
        
    }
},

name: 'KonvaComponent',


components: {
    Bead
},
    
    
    mounted: function(){
       
        var c = this.$refs.canvas;
         var ctx = c.getContext("2d");
      
        
        
        
        this.opalBeadsImgs.forEach(function(v){
            var img = new Image();
            img.src = v;
            img.setatX = Math.floor( Math.random() * 306 );
                img.setatY = Math.floor( Math.random() * 100 );
             img.onload = function(){
            
            ctx.drawImage(img, img.setatX, img.setatY, 100, 100);
            
        };
        });
  
        
    },
    
    computed: {
        
    currentMouse: function () {
      var c = this.$refs.canvas;
        var rect = c.getBoundingClientRect();
         var offsetX = c.offsetLeft;
        var offsetY = c.offsetTop;
       
      
      return {
        x: parseInt(this.mouse.current.x - offsetX),
        y: parseInt(this.mouse.current.y - offsetY)
      }
    },
        
        opalBeads(){
           return this.$store.getters.opalBeads
            
        
        },
        
        opalBeadsImgs(){
            return this.$store.getters.opalBeadsImgs
        }
      },
    
     methods: {
        
       
         
          handleMouseDown: function (event) {
            this.mouse.down = true;
            this.isDragging = true;
              
            this.mouse.current = {
            x: event.clientX,
            y: event.clientY
                }
              

        },
         
              
         handleMouseUp: function () {
                this.mouse.down = false;
             this.isDragging = false;
        },
         
        handleMouseMove: function (event) {

            this.mouse.current = {
            x: event.clientX,
            y: event.clientY
             }
      
            if (this.isDragging ) {
            var c = this.$refs.canvas;

            var ctx = c.getContext("2d");
   
          
                ctx.clearRect(0,0, 600, 400);
                ctx.drawImage(this.img, this.currentMouse.x - 40, this.currentMouse.y - 40, 100, 100);
            }
      
    }
     }
    
}

</script>
<style>

    .konva-component {
    display: grid;
    justify-content: center;
    min-height: 100vh;
    padding: 50px;
    }
    
    .konva-component-container{
    display: grid;
    

    }

</style>