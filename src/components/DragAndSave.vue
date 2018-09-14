<template>
<div class="drag-and-save">

    
           <div v-for="img in opalBeadsImgs">
         
               <img :src="img" height="100" width="100"/>
         
         </div>
       
        <canvas id="canvas" ref="canvas" ondrop="drop($event)" ondragover="allowDrop($event)" width="500" height="500" style="border: 1px solid gray"  />
    
    
</div>
</template>
<script>
    
export default {
name: 'DragAndSave',
data(){
    return {
        
    }
},
    
      computed: {
        
        beads(){
            return this.$store.state.beads;
        },
        
        
        opalBeadsImgs(){
            return this.$store.getters.opalBeadsImgs;
        }

    },
    
    methods: {
        
        allowDrop: function(e){
            e.preventDefault();
        },

        drag: function(e){
            //store the position of the mouse relativly to the image position
            e.dataTransfer.setData("mouse_position_x",e.clientX - e.target.offsetLeft );
            e.dataTransfer.setData("mouse_position_y",e.clientY - e.target.offsetTop  );

            e.dataTransfer.setData("image_id",e.target.id);
        },

        drop: function(e){
            
            e.preventDefault();
            var image = document.getElementById( e.dataTransfer.getData("image_id") );

            var mouse_position_x = e.dataTransfer.getData("mouse_position_x");
            var mouse_position_y = e.dataTransfer.getData("mouse_position_y");

            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');

            // the image is drawn on the canvas at the position of the mouse when we lifted the mouse button
            ctx.drawImage( image , e.clientX - canvas.offsetLeft - mouse_position_x , e.clientY - canvas.offsetTop - mouse_position_y );
        },

        convertCanvasToImage: function() {
            var canvas = document.getElementById('canvas');

            var image_src = canvas.toDataURL("image/png");
            window.open(image_src);

        }
    }
}

</script>