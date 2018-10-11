<template>
  <div id="app">
     
      <div class="banner"><div class="banner-container"><p>self-care through creativity</p></div></div>
      
          <div class="header">
          <div class="header-container">
              
              <div class="title">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              </div>
              
               <div class="buttons-buttons">
            <span>
          <span v-show="notHome">
      <button class="create-btn" @click="deleteLocalStorage">start over</button>
          <button class="create-btn" @click="saveForLater">save for later</button>
          </span>
                   
            <span v-if="savedSessions.length"><button class="create-btn" @click="goToDesigns">my designs</button></span>
                
                   </span>
          </div>
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
    
data(){
    
    return {}

},
  name: 'App',
    
    computed: {
 
        
        notHome(){
    
            return this.$store.state.route.name !== 'Home' && this.$store.state.route.name !== 'Designs'
  
        },
        
  
        savedSessions(){
            
            return this.$store.state.savedSessions;
        }
    },
    
    
    methods: {
        
     
        
         deleteLocalStorage: function(){
            this.$store.commit('deleteLocalBeads');
            this.$session.destroy();
            if(!this.$session.exists()){
   
                     this.$router.push('/');
                }
  
        },
        
         saveForLater: function(){
        
            let session = {}
             
             session.id = this.$session.id();
             session.data = this.$session.getAll();
             session.necklace = this.$session.get('sessionNecklace');
             session.bracelet = this.$session.get('sessionBracelet');
             session.selectedType = this.$session.get('sessionType');
             session.necklaceLength = this.$session.get('sessionNecklaceLength');
             session.braceletLength = this.$session.get('sessionBraceletLength');
             session.braceletSize = this.$session.get('sessionBraceletSize');
             session.selectedMaterial = this.$session.get('sessionMaterial');
             session.selectedBeads = this.$session.get('sessionSelected');
             session.templateBeads = this.$session.get('sessionTemplate');
             session.localBeads = this.$session.get('sessionLocal');
             session.dataURL = this.$session.get('sessionDataURL');
             
            
            this.$store.commit('saveSession', {session: session});
           this.$session.destroy();
             this.$store.commit('deleteLocalBeads');
             this.$router.push('/');
            
        },
        
        goToDesigns: function(){
            
            
            this.$router.push({ name: 'Designs'});
        }
    }
}
</script>

<style>
#app {
display: grid;
align-content: flex-start;
grid-template-areas:
                    "banner banner"
                    "header header"
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
justify-content: center;
margin: 0;
width: 100vw;
background-color: #333;
height: 50px;
}
    
    .banner-container {
    display: grid;
    align-content: center;
    justify-content: flex-start;
margin: 0;
padding: 0;
    width: 1060px;
    }
    
    .banner p {
      font-family: 'Karla';
color: #fff;
font-size: 18px;
line-height: 25px;
        padding-bottom: 2px;
        padding-right: 0px;
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
    width: 1060px;

        padding-bottom: 2px;

   
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
    
       .create-btn {
border: 1px solid #000;
background-color: #000;
padding: 10px 14px;
text-align: center;
font-family: 'Karla';
font-size: 18px;
line-height: 18px;
text-transform: uppercase;
color: #d9d9d9;
font-weight: 400;
cursor: pointer;
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
