<template>
<div class="zoomer-component">
    
    <img :src="bead.img" alt="" class="plus">
    
    <div class="img normal" :background-image:url="imgNornal"></div>
    
    <div class="img zoom" :style="imgZoom"></div>
    
    
    
    </div>

</template>
<script>
export default {
name: 'ZoomerComponent',
    
     props: ['imgNornal', 'imgZoom', 'bead'],
    
    methods: {
    moveBG: function (ev) {     
      
      var container = this.$el,
          imgZoom = container.childNodes[4]; // MEMO: Yes, I can select this better
      
      
      var e = {
        w: imgZoom.offsetWidth,
        h: imgZoom.offsetHeight
      };     

      var c = {
        x: Math.round((ev.clientX - (container.offsetLeft - window.scrollX)) / (e.w / 100)),
        y: Math.round((ev.clientY - (container.offsetTop - window.scrollY)) / (e.h / 100))
      };
      
      imgZoom.style.backgroundPosition = c.x + '% ' + c.y + '%';
    }
  }
}

</script>
<style>
.zoomer {
  position: relative;
  width: 640px;
  height: 640px;
  border: 0;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  //box-shadow: 0px 5px 10px #000;
   
  transition: all .5s ease-out;
  
  &:hover {
    // border-radius: 50%;
    cursor: move;
    .normal {
      opacity: 0;
      transform: scale(1.1);
    }
    .plus {
      opacity: 0;
      transform: scale(.8);
    }
  }
}

.img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: white;
  transition: all ease-out .3s;
}

.normal {
  z-index: 20;
  background-size: contain;
}

img.normal {
  opacity: 0;
  width: 100%;
}

.zoom {
  z-index: 10;
  transition: none;
}

.plus {
  position: absolute;
  transition: all ease-out .4s;
  width: 60px;
  height: 60px;
  z-index: 30;
  left: calc(50% - 30px);
  top: calc(50% - 30px);
}

</style>