<template>
<div class="konva-component">
    <div class="konva-component-container">
        
        <div class="selected-info">
        <p>{{ clockwise }}</p>
         Length: {{ necklaceLength }} Selected bead: {{ selectedBead.id }} selected bead imgX: {{ selectedBead.imgX }} selected bead imgY: {{ selectedBead.imgY }}
        <p>{{ selectedBead }}</p>
        </div>
        

        
    <canvas id="canvas" ref="canvas" style="border: 1px solid #ddd;" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)" @mousemove="handleMouseMove($event)" @mouseout="handleMouseOut($event)" width="800" height="600"></canvas>

    <br>
   
        <span><button class="btn-small" @click="print()" width="50px">save design</button>  <button class="btn-small-gray" style="width: 100px" @click="resetBeads">reset</button>  <button class="btn-small-gray" style="width: 100px" @click="rotate">rotate</button></span>
<p v-if="designSaved === true" style="color: #8a52a3">Saved!</p>
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
        imgArrayNum: 0,
        selectedBead: '',
        angleInDegrees: 0,
        originX: 0,
        originY: 0,
        clockwise: '',
        designSaved: false
        
        
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
    
    if(this.necklace === false){
        
        this.drawBraceletTemplate();
        
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
            }
        
     
      },
    
     methods: {
         
         
            print: function(){
     
                var canvas = document.getElementById('canvas');
                var dataURL = canvas.toDataURL();
                this.$emit('save', dataURL);
                
                this.designSaved = true;
                
               
                
                
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
                    ctx.scale(1.6, 2.6);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
                }
                
                // 45 cm -- regular short necklace
                
                if(this.necklaceLength === '45'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(1.8, 2.2);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
         
                }
                
                // 50 cm -- regular long necklace
                
                if(this.necklaceLength === '50'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(1.9, 2.5);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
    
                }
                
                // 60 cm -- pendant
                
                if(this.necklaceLength === '60'){
                    var radius = 100;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = 0;
                    var centerY = 0;
            
                    ctx.save();
                    ctx.translate(canvasWidth / 2, canvasHeight / 2);
                    ctx.scale(2, 2.8);
             
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                    ctx.restore();
         
                }
                
                // 80 cm -- really long pendant
                
                if(this.necklaceLength === '80'){
                    var radius = 150;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
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
                
                
                if(this.braceletLength === '14'){
                  var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '15'){
                 var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '16'){
                 var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '17'){
                 var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '18'){
                 var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '19'){
                 var radius = 175;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                
                ctx.stroke();


            },
        
            
            setCanvasBeads: function(){
                
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var imgArray = this.imgArray;
                
    
                this.selectedBeads.forEach((bead, i) =>{
                var img = new Image();
                bead = this.selectedBeads[i];
              
            
                img.src = bead.image;
                img.width = 110;
                img.height = 110;
                img.isDragging = false;
                img.isSelected = false;
                img.imgX = 0;
                img.imgY = i * 80;
                img.id = bead._id;
                imgArray.push(img);
         
            
                });
        
                if (imgArray.length === this.selectedBeads.length){
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
                var canvasHeight = 600;
                
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
            
              imgArray.forEach((el) => {
             
                  
                   if (this.startX >= el.imgX && this.startX <= el.imgX + el.width && this.startY >= el.imgY && this.startY <= el.imgY + el.height){
                
                  el.isDragging = true;
               this.selectedBead = el;
  
    
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
             var canvasHeight = 600;
         
          
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
                    
                    el.imgX = this.mouseX - 55;
                    el.imgY = this.mouseY - 55;
                
                }
                 
                ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height)
                 
                 
                })
               
     
            
            }
             
           
        },
         
                
                   
         rotate: function(){
             
            var to_radians = Math.PI/180;
             
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
            var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
            var canvasWidth = 800;
            var canvasHeight = 600;
             var cx = canvasWidth / 2;
             var cy = canvasHeight / 2;
             var clockwise = this.clockwise;
             
             
             var selected = this.selectedBead;
            
             clockwise = this.angleInDegrees += 30;
             
             imgArray.forEach((el) => {
                 if(el === selected){
                     this.originX = el.imgX;
                     this.originY = el.imgY;
                     
                 }
             })
            
            ctx.clearRect(0,0, canvasWidth, canvasHeight);
            this.drawNecklaceTemplate();
             
              imgArray.forEach((el) => {
                if(el !== selected){
                    ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                }
            })
             
            ctx.save();
             
            ctx.translate(this.originX, this.originY);
             ctx.translate(60, 60)
             
              ctx.rotate(clockwise * to_radians);
             
             ctx.translate(-60, -60);
             ctx.translate(-this.originX, -this.originY);
    
             imgArray.forEach((el) => {
                
                 if(el === selected){
                     
                    ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height); 
                 }
                 
             })
             
              
                 
            ctx.restore();
              
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
    .canvas-info {
    display: none;
    }
    
    .selected-info {
        display: none;
    }
   

</style>