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
justify-content: center;
height: 103px;
  margin-bottom: 34px;


}
    
    .header-container {
    display: grid;
    grid-template-areas: "title buttons";
        grid-gap: 10px;
    align-content: center;
    width: 1050px;
  border: 1px solid #444;
        padding: 0px;

   
    }
    
    .title {
    grid-area: title;
    display: grid;
  
    justify-content: flex-start;
    align-content: center;
        width: 500px;
    }
    
    .header h1 {
    font-family: 'Pacifico';
    font-size: 58px;
line-height: 64px;
    font-weight: 400;
color: #262626;
margin: 0;
    }
    
    .buttons-buttons {
    grid-area: buttons;
    display: grid;
   grid-gap: 20px;
      justify-content: flex-end;
      align-content: center;
        padding: 0;
  
    }
    
    
/* header media queries */
    
    
    @media screen and (max-width: 1200px){
    
        .header {
grid-area: header;
display: grid;
align-content: center;
width: 100vw;
background-color: #F4F4F4;
height: 92px;
justify-content: center;




}
    
    .header-container {
    display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 50px;
    align-content: center;
    width: 900px;
   
    }
    
    .header h1 {
    font-family: 'Pacifico';
    font-size: 48px;
line-height: 53px;
    font-weight: 400;
color: #262626;
margin: 0;
    }

}

    
    .buttons-container {
    display: grid;
        margin-right: 20px;
        margin-top: 20px;
        align-content: center;
        justify-content: flex-end;
     
    }
    
    .home-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;
    
    grid-gap: 30px;
  
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 700px;

    
    }
    
    .buttons-container-title {
display: grid;
  justify-content: center;

       margin-bottom: 30px;
        padding: 30px;
    padding-top: 20px;
        padding-bottom: 20px;

    }


    .home-container h2 {
    text-align: center;
    }
    
    .start {
    display: grid;
    justify-content: center;
    padding: 10px;
    }

</style>