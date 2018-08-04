<template>
<div class="cart">
       <div class="header">
          <div class="header-container">
              <router-link to="/"><h1>Sano Designs</h1></router-link>
              
               <div class="buttons-buttons">
          <span>
      <router-link to="/" tag="button" class="create-btn">start over</router-link>
          <button class="create-btn">save for later</button>
          </span>
          </div>
              </div>
      </div>
    
    
    <div class="cart-container">
        <h2 style="text-align: center">Cart</h2>
    
    <p>Length: {{ necklaceLength }}</p>    
        
        <div class="cart-details">
        
    <div class="cart-beads">
        
        <h3>Beads:</h3>
        <div v-for="bead in selectedBeads" class="cart-bead">
            
            <div class="bead-container-selector">
        <img class="bead-img-small-selector" :src="bead.image"/>
            </div>
            <div class="bead-cart-details">
            <p>
                {{ formatPrice(bead.price) | usdollar }} x 3</p>
            </div>
        
        </div>
        </div>
        
        <div class="cart-notes">
         <h3 style="margin-bottom: 0">Notes:</h3>
            
                <p style="margin-bottom: 0">Anything else you'd like to add about your design.</p>
                <p style="color: #a4a4a4; margin-top: 5px">(optional)</p>
            <textarea v-model="notes" class="notes-textarea"></textarea>
        </div>
        
        
        
    
        </div>
    
    <checkout></checkout>
        
    </div>
    </div>



</template>
<script>
import Checkout from './Checkout.vue'
export default {
data(){
    return {
        notes: ''
    }
},
name: 'Cart',

props: ['necklaceLength', 'selectedBeads'],
    
components: {
    Checkout
},
    
    methods: {
            formatPrice: function(value){
            return value.toFixed(2);
        }
    },
    
    filters: {
        usdollar: function(value) {
      return `$${value}`;
    }
    }

}




</script>
<style>

.cart {
display: grid;

grid-template-areas:
                    "header header"
                    "content content";
min-height: 100vh;
min-width: 100vw;
    align-content: flex-start;
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


}
    
    .header-container {
    display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 500px;
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

    
.cart-container {
grid-area: content;
display: grid;
border: 1px solid #ddd;
width: 975px;
    padding: 30px;

        margin-right: auto;
        margin-left: auto;
}
    
     .cart-beads {
    padding: 20px;
 
    }
    
          .bead-img-small-selector {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
    }
    
    .bead-container-selector {
        width: 120px;
       height: 120px;
    
  border-radius: 50%;
    }
    
    .cart-bead {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #ddd;
    grid-gap: 0;
    padding: 5px;
    }
    
    .cart-notes{
      display: grid;
 
    min-height: 200px;
    align-content: flex-start;
    padding: 20px;
    background-color: #f4f4f4;
    }
    
    .cart-notes p {
    padding-top: 0;
      
    }

    .cart-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    }
    
    .notes-textarea {
        font-family: 'Karla';
         font-weight: 300;
    font-size: 16px;
    padding: 10px 12px;
    min-height: 150px;
    border: 1px solid #777;
    border-radius: 8px;
    }
    
 

</style>