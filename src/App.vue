<template>
  <div id="app">
      
    <div class="banner">
      <p>self-care through creativity</p>
      </div>
      
      <div class="header">
          <div class="header-container">
      <h1>Sano Designs</h1>
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
grid-template-areas: "banner banner"
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
min-height: 100px;

padding-left: 100px;
margin-bottom: 20px;
justify-content: flex-start;

}
    
    .header-container {
    display: grid;
    align-content: center;
    max-width: 1050px;
    border: 1px solid #ddd;
    }
    
    .header h1 {
    font-family: 'Pacifico';
    font-size: 58px;
line-height: 64px;
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
