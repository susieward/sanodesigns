<template>
<div class="konva-component">
    <div class="konva-component-container">
    <canvas id="canvas" ref="canvas" style="border: 1px solid #ddd;" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" width="600" height="400"></canvas>
        
        
        <p>{{ mouse.current }}</p>
        <p>startX : {{ startX }}</p>
        <p>startY: {{ startY }}</p>
<p>{{ imgArray }}</p>
        
        <div v-for="img in imgArray">
        
        
        {{ img.src }}
        
        </div>
  
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
        startX: 0,
        startY: 0,
        imgArray: []
        
    }
},

name: 'KonvaComponent',


components: {
    Bead
},
    
    
    mounted: function(){
       
        var c = this.$refs.canvas;
         var ctx = c.getContext("2d");
     var imgArray = this.imgArray;
        
        
        
        this.opalBeadsImgs.forEach(function(v){
            var img = new Image();
            
            
            img.src = v;
            img.isDragging = false;
            img.setatX = Math.floor( Math.random() * 306 );
            img.setatY = Math.floor( Math.random() * 100 );
            imgArray.push(img);
         
            
        });
        
        if (imgArray.length){
            imgArray.forEach(function(v){
                ctx.drawImage(v, v.setatX, v.setatY, 100, 100);
            })
  
        }
        
     
  
        
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
              
               var c = this.$refs.canvas;
                var offsetX = c.offsetLeft;
                var offsetY = c.offsetTop;
                var imgArray = this.imgArray;
              
            this.mouse.current = {
            x: event.clientX,
            y: event.clientY
            }
              
              var mouseX = parseInt(this.mouse.current.x - offsetX);
              var mouseY = parseInt(this.mouse.current.y - offsetY);
        
              
              imgArray.forEach(function(v){
                  
                  if (mouseX >= (this.currentMouse.x - 100/2) &&
                     mouseX <= (this.currentMouse.x + 100/2) ){
                 
                    v.isDragging = true;
              
                  
               }
            })
              
              this.startX = mouseX;
              this.startY = mouseY;
          },
         
              
         handleMouseUp: function () {
             
                
            var imgArray = this.imgArray;
              
             imgArray.forEach(function(v){
                  
                      v.isDragging = false;
                 
                  
               })
            
             
         
        },
         
        handleMouseMove: function (event) {

            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
            var imgArray = this.imgArray;
            var startX = this.startX;
            var startY = this.startY;
            
            this.mouse.current = {
            x: event.clientX,
            y: event.clientY
             }
            
            var distX = parseInt(this.currentMouse.x - startX);
            var distY = parseInt(this.currentMouse.y - startY);
            
            
                ctx.clearRect(0,0, 600, 400);
                imgArray.forEach(function(v){
                    
                
                    
                    v.setatX = distX;
                    v.setatY = distY;
                    
                
                ctx.drawImage(v, v.setatX, v.setatY, 100, 100)
                    
                })
                    
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