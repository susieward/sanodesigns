<template>
  <div id="app">
     
      <div class="banner"><p>self-care through creativity</p></div>
      
           
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
                    "banner banner"
                    "content content"
                    "footer footer";
min-height: 100vh;
min-width: 100vw;
margin: 0;
padding: 0;
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
    width: 100vw;
    height: 300px;
    background-color: #333333;
    margin-top: 200px;
    }
    

    
 
</style>
