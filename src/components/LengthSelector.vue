<template>
  <div class="length-selector">
<h2>Select Length</h2>
      {{ type }}
      <div v-if="necklace === true">
      
      <p>You chose necklace.</p>
      </div>
      
      <div v-if="bracelet === true">
          <p>You chose bracelet.</p>
      
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'LengthSelector',
    props: ['type'],
  data () {
    return {
        selectedLength: ''

    }
  },
    
    computed: {
        necklace(){
            this.type = 'necklace';
        },
        
        bracelet(){
            this.type = 'bracelet';
        }
    }
}
</script>

<style>
    
.length-selector {
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
    
.length-selector h2 {
    text-align: center;
    }

</style>