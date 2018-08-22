<template>

    
    <v-image ref="image" :config="configImage" @dragmove="dragmove" @dragstart="dragstart" @dragend="dragend"></v-image>

</template>
<script>
export default {
name: 'Bead',
props: ['opalbead'],
    data() {
        return {
            imageObj: new Image()
        }
    },
    
    computed: {
        
        
        opalBeads(){
            return this.$store.getters.opalBeads;
        },
        
        configImage() {
            
            return {
            name: this.bead._id,
            draggable: true,
            x: stage.getWidth() / 2 - 100 / 2,
            y: stage.getHeight() / 2 - 100 / 2,
            width: 100,
            height: 100,
            image: this.bead.image;
            }
        }
    },
    
    mounted: function(){
        
    }
}



</script>
<style>

</style>