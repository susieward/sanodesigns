<template>
<div class="canvas-component">
    <div class="canvas-component-container">
        
      <span v-for="img in selectedArray">
        
        <img :src="img.src" :height="img.height" :width="img.width" class="dragBead" :id="img.id" @click="copyImg(img)">
        </span>
   
        
        
        
    <canvas id="canvas" ref="canvas" style="border: 1px solid #ddd;" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)" @mousemove="handleMouseMove($event)" @mouseout="handleMouseOut($event)" width="800" height="600"></canvas>

    <br>
   
        <div class="canvas-buttons"><button class="btn-small" @click="print()" width="50px">save design</button>  <button class="btn-small-gray" style="width: 100px" @click="resetBeads">reset</button>  <button class="btn-small-gray" style="width: 100px" @click="rotate">rotate</button></div>
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
        beadStartX: 0,
        beadStartY: 0,
        beadMouseX: 0,
        beadMouseY: 0,
        imgArray: [],
        beadImgArray: [],
        imgArrayNum: 0,
        selectedBead: '',
        angleInDegrees: 0,
        originX: 0,
        originY: 0,
        clockwise: '',
        designSaved: false,
        drawn: false,
        localBeads: [],
        selectedBeadId: '',
        selectedArray: [],
        beadSelected: false
        
    }
},

