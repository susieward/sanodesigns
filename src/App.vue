<template>
  <div id="app">
     
      
      <div class="header">
          <div class="header-container">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              </div>
      </div>
      
      <div class="content">
      <router-view></router-view>
      </div>
      
      <div class="footer">
      
      
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
display: grid;
align-content: flex-start;
grid-template-areas:
                    "header header"
                    "content content"
                    "footer footer";
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

.banner {
grid-area: banner;
 display: grid;
align-content: center;
justify-content: flex-start;
margin: 0;
width: 100vw;
background-color: #333;
height: 50px;
padding-left: 100px;
}
    
    .banner p {
      font-family: 'Karla';
color: #fff;
font-size: 18px;
line-height: 25px;
        padding-bottom: 2px;
        padding-right: 0px;
    }
    
.content {
grid-area: content;
}
    
    .footer {
    grid-area: footer;
    }
    

    
 
</style>
