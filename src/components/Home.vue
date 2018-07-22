<template>
  <div class="home">
         <div class="header">
          <div class="header-container">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              </div>
      </div>
      <div class="home-container">
<h2>Create Your Own Design</h2>
      <div class="start">
          <router-link to="/create" tag="button" class="btn">get started</router-link>
          </div>
          
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
 
    }
 
    
    },
    
    computed: {
        beads(){
            return this.$store.state.beads;
        }
    }
}
</script>

<style>
    
    .bead-img {
    width: 100px;
    object-fit: cover;
    }
    
.home {
display: grid;
width: 100vw;
align-content: flex-start;
grid-template-areas:
                    "header header"
                    "content content";
min-height: 100vh;
min-width: 100vw;
margin: 0;
padding: 0;
    }
    
    .header {
grid-area: header;
display: grid;
align-content: center;
width: 100vw;
background-color: #F4F4F4;
min-height: 80px;

padding-left: 100px;
margin-bottom: 20px;
justify-content: flex-start;

}
    
    .header-container {
    display: grid;
    align-content: center;
    max-width: 1050px;
   
    }
    
    .header h1 {
    font-family: 'Pacifico';
    font-size: 45px;
line-height: 54px;
    font-weight: 400;
color: #262626;
margin: 0;
    }
    
    .home-container {
    grid-area: content;
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