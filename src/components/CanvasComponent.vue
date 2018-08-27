<template>
<div class="canvas-component">
    <div class="canvas-content">
    
   <canvas id="canvas" style="border: 1px solid blue" ref="canvas" width="400" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" height="300">
  
    </canvas>
  
        <span style="width: 50px">
        <button class="btn-small" @click="save()">save</button>
        </span>
        Img:
        <img :src="imgUrl">
            {{ opalBeadsImgs }}
 

                
    </div>
    
    </div>


</template>
<script>
export default {
data(){
    return {
       isDragging: false,
        canMouseX: null,
        canMouseY: null,
        img: '',
        designImg: '',
        imgUrl: ''
        
    }
},
name: 'CanvasComponent',
    
    
    
    computed: {
        
        beads(){
            return this.$store.state.beads;
        },
        
        
        opalBeadsImgs(){
            return this.$store.getters.opalBeadsImgs;
        }

    },
    
      mounted: function(){
         
          var canvas = this.$refs.canvas;
            var ctx = canvas.getContext("2d");
       

           this.img = new Image()
          this.img.src = 'http://localhost:3000/photos/20180708_174019.png'
          this.img.onload = function(){
             ctx.drawImage(this, 0, 0, 100, 100)
         };
          
         
          
      },
    
        methods: {
            
            
        save: function(){
            
            var canvas = this.$refs.canvas;
            var dataURL = canvas.toDataURL('image/png');
            
           var img = new Image();
            img.src = dataURL;
            document.body.appendChild(img);
           
            
        },
       
    handleMouseDown: function(e){
        
        var canvas = this.$refs.canvas;
        var ctx = canvas.getContext("2d");
        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        
        
     this.canMouseX = parseInt(e.clientX - offsetX);
      this.canMouseY = parseInt(e.clientY - offsetY);
      // set the drag flag
      this.isDragging = true;
    },

    handleMouseUp: function(e){
        
       var canvas = this.$refs.canvas;
        var ctx = canvas.getContext("2d");
        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        
        
     this.canMouseX = parseInt(e.clientX - offsetX);
      this.canMouseY = parseInt(e.clientY - offsetY);
      // clear the drag flag
      this.isDragging = false;
    },
        
        handleMouseMove: function(e){
            
            var canvas = this.$refs.canvas;
        var ctx = canvas.getContext("2d");
        var offsetX = canvas.offsetLeft;
        var offsetY = canvas.offsetTop;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
       
        
        
     this.canMouseX = parseInt(e.clientX - offsetX);
      this.canMouseY = parseInt(e.clientY - offsetY);
            
            if(this.isDragging){
                ctx.clearRect(0,0, canvasWidth, canvasHeight);
                ctx.drawImage(this.img, this.canMouseX - 90, this.canMouseY - 140, 100, 100);
            }
            
        }
        
    

    }
    
    
   

}
        
   
        
        

   




</script>
<style>
    .canvas-component {
    display: grid;
    min-height: 100vh;
    padding: 30px;
    position: relative;
    }
    
    .canvas-content {
    display: grid;
    border: 1px solid #eee;
    position: relative;
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