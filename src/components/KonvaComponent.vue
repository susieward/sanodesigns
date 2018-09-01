<template>
<div class="konva-component">
    <div class="konva-component-container">
        {{ necklaceLength }}

    <canvas id="canvas" ref="canvas" style="border: 1px solid #ddd;" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)" @mousemove="handleMouseMove($event)" @mouseout="handleMouseOut($event)" width="800" height="700"></canvas>

    <br>
        <button class="btn-small" @click="print()" width="50px">save design</button>  <button class="btn-small-gray" style="width: 100px" @click="resetBeads">reset</button>  <button class="btn-small-gray" style="width: 100px">rotate</button>
        

<div class="canvas-info">
           <p>mouse.current: {{ mouse.current }}<br>
            
        startX: {{ startX }} startY: {{ startY }}<br>
            mouseX: {{ mouseX }} mouseY: {{ mouseY }}<br>
            dragX: {{ dragX }} dragY: {{ dragY }}
        </p>
               
<p>{{ imgArray }}</p>
    </div>
        
        <div>
       
    
        </div>
  
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
        imgArrayNum: 0

        
    }
},

name: 'KonvaComponent',
    
    props: ['selectedBeads', 'necklaceLength', 'braceletLength', 'necklace', 'bracelet'],


mounted: function(){
 
   var c = this.$refs.canvas;
    var ctx = c.getContext("2d");


    
   if(this.necklace === true){
       
    this.drawNecklaceTemplate();
    
   }
            if(this.selectedBeads.length){
        
        this.setCanvasBeads();
    }  


    
},
        
     
 
    
    computed: {
        
        currentMouse: function () {
                var c = this.$refs.canvas;
                var rect = c.getBoundingClientRect();
                var offsetX = rect.left;
                var offsetY = rect.top;
                return {
                x: this.mouse.current.x - offsetX,
                y: this.mouse.current.y - offsetY
                }
            },
        
            opalBeadsImgs(){
            return this.$store.getters.opalBeadsImgs;
       
        },
        
            selectedBeadsImgs(){
                return this.selectedBeads.map(bead => bead.image);
            },
        
            imagesDragging(){
                return this.imgArray.filter(el => el.isDragging);
            },
        
            canvasWidth(){
                
            },
        
            canvasHeight(){
                
            }
      },
    
     methods: {
         
         
            print: function(){
     
                var canvas = document.getElementById('canvas');
                var dataURL = canvas.toDataURL();
                this.$emit('save', dataURL);
                
               
                
                
            },
                

            
            drawNecklaceTemplate: function(){
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                
                 // 40 cm -- choker
                
                if(this.necklaceLength === '40'){
                    var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
           
                }
                
                // 42 cm -- lil necklace
                
                if(this.necklaceLength === '42'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(1.6, 2);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
                }
                
                // 45 cm -- regular short necklace
                
                if(this.necklaceLength === '45'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 700;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(2.3, 2.9);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
         
                }
                
                // 50 cm -- regular long necklace
                
                if(this.necklaceLength === '50'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 700;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(2.4, 3.1);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
    
                }
                
                // 60 cm -- pendant
                
                if(this.necklaceLength === '60'){
                    var radius = 120;
                    var canvasWidth = 800;
                    var canvasHeight = 700;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(2, 3.1);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
         
                }
                
                // 80 cm -- really long pendant
                
                if(this.necklaceLength === '80'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 550;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(1, 2);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
      
                }
                
                 ctx.stroke();

            },
         
           drawBraceletTemplate: function(){
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var canvasWidth = 800;
                var canvasHeight = 500;
                var centerX = canvasWidth / 2;
                var centerY = canvasHeight / 2;
                
                if(this.necklaceLength === '40'){
                var radius = 200;
                }
                
                if(this.necklaceLength === '42'){
                var radius = 250;
                }
                
                if(this.necklaceLength === '45'){
                var radius = 280;
                }
                
                if(this.necklaceLength === '50'){
                var radius = 300;
                }
                
                if(this.necklaceLength === '60'){
                var radius = 350;
                }
                
                if(this.necklaceLength === '80'){
                var radius = 400;
                }
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.stroke();


            },
        
            
            setCanvasBeads: function(){
                
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var imgArray = this.imgArray;
                
    
                this.selectedBeadsImgs.forEach((beadImg, i) =>{
                var img = new Image();
                beadImg = this.selectedBeadsImgs[i];
              
            
                img.src = beadImg;
                img.width = 100;
                img.height = 100;
                img.isDragging = false;
                img.imgX = i * 100;
                img.imgY = i * 10;
                imgArray.push(img);
         
            
                });
        
                if (imgArray.length === this.selectedBeadsImgs.length){
                imgArray.forEach((el) =>{
             
                el.onload = function(){
                ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                }
                })
  
            }
        },
         
            resetBeads: function(){
             
                var c = this.$refs.canvas;
              var rect = c.getBoundingClientRect();
                var offsetX = rect.left;
                var offsetY = rect.top;
                var imgArray = this.imgArray;
                 var canvasWidth = 800;
                var canvasHeight = 700;
                
                 this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
                
                 ctx.clearRect(0,0, canvasWidth, canvasHeight);
            
                    
                },
         
         
          handleMouseDown: function (event) {
           
                var c = this.$refs.canvas;
              var rect = c.getBoundingClientRect();
                var offsetX = rect.left;
                var offsetY = rect.top;
                var imgArray = this.imgArray;
              
        
              
                 this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
              
                this.mouse.down = true;
              
            
            this.mouseX = this.mouse.current.x - offsetX;
            this.mouseY = this.mouse.current.y - offsetY;
              
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
             var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
             
              this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
    
            this.mouse.down = false;
            this.mouseX = this.mouse.current.x - offsetX;
            this.mouseY = this.mouse.current.y - offsetY;
             
       
             
             imgArray.forEach((el) => {
                  
                 el.isDragging = false;
                 
                })
         },
         
         
         handleMouseOut: function(event){
          
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
             
              this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
             
            this.mouseX = this.mouse.current.x - offsetX;
            this.mouseY = this.mouse.current.y - offsetY;
             
            this.mouse.down = false;
             
             imgArray.forEach((el) =>{
                 
                 el.isDragging = false;
            })
         },
         
        
         handleMouseMove: function (event) {
            
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             var rect = c.getBoundingClientRect();
             var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
             var canvasWidth = 800;
             var canvasHeight = 700;
         
          
            this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
             
            this.mouseX = this.mouse.current.x - offsetX;
            this.mouseY = this.mouse.current.y - offsetY;
             
               this.dragX = this.mouseX - this.startX;
                this.dragY = this.mouseY - this.startY;
             
            if(this.mouse.down){
              
           ctx.clearRect(0,0, canvasWidth, canvasHeight);
            this.drawNecklaceTemplate();
               
             imgArray.forEach((el) => {
          
                if(el.isDragging){
                    
                    el.imgX = this.mouseX - 50;
                    el.imgY = this.mouseY - 50;
                
                }
                 
                ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height)
                 
                 
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
    
    .canvas-info {
    display: none;
    }
   

</style>