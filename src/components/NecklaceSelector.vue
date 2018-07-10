<template>
  <div class="necklace-selector">
      
<h2>Select {{ selectedType }} Beads</h2>
      Length: {{ necklaceLength }}
      
      
  </div>
</template>

<script>
export default {
  name: 'necklace',
    props: ['necklaceLength', 'selectedType'],
  data () {
    return {
      

    }
  }
    
}
</script>

<style>
    
.necklace-selector {
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
    
.necklace-selector  h2 {
    text-align: center;
    }

</style>