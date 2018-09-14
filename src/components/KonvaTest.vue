<template>
<div class="konva-test">
    
   <div class="konva-container" v-if="showStage">
            
            <v-stage ref="stage" :config="configKonva"  @dragstart="handleDragstart"
      @dragend="handleDragend">
               
                <v-layer ref="layer">
                    
            <v-image v-for="bead in konvaBeads" :key="bead._id" :config="beadConfig" @dragstart>
                    
                    </v-image> 
                 
                </v-layer>
                
            </v-stage>
     
    </div>
   
     
    </div>
  

</template>
<script>
export default {
data(){
    return {
        showStage: false,
        bgImage: new Image(),
        configKonva: {
            width: 700,
            height: 500
        }
    }
},
    
name: 'KonvaTest',



    computed: {
        
        beads(){
            return this.$store.state.beads;
        },
        
        konvaBeads: function(){
            return this.beads.filter(bead => bead.stone === 'Opalite' );
        },
        
        configImg: function(){
            return {
                x: 0,
                y: 0,
                image: this.bgImage,
                width: 600,
                height: 500,
                draggable: true
            }
        },

        beadConfig: function(){
            return {
                x: 0,
                y: 0,
                image: this.bead.image,
                draggable: true,
                width: 100,
                height: 100
            }
        }
        
    },
    
    methods: {
        
        loadBeads(konvaBeads){
            var konvaBeads = this.konvaBeads;
            
        }
        
    },
    
    mounted(){
        this.bgImage.src = 'http://localhost:8080/static/mock-template-edit.png';
        this.showStage = true;
        
        
        

     
    },
    
   
    }
    


</script>
<style>

    .konva-test {
    display: grid;
    justify-content: center;
    }
    
    .konva-container {
    display: grid;
    border: 1px solid red;
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