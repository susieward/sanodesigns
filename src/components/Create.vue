<template>
  <div class="create">
      <div class="create-container">
      <h2>Select Jewelry Type</h2>
      
        <div class="select-type">
          <div class="column">
              <p>necklace</p>
            </div>
          
            <div class="column">
                <p>bracelet</p>
            </div>
          
          
          </div>
      
      
      </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {

    }
  }
}
</script>

<style>
  
    
      .create {
    display: grid;
    width: 100vw;
    }
    
    .create-container {
    display: grid;
    align-content: flex-start;
        justify-content: center;
    grid-gap: 30px;
   margin-left: 100px;
    margin-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
    border: 1px solid #ddd;
    }
    
    .create-container h2 {
    text-align: center;
    }
    
    .select-type {
    display: grid;
        justify-content: center;
    grid-template-columns: auto auto;
    max-width: 700px;
    grid-gap: 10px;
    border: 1px solid #ddd;
    }
    
    .column {
    width: 350px;
    height: 350px;
    background-color: #f4f4f4;
    text-align: center;
    }

</style>