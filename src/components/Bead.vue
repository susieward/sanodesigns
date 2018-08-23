<template>

    
    <v-image ref="image" :config="configImage" @dragmove="dragmove" @dragstart="dragstart" @dragend="dragend"></v-image>

  
</template>
<script>
export default {
name: 'Bead',
props: ['bead'],
    data() {
        return {
            imageObj: new Image()
        }
    },
    
    computed: {
        
        configImage() {
            
            return {
            name: this.bead._id,
            draggable: true,
            x: stage.getWidth() / 2 - 100 / 2,
            y: stage.getHeight() / 2 - 100 / 2,
            width: 100,
            height: 100,
            image: this.bead.image
        }
        }
    },
    

    
    mounted: function(){
        
        this.imageObj.src = this.bead.image;
        
        if (this.bead.isDragging) {
            this.$refs.image.getStage().startDrag();
        }
    },
    
    methods: {
        
        dragstart: function(targetGroup){
             this.$store.commit('START_MOVE', {
        beadId: this.bead._id
            });
        },
        
        dragend: function(playerGroup){
       
            if (this.$refs.image === undefined) {
                return;
            }
      
            this.$store.commit('STOP_MOVE', {
            beadId: this.bead._id
                });
        },
        
        dragmove: function(element, evt) {
            
            let parent = element.getStage().parent;
            this.$store.commit('MOVE', {
                beadId: this.bead._id,
                position: {
                x: element.getStage().getAbsolutePosition().x,
                y: element.getStage().getAbsolutePosition().y
                }   
            });
            }
        }
        
    }




</script>
<style>

</style>