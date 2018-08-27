<template>
<div class="konva-component">
    <div class="konva-component-container">
        

    <canvas id="canvas" ref="canvas" style="border: 1px solid #ddd;" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)" @mousemove="handleMouseMove($event)" @mouseout="handleMouseOut($event)" width="600" height="400"></canvas>

    <br>
        <button class="btn-small" @click="save()" width="50px">save design</button>   

           <p>mouse.current: {{ mouse.current }}<br>
            
        startX: {{ startX }} startY: {{ startY }}<br>
            mouseX: {{ mouseX }} mouseY: {{ mouseY }}<br>
            dragX: {{ dragX }} dragY: {{ dragY }}
        </p>
               
<p>{{ imgArray }}</p>
        <img v-if="saved === true" id="cimg" :src="imgurl">
    
      
  
    </div>
    </div>
</template>
<script>
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
        mouseX: 0,
        mouseY: 0,
        dragX: 0,
        dragY: 0,
        imgArray: [],
        imgArrayNum: 0,
        imgurl: '',
        saved: false

        
    }
},

name: 'KonvaComponent',


mounted: function(){
 
   var c = this.$refs.canvas;
    var ctx = c.getContext("2d");
     var imgArray = this.imgArray;
        
        this.opalBeadsImgs.forEach((beadImg, i) =>{
            var img = new Image();
            beadImg = this.opalBeadsImgs[i]
            
            img.src = beadImg;
            img.width = 100;
            img.height = 100;
            img.isDragging = false;
            img.imgX = i * 100;
            img.imgY = i * 40;
            imgArray.push(img);
         
            
        });
        
         if (imgArray.length === this.opalBeadsImgs.length){
            imgArray.forEach((el) =>{
             
                el.onload = function(){
                ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                }
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
        x: this.mouse.current.x - offsetX,
        y: this.mouse.current.y - offsetY
      }
    },
        
        opalBeadsImgs(){
           return this.$store.getters.opalBeadsImgs;
            
        
        }
      },
    
     methods: {
        
            
 
       
        save: function(event){
            
            var canvas = document.getElementById('canvas');
    
          this.imgurl = canvas.toDataURL();
            this.saved = true;
    
            
        },
         
          handleMouseDown: function (event) {
            
                var c = this.$refs.canvas;
                var offsetX = c.offsetLeft;
                var offsetY = c.offsetTop;
                var imgArray = this.imgArray;
              
              
              
                this.mouse.current = {
                x: event.pageX,
                y: event.pageY
                }
              
                this.mouse.down = true;
              
            
            this.mouseX = parseInt(this.mouse.current.x - offsetX);
            this.mouseY = parseInt(this.mouse.current.y - offsetY);
              
            this.startX = this.mouseX;
            this.startY = this.mouseY;
        
              
              // loop through imgs, check if mouse position is over     any of them, if yes set dragging on that img to true
            
              imgArray.some((el) => {
             
                  
                   if (this.startX >= el.imgX && this.startX <= el.imgX + el.width && this.startY >= el.imgY && this.startY <= el.imgY + el.height){
                
                  el.isDragging = true;
                  }

            })
              
          },
         
              
         handleMouseUp: function (event) {
           
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
            var offsetX = c.offsetLeft;
            var offsetY = c.offsetTop;
            var imgArray = this.imgArray;
             
            this.mouse.current = {
            x: event.pageX,
            y: event.pageY
            }
             
    
             this.mouse.down = false;
           this.mouseX = parseInt(this.mouse.current.x - offsetX);
            this.mouseY = parseInt(this.mouse.current.y - offsetY);
             
             imgArray.forEach((el) => {
                  
                 el.isDragging = false;
                 
                })
         },
         
         
         handleMouseOut: function(event){
           
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
            var offsetX = c.offsetLeft;
            var offsetY = c.offsetTop;
            var imgArray = this.imgArray;
             
            this.mouse.current = {
            x: event.pageX,
            y: event.pageY
            }
            this.mouseX = parseInt(this.mouse.current.x - offsetX);
            this.mouseY = parseInt(this.mouse.current.y - offsetY);
             
            this.mouse.down = false;
             
             imgArray.forEach((el) =>{
                 
                 el.isDragging = false;
            })
         },
         
        
         handleMouseMove: function (event) {
            
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
            var offsetX = c.offsetLeft;
            var offsetY = c.offsetTop;
            var imgArray = this.imgArray;
         
          
            this.mouse.current = {
            x: event.pageX,
            y: event.pageY
             }
             this.mouseX = parseInt(this.mouse.current.x - offsetX);
            this.mouseY = parseInt(this.mouse.current.y - offsetY);
             
            if(this.mouse.down){
                 this.dragX = this.mouseX - this.startX;
                this.dragY = this.mouseY - this.startY;
              
           
                
             imgArray.forEach((el) => {
          
                if(el.isDragging === true){
                    
                    el.imgX = this.mouseX;
                    el.imgY = this.mouseY;
                  
  
                ctx.drawImage(el, el.imgX - 50, el.imgY - 50, el.width, el.height)
                    
                } 
                 
                })
               
     
            
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

    

    }
    
          .bead-img-small-selected {
    width: 100px;
         height: 100px;
  object-fit: cover;
      user-select: none;
          margin: auto;
           border: 1px solid transparent;
          border-radius: 80%;
          -webkit-transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    transition-property: transform;
}
    
    #cimg {
        border: 1px solid red;
    }
   

</style>