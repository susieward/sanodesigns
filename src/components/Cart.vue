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
        <h2 style="text-align: center; margin-bottom: 15px;">Cart</h2>
    
        <div class="design-and-beads">
        
       <div class="design-img-container">
        <img :src="dataURL" class="design-img" @click="backToCanvas"/>
        </div>
            
            
              <div class="cart-beads">
          <h3>Beads:</h3> 
            <div v-for="bead in selectedBeads">
            
                <span>{{ bead.stone }} ({{ formatBeadSize(bead.size) }})</span> <span style="float: right">{{ formatPrice(bead.price) | usdollar }}</span>
            
            </div>
              <p>Total: {{ formatPrice(totalBeadsPrice) | usdollar }}</p>
        
        </div>
            
         
            
        </div>
        
 
        <div class="cart-details">
        
      
        
           <div class="cart-notes">
         <h3 style="margin-bottom: 0">Notes:</h3>
            
                <p style="margin-bottom: 0">Anything else you'd like to add about your design.</p>
                <p style="color: #a4a4a4; margin-top: 5px">(optional)</p>
            <textarea v-model="notes" class="notes-textarea"></textarea>
        </div>
        
        
        
        </div>

            <div class="totals-container">
            <div class="cart-totals">
            
            <span class="total-text">Beads total:</span> <span>{{ formatPrice(totalBeadsPrice) | usdollar }}</span>

                <span class="total-text" v-if="necklace === true">{{ formatLength(necklaceLength) }} length x {{ formatMaterialPrice(selectedMaterial.price) | usdollar }} ({{ selectedMaterial.type }}, {{ selectedMaterial.color }}): </span><span class="total-text" v-if="bracelet === true">{{ formatLength(braceletLength) }} length <span class="multiply">x</span> {{ formatMaterialPrice(selectedMaterial.price) | usdollar }} : </span> <span class="total-price">{{ formatPrice(totalMaterialPrice) | usdollar }} </span>
             
             
            <span class="total-text">Flat labor fee:</span> <span class="total-price">{{ formatPrice(laborFee) | usdollar }}</span>
            
        
        
        
        </div>
        
        <div class="main-total">
        
            <span class="main-total-text">Total:</span> <span class="main-total-price">{{ formatPrice(totalPrice) | usdollar }}</span>
        
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

props: ['necklaceLength', 'braceletLength', 'selectedBeads', 'selectedMaterial', 'necklace', 'bracelet', 'dataURL'],
    
components: {
    Checkout
},
    
    computed: {
        
          localBeads(){
            return this.$store.state.localBeads;
        },
        
        totalBeadsPrice() {
        
        return Object.values(this.selectedBeads)
        .reduce((acc, el) => acc + el.price, 0);
    
        },
        
        beadQuantity(){
            
        },
        
        laborFee(){
            return 12.00
        },
        
        totalMaterialPrice: function(selectedMaterial, selectedLength){
            if (this.necklace === true){
            return this.selectedMaterial.price * this.necklaceLength;
            }
            
            if (this.bracelet === true){
            return this.selectedMaterial.price * this.braceletLength;
            }
        },
        
        totalPrice: function(totalBeadsPrice, totalMaterialPrice, laborFee){
            return this.totalBeadsPrice + this.totalMaterialPrice + this.laborFee;
            
        }
    },
    
    methods: {
            formatPrice: function(value){
            return value.toFixed(2);
        },
        
          formatLength: function(value){
            return value + '' + ' cm'
        },
        
              formatBeadSize: function(value){
            return value + '' + ' mm'
        },
        
         formatMaterialPrice: function(value){
            return value.toFixed(2) + '' + ' per cm'
        },
        
        backToCanvas: function(){
            this.$router.push({ name: 'necklace', params: {necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, selectedBeads: this.selectedBeads, necklace: this.necklace, bracelet: this.bracelet}});
            
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
    
.cart-container {
grid-area: content;
display: grid;
width: 1050px;
    padding: 30px;
        margin-right: auto;
        margin-left: auto;
}
    
     .cart-beads {
    padding: 30px;
     background-color: #f4f4f4;
   
         min-height: 300px;
    
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
 
    height: 300px;
  width: 450px;
    align-content: flex-start;
    padding-top: 20px;
   
    

    }
    
    .cart-notes p {
    padding-top: 0;
      
    }
    
     .notes-textarea {
        font-family: 'Karla';
         font-weight: 300;
    font-size: 16px;
    padding: 10px 12px;
    min-height: 150px;
    border: 1px solid #ddd;
         border-radius: 0;
    margin: 0;
  
    }

    .cart-details {
    display: grid;
        grid-template-columns: 1fr 1fr;
  margin-top: 30px;
    margin-bottom: 30px;
    }
    
    .necklace-dtails-container {
            display: grid;
 
    height: 300px;
  width: 450px;
    align-content: flex-start;
    padding-top: 20px;
        padding: 30px;
    
    }
    
     .necklace-dtails {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(3, 1fr);
    justify-content: flex-start;
        align-content: center;

    
    
    
    }
    
    .necklace-dtail-text {
    margin-right: 30px;
    font-size: 16px;
        margin-bottom: 5px;
        line-height: 24px;
    }
    
    .totals-container {
        display: grid;
      
        max-width: 600px;
        margin: auto;
    padding: 30px;
  
        margin-bottom: 30px;
        align-content: center;
    }
    
    .cart-totals {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(3, 1fr);
    max-width: 600px;
    
        align-content: center;
        justify-content: center;
        
    
    
    
    }
    
    .total-text {
    margin-right: 40px;
    font-size: 16px;
        margin-bottom: 10px;
    
        line-height: 24px;
    }
    
    .total-price {
       font-size: 16px;
        margin-bottom: 10px;
        line-height: 24px; 
    }
    
    .main-total {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;
    max-width: 600px;
    margin-top: 20px;
justify-content: center;
 
        

    }
    
    .main-total-text {
    margin-right: 30px;
    font-family: 'Playfair Display';
font-weight: 400;
font-size: 24px;
line-height: 30px;
    }
    
    .main-total-price {
    font-size: 24px;
    line-height: 34px;

    }
    
    .multiply {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
    line-height: 24px;
    }
 
    .design-and-beads {
    display: grid;
    grid-template-columns: 1fr 1fr;
           grid-gap: 40px;
        margin-top: 30px;
    }
    
    .design-img-container {

        height: 350px;
        width: auto;
        
    }
    
    .design-img {
                padding: 10px;
    height: 100%;
        width: 100%;
        border: 1px solid #eee;
        object-fit: scale-down;
    }
    
    .bead-prices-cart {
        display: grid;
  justify-content: center;
        align-content: center;
        grid-template-columns: auto auto;

   width: 300px;
        border: 1px solid #ddd;
            margin: auto;
    }
    
   

</style>