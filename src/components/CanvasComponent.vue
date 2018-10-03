<template>
<div class="canvas-component">
    <div class="canvas-component-container">

      <span v-for="img in selectedArray">
       
        <img :src="img.src" :height="img.height" :width="img.width" class="selectedArrayBead" :id="img.id" @click="copyImg(img)">
        </span>

        <div class="canvas-container" id="canvas-container">
    <canvas id="canvas" ref="canvas"  @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)" @mousemove="handleMouseMove($event)" @mouseout="handleMouseOut($event)" style="border: 1px solid #ddd" width="800" height="600"></canvas>
            
            <canvas id="testCanvas" ref="testCanvas" width="800" height="600" style="display: none; border: 1px solid red"></canvas>
        </div>
    <br>
   <div class="canvas-buttons">
       <button class="btn-small-gray" style="width: 100px" @click="resetBeads">reset</button></div>
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
var Matrix = require("transformation-matrix-js").Matrix;
var m = new Matrix();
    
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
        originX: 0,
        originY: 0,
        designSaved: false,
        drawn: false,
        localBeads: [],
        selectedBeadId: '',
        selectedArray: [],
        beadSelected: false,
        dragBeadX: 0,
        dragBeadY: 0,
        isTransparent: false,
        pixelData: 0,
        imgData: '',
        angleInDegrees: 0,
        templateBeads: []
        
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
         
             
             
    
              
 
              

        
          
              
    },
    
     methods: {
         
         loadSelectedArray: function(){
             
             var selectedArray = this.selectedArray
             var localBeads = this.localBeads;
             
             
               this.selectedBeads.forEach((bead, i) =>{
                var img = new Image();
                
                bead = this.selectedBeads[i];
              
            
                img.src = bead.image;
                img.width = 120;
                img.height = 120;
                img.id = bead._id;
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
         
            
            
            drawLocalBeads: function(){
                
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var rect = c.getBoundingClientRect();
                var imgArray = this.imgArray;
                var canvasWidth = 800;
                var canvasHeight = 600;
                
                var localBeads = this.localBeads;
                
                
                
                if(localBeads.length){
                 
                    ctx.clearRect(0,0, canvasWidth, canvasHeight);
                        if(this.necklace === true){
                            this.drawNecklaceTemplate();
                        }
                    
                    localBeads.forEach((bead) => {
                    
                      
                        
                         imgArray.push(bead);
               
                        });
                      
                    
                    if(imgArray.length){
                        
    /* if a bead has an id that doesn't appear in the selectedArray of beads, each occurrence of that bead is deleted from the image array */
                        
    /* beads whose ids appear in the selectedArray's ids are drawn */
                 imgArray.forEach((el) => {
                        
                    if(el.isRotated){
                        ctx.save();
                        m.translate(el.imgX + el.width/2, el.imgY + el.height/2);
                        m.rotate(el.rotationAngle);
                        m.translate(-el.width/2, -el.height/2);
                        m.translate(-el.imgX, -el.imgY);
                        m.applyToContext(ctx);
                        ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                        m.reset();
                        ctx.restore();
                        return;
                        
                    }
                         
                           ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                          });
       
   
                 
                    }
          
                }
                
            },
         
         copyImg: function(img){
            
             this.selectedBeadId = img.id;
             this.beadSelected = true;
             this.$emit('copied');
             
             
         },
         
         pasteImg: function(x, y){
             
                 var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var imgArray = this.imgArray;
                  
                  var beadId = this.selectedBeadId;
                  var selectedArray = this.selectedArray;
                  
                var canvasBead = selectedArray.find(bead => bead.id === beadId);
             
             let number = Date.now() + Math.random().toString().slice(18);
             
             var centeredX = x - 60;
             var centeredY = y - 60;
             
             var roundedX = (0.5 + centeredX) << 0;
             var roundedY = (0.5 + centeredY) << 0;
             
             
                
                var img = new Image();
                    img.src = canvasBead.src;
                    img.height = 120;
                    img.width = 120;
                    img.isDragging = false;
                    img.imgX = roundedX;
                    img.imgY = roundedY;
                    img.id = canvasBead.id;
                    img.canvasId = number;
                    img.rotationAngle = null;
                    img.rotationAmount = 0;
                    img.imgRX = 0;
                    img.imgRY = 0;
                    img.isRotated = false;
                    img.hasBorder = false;
             
              imgArray.push(img);
                 ctx.drawImage(img, img.imgX, img.imgY, img.width, img.height);
             this.templateBeads.push(img);
            
             this.$emit('added', this.selectedBeadId);
                this.selectedBeadId = '';
           
         },
         
         deleteBead: function(){
             
               var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
             var canvasWidth = 800;
                var canvasHeight = 600;
             
             if(!this.selectedBead){
                 
                 return;
             } else {
                
                 var beadId = this.selectedBead.canvasId;
                 var index = imgArray.findIndex(bead => bead.canvasId === beadId);
                
                 imgArray.splice(index, 1);
        
                  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                 
                    if(this.necklace === true){
                     
                     this.drawNecklaceTemplate();
                 }
                 
                 if(this.necklace === false){
                     
                     this.drawBraceletTemplate();
                 }
              
             
                imgArray.forEach((el) => {
                     
                    if(el.isRotated){
                           ctx.save();
                         
                    m.translate(el.imgX + el.width/2, el.imgY + el.height/2);
                     m.rotate(el.rotationAngle);
                     m.translate(-el.width/2, -el.height/2);
                    m.translate(-el.imgX, -el.imgY);
                     m.applyToContext(ctx);
                     
                     ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                     m.reset();
                     ctx.restore();
                     return;
                        
                    }
                     ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                })
                var selectedId = this.selectedBead.id;
                  this.$emit('deletebead', selectedId);
                this.selectedBead = '' 
                
             }
             
         },
         
         drawBeads: function(){
             
               var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
             var canvasWidth = 800;
                var canvasHeight = 600;
             
             var beadId = this.selectedBead.canvasId;
             var selected = imgArray.find(bead => bead.canvasId === beadId);
             
                 ctx.clearRect(0,0, canvasWidth, canvasHeight);
                
                if(this.necklace === true){
                this.drawNecklaceTemplate();
                }
                
                if(this.necklace === false){
                    
                    this.drawBraceletTemplate();
                }
               
            imgArray.forEach((el) => {
     
                
                 if(el.isRotated){
                     
                     
                     ctx.save();
                         
                    m.translate(el.imgX + el.width/2, el.imgY + el.height/2);
                     m.rotate(el.rotationAngle);
                     m.translate(-el.width/2, -el.height/2);
                    m.translate(-el.imgX, -el.imgY);
                     m.applyToContext(ctx);
                     
                     ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
    
                     m.reset();
                     ctx.restore();
                    return;
                     
                        
                    }
                
                       
                if(!el.isRotated){
                    
                    ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                 
                }

            });
         },
         
              drawBorder: function(el){
             
             var c = this.$refs.canvas;
            var ctx = c.getContext("2d");
             var rect = c.getBoundingClientRect();
            var offsetX = rect.left;
            var offsetY = rect.top;
            var imgArray = this.imgArray;
                   var canvasWidth = 800;
                var canvasHeight = 600;
                
                    var beadId = this.selectedBead.canvasId;
                    var selected = imgArray.find(bead => bead.canvasId === beadId);
                      
                
                    
                        if(el === selected){
                     
                      ctx.lineWidth = 1;
                        ctx.strokeStyle = '#ddd';
                        ctx.strokeRect(el.imgX + 1, el.imgY + 1, el.width, el.height);        
                   
                        }
 
               
         },
         
            
        saveBeadPositions: function(){
                var c = this.$refs.canvas;
                var ctx = c.getContext("2d");
                var imgArray = this.imgArray;
            
            
                this.$store.commit('setLocalBeads', {localBeads: imgArray});
            
                
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
                img.width = 120;
                img.height = 120;
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
                ctx.strokeStyle = '#000';
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
              
        
            if(this.selectedBeadId){
                
                var x = this.startX;
                var y = this.startY;
                
                this.pasteImg(x, y);
            }
           
              
            if(this.selectedBead){
                this.selectedBead = '';
                this.drawBeads();
            }
                  
                   imgArray.forEach((el) => {
                    
                  
                   if (this.startX >= el.imgX && this.startX <= el.imgX + el.width && this.startY >= el.imgY && this.startY <= el.imgY + el.height){
                
                    el.isDragging = true;
                    this.selectedBead = el;
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#ddd';
                    ctx.strokeRect(el.imgX + 1, el.imgY + 1, el.width, el.height); 
                    this.$emit('options', this.selectedBead);
                    
                       
          
                  }
                    
                });
                  
              
             
         
          
          },
         
         
         getImageData: function(el){
             
          var testCanvas = this.$refs.testCanvas;
        var ctx = testCanvas.getContext("2d");
             
             ctx.drawImage(el, 0, 0);
             
             var imageData = ctx.getImageData(0, 0, el.width, el.height);
             
             ctx.clearRect(0, 0, el.width, el.height);
             this.imgData = imageData;
             

         
        
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
             
             var abx = canvasWidth - this.mouseX; // + rect.left
                var aby = canvasHeight - this.mouseY; 

             
            if(this.mouse.down && this.selectedBead){
                
          
                var selectedId = this.selectedBead.canvasId;
                
                var selected = imgArray.find(bead => bead.canvasId === selectedId);
                    
                    
                var centeredX = this.mouseX - 60;
                var centeredY = this.mouseY - 60;
                
            var roundedX = (0.5 + centeredX) << 0;
             var roundedY = (0.5 + centeredY) << 0;
                
                ctx.clearRect(0,0, canvasWidth, canvasHeight);
                
                if(this.necklace === true){
                this.drawNecklaceTemplate();
                }
                
                if(this.necklace === false){
                    
                    this.drawBraceletTemplate();
                }
               
            imgArray.forEach((el) => {
                
                if(el.isRotated){
                    
                    if(el === selected && el.isDragging){
                        
                        el.imgX = roundedX;
                        el.imgY = roundedY;
                        
                    }
                    
                    ctx.save();
                         
                    m.translate(el.imgX + el.width/2, el.imgY + el.height/2);
                     m.rotate(el.rotationAngle);
                     m.translate(-el.width/2, -el.height/2);
                    m.translate(-el.imgX, -el.imgY);
                     m.applyToContext(ctx);
                     
                     ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
    
                     m.reset();
                     ctx.restore();
              
                    
                    
                }
                
                if(!el.isRotated){
                    
                    if(el === selected && el.isDragging){
                        
                        el.imgX = roundedX;
                        el.imgY = roundedY;
                    }
                    
                    
                     ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                }
                
               });
          
             
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
             var newRotation;
    
   
             var selectedId = this.selectedBead.canvasId;
             
             var selected = imgArray.find(bead => bead.canvasId === selectedId);
            
           
                var clockwise = selected.rotationAmount += 15;
                 if(selected.rotationAmount >= 360){
                     selected.rotationAmount = 0;
                 }
           
             var angle = clockwise * to_radians;
             
            
            ctx.clearRect(0,0, canvasWidth, canvasHeight);
            this.drawNecklaceTemplate();
             
              imgArray.forEach((el) => {
                if(el !== selected){
                    
                    if(!el.isRotated){
                    ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                    } else {
                        
                        
                           ctx.save();
                         
                    m.translate(el.imgX + el.width/2, el.imgY + el.height/2);
                     m.rotate(el.rotationAngle);
                     m.translate(-el.width/2, -el.height/2);
                    m.translate(-el.imgX, -el.imgY);
                     m.applyToContext(ctx);
                     
                     ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                     m.reset();
                     ctx.restore();
                  
    
                    }
                }
            })
   
            ctx.save();
             
            m.translate(selected.imgX + selected.width/2, selected.imgY + selected.height/2);
             
            m.rotate(angle);
            m.translate(-selected.width/2, -selected.height/2);
             m.translate(-selected.imgX, -selected.imgY);
         
            m.applyToContext(ctx);
             

             imgArray.forEach((el) => {
                
                 if(el === selected){
                     
                     el.rotationAngle = angle;
                     el.rotationAmount = selected.rotationAmount;
                     el.isRotated = true;
                     
                    ctx.drawImage(el, el.imgX, el.imgY, el.width, el.height);
                
                 }
                 
             });
       
 
             
             m.reset();
            ctx.restore();
          
           
            },
         
         getRotatedCoordinates: function(el){
             
         
             
             var xr = el.imgX * Math.cos(el.rotationAngle);
             
             var xy = el.imgY * Math.sin(el.rotationAngle);
            
             
            el.imgRX = xr;
             el.imgRY = xy;
             
            
            
               
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
    
    .selectedArrayBead {
        cursor: default;
  

    }
    
    .selectedArrayBead:hover {
        cursor: pointer;
  
    }

</style>