name: 'CanvasComponent',
    
    props: ['selectedBeads', 'necklaceLength', 'braceletLength', 'necklace', 'bracelet'],
     
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
       
        localIds(){
           
           if(this.localBeads.length){
           return this.localBeads.map(bead => bead.id);
           }
        },
       
       beadCanvasWidth(){
           
           return 800;
           
       },
       
        beadCanvasHeight(){
            
            return 100;
        }
       
      },
    
    mounted: function(){
 
        var c = this.$refs.canvas;
        var ctx = c.getContext("2d");
         var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
        
        
        this.localBeads = this.$store.state.localBeads;
        

        if(this.necklace === true){
            
            this.drawNecklaceTemplate();
        }
    
        if(this.bracelet === true){
        
            this.drawBraceletTemplate();
        
        }
        
        if(this.selectedBeads.length){
            
            
            this.loadSelectedArray();
            
        }
         $(function(){
                 
        
              
             $(".dragBead").draggable({
                 helper: 'clone'
                 
             });
              
             });
              

        
          
              
    },
    
     methods: {
         
         loadSelectedArray: function(){
             
             var selectedArray = this.selectedArray
             var localBeads = this.localBeads;
             
               this.selectedBeads.forEach((bead, i) =>{
                var img = new Image();
                
                bead = this.selectedBeads[i];
              
            
                img.src = bead.image;
                img.width = 110;
                img.height = 110;
                img.id = bead.id;
                img.imgX = 0;
                img.imgY = i * 80;
                
                img.onload = function(){
                selectedArray.push(img);
                
            }
         
            });
             
               if(localBeads.length){
                    
                    this.drawLocalBeads();
                }
         },
         
         copyImg: function(img){
            
             this.selectedBeadId = img.id;
             this.beadSelected = true;
             
             
         },
         
         pasteImg: function(x, y){
             
                 var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var imgArray = this.imgArray;
                  
                  var beadId = this.selectedBeadId;
                  var selectedArray = this.selectedArray;
                  
                var canvasBead = selectedArray.find(bead => bead.id === beadId);
             
             let number = Date.now() + Math.random().toString().slice(18);
             
                
                var img = new Image();
                    img.src = canvasBead.src;
                    img.height = canvasBead.height;
                    img.width = canvasBead.width;
                    img.isDragging = false;
                    img.imgX = x - 55;
                    img.imgY = y - 55;
                    img.id = canvasBead.id;
                    img.canvasId = number;
             
              imgArray.push(img);
                 ctx.drawImage(img, img.imgX, img.imgY, img.width, img.height);
             
                  
                  
                     this.selectedBeadId = '';
                    
           
         },
         
         drawBead: function(obj){
             
             var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             var imgArray = this.imgArray;
             var selectedArray = this.selectedArray;
             
                this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
             
            this.mouseX = this.mouse.current.x - offsetX;
            this.mouseY = this.mouse.current.y - offsetY;
             
             var canvasBead = selectedArray.find(bead => bead.id === obj);
             
                var img = new Image();
             
                img.src = canvasBead.image;
                img.width = 110;
                img.height = 110;
                img.isDragging = false;
                img.isSelected = false;
                img.imgX = 0;
                img.imgY = i * 80;
                img.id = canvasBead.id;
                imgArray.push(img);
             
                img.onload = function(){
                    ctx.drawImage(img)
                    
                }
   
             
         },
         
         
         generateId: function(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;

         },
            
        saveBeadPositions: function(){
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var imgArray = this.imgArray;
            
            
                this.$store.commit('setLocalBeads', {localBeads: imgArray});
            
                
            },
         
         restoreBeadPositions: function(){
            var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             
              
         },
         
         
            print: function(){
     
                var canvas = document.getElementById('canvas');
                var dataURL = canvas.toDataURL();
                this.$emit('save', dataURL);
                
                this.designSaved = true;
                
           },
   
         
            setCanvasBeads: function(){
                
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var canvasWidth = 800;
                var canvasHeight = 600;
                var imgArray = this.imgArray;
                var localBeads = this.localBeads;
              
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
                img.id = bead.id;
                imgArray.push(img);
         
            
                });
        
                if (imgArray.length === this.selectedBeads.length){
                imgArray.forEach((el) =>{
             
                el.onload = function(){
                    
                 
                ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                    
                }
                })
  
            }
                
                if(localBeads.length){
                    
                    this.drawLocalBeads();
                }
            
                
        },
         
            
            drawLocalBeads: function(){
                
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var rect = c.getBoundingClientRect();
                var imgArray = this.imgArray;
                var canvasWidth = 800;
                var canvasHeight = 600;
                
                var localBeads = this.localBeads;
                var selectedArray = this.selectedArray;
                
                
                if(localBeads.length){
                 
                    ctx.clearRect(0,0, canvasWidth, canvasHeight);
                        if(this.necklace === true){
                            this.drawNecklaceTemplate();
                        }
                    
                    localBeads.forEach((bead) => {
                        
                        imgArray.push(bead);
                    })
                    
                    if(imgArray.length){
                        
                        imgArray.forEach((el) => {
                            
                            ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height); 
                            
                        })
                    }
                        

                        
                    }
                    
                
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
                  var radius = 140;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '15'){
                 var radius = 150;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '16'){
                 var radius = 160;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '17'){
                 var radius = 170;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '18'){
                 var radius = 180;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                if(this.braceletLength === '19'){
                 var radius = 190;
                    var canvasWidth = 800;
                    var canvasHeight = 600;
                    var centerX = canvasWidth / 2;
                    var centerY = canvasHeight / 2;
                    
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                }
                
                
                ctx.stroke();


            },
        
            

         
            resetBeads: function(){
             
                var c = this.$refs.canvas;
                var ctx = c.getContext('2d');
              var rect = c.getBoundingClientRect();
                var offsetX = rect.left;
                var offsetY = rect.top;
                 var canvasWidth = 800;
                var canvasHeight = 600;
                
                 this.mouse.current = {
                 x: event.clientX,
                y: event.clientY
                }
                
                 ctx.clearRect(0,0, canvasWidth, canvasHeight);
                this.imgArray
            
                    
                },
         
         
          handleMouseDown: function (event) {
           
                var c = this.$refs.canvas;
              var ctx = c.getContext('2d');
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
            if(this.selectedBeadId){
                
                var x = this.startX;
                var y = this.startY;
                
                this.pasteImg(x, y);
            }
             
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

    .canvas-component {
    display: grid;
    justify-content: center;

    }
    
    .canvas-component-container{

    

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
   
    .canvas-buttons {

    margin-top: 5px;
    }

</style>