<template>
  <div class="bead-selector">
<h2>Bracelet Length</h2>
      {{ braceletLength }}
      
      
  </div>
</template>

<script>
export default {
  name: 'BeadSelector',
    props: ['braceletLength'],
  data () {
    return {
      

    }
  }
    
}
</script>

<style>
    
.bead-selector {
    display: grid;
    align-content: flex-start;
        justify-content: center;
    grid-gap: 30px;
   margin-left: 100px;
    margin-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
    
    }
    
.bead-selector h2 {
    text-align: center;
    }

</style>