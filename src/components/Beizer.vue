<template>
<div class="beizer">
    <div class="ropeContainer">
      <svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
          
    <ellipse cx="50" cy="50" rx="50" ry="50" fill="none" stroke="blue"/>
    </svg>
    </div>
</div>
</template>
<script>
export default {
data(){
    return {
         p1: {
      x:60,
      y: 195
    },
    p2: {
      x:570,
      y:195
    },
    c1: {
      x:290,
      y:-150
    },
    c2:{
      x:290,
      y:550
    }
    }
},
name: 'Beizer',
    
    
     computed: {
    path() {
      return `M${this.p1.x},${this.p1.y} C${this.c1.x},${this.c1.y} ${this.c2.x},${this.c2.y} ${this.p2.x},${this.p2.y}`;
    }
  }
}


</script>
<style>
    
.ropeContainer {
  color: #d6bb42;
  font-family: sans-serif;
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

svg {
  width: 100%;
}

</style>