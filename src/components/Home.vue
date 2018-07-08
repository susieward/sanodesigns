<template>
  <div class="home">
      <div class="home-container">
<h2>Create Your Own Design</h2>
      <div class="start">
          <router-link to="/create" tag="button" class="btn">get started</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  }
}
</script>

<style>
    
    .home {
    display: grid;
    width: 100vw;
    }
    
    .home-container {
    display: grid;
    align-content: flex-start;
    grid-gap: 30px;
   margin-left: 100px;
    margin-right: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;
    border: 1px solid #ddd;
    }
    
    .home-container h2 {
    text-align: center;
    }
    
    .start {
    display: grid;
    justify-content: center;
    padding: 10px;
        border: 1px solid #ddd;
    }

</style>