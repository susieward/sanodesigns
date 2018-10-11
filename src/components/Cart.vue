<template>
<div class="cart">
    
    <div class="cart-container">

        <h2 style="text-align: center; margin-bottom: 15px">Cart</h2>

        <div class="design-beads-container">
            
            <span class="go-back"><span><span class="right-arrow">&#8249;</span><span class="back" @click="backToDesign">back to design</span></span></span>
            
        <div class="design-and-beads">
        
       
       <div class="design-img-container">
        <img :src="dataURL" class="design-img" @click="backToDesign"/>
        </div>
  
            
              <div class="cart-beads">
          <h3>Beads:</h3> 
            <div v-for="bead in templateBeads">
            
                 <span>{{ bead.stone }} ({{ formatBeadSize(bead.size) }}) x {{ bead.quantity }}</span> <span style="float: right">{{ formatPrice(bead.price) | usdollar }} per bead</span>
            
            </div>
              <p>Total: {{ formatPrice(totalBeadsPrice) | usdollar }}</p>
        
        </div>
            
         
            </div> 
        </div>
        
 
        <div class="cart-details">
        
        <div class="your-details">
           
              <h3>Details:</h3>
             
                            <div class="necklace-dtails">
                            
                                    <span class="necklace-dtail-text" v-if="necklace === true">Length:</span><span class="necklace-dtail-text" v-if="necklace === false">Size:</span> <span v-if="necklace === true">{{ formatLength(necklaceLength) }}</span><span v-if="necklace === false">{{ braceletSize }} ({{ formatLength(braceletLength) }})</span>
                                
                         
                   <span class="necklace-dtail-text">Material:</span> <span>{{ selectedMaterial.type }}</span>
                   <span class="necklace-dtail-text">Color:</span> <span>{{ selectedMaterial.color }}</span>
                 </div>
           </div>
        
           <div class="cart-notes">
         <h3 style="margin-bottom: 0">Notes:</h3>
            
                <p style="margin-bottom: 0">Anything else you'd like to add about your design.</p>
                <p style="color: #a4a4a4; margin-top: 5px">(optional)</p>
            <textarea v-model="notes" class="notes-textarea"></textarea>
        </div>
        
       
        
        </div>

            <div class="totals-container">
            <div class="cart-totals">
            
            <span class="total-text">Beads:</span> <span>{{ formatPrice(totalBeadsPrice) | usdollar }}</span>

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

props: ['necklaceLength', 'braceletLength', 'braceletSize', 'templateBeads', 'selectedBeads', 'selectedMaterial', 'selectedType', 'necklace', 'bracelet', 'dataURL'],
    
components: {
    Checkout
},
    
    computed: {
        
           sessionData(){
            
            return this.$session.getAll();
        },
        
           sessionId(){
            
            
            return this.$session.id();
        },
        
          localBeads(){
            return this.$store.state.localBeads;
        },
        
        totalBeadsPrice() {
        
         return Object.values(this.templateBeads)
            .reduce((acc, el) => acc + (el.quantity * el.price), 0)
    
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
        
        backToDesign: function(){
            
            if(this.necklace === true){
            this.$router.push({ name: 'necklace', sessionId: this.sessionId, params: {necklaceLength: this.necklaceLength, selectedMaterial: this.selectedMaterial, templateBeads: this.templateBeads, selectedBeads: this.selectedBeads, necklace: this.necklace, bracelet: this.bracelet}});
            }
            
            if(this.bracelet === true){
                this.$router.push({ name: 'bracelet', sessionId: this.sessionId, params: {braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedMaterial: this.selectedMaterial, templateBeads: this.templateBeads, selectedBeads: this.selectedBeads, necklace: this.necklace, bracelet: this.bracelet}});
                
            }
            
        },
      
              deleteLocalStorage: function(){
            this.$store.commit('deleteLocalBeads');
            this.$session.destroy();
                if(!this.$session.exists()){
                     this.$router.push('/');
                }
  
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
                    "content content";
min-height: 100vh;
min-width: 100vw;
    align-content: flex-start;
margin: 0;
padding: 0;
}

    
.cart-container {
grid-area: content;
display: grid;
width: 1050px;
    padding-top: 20px;
    padding: 30px;
    padding-top: 20px;
        margin-right: auto;
        margin-left: auto;

}
    
    .title-container {
    display: grid;
    grid-template-columns: auto auto auto;
    width: 100%;
    border: 1px solid #eee;
    
        
        
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
    margin-bottom: 50px;


    }
    
        .your-details {
padding-top: 10px;
padding-left: 0px;

        
        
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
padding: 30px;
    
        align-content: center;
        justify-content: center;
         background-color: #f4f4f4;
    
    
    
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
 
    .design-beads-container{
    display: grid;
    grid-template-rows: auto auto;

        margin-top: 30px;

        
    }
    
    .go-back {
        font-size: 16px;
        line-height: 23px;
    text-transform: uppercase;
        margin-bottom: 15px;
    }
    
    
    .design-and-beads {
    display: grid;
    grid-template-columns: 1fr 1fr;
           grid-gap: 40px;
        margin-top: 0px;
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
    
        .back {
 
    cursor: pointer;
   color: #ad81c0;
        
    }
    
    .back:hover {
        color: #8a52a3;
    }
    

    .right-arrow {

        font-size: 20px;
        color: #444;
        margin-right: 8px;
        margin-left: 8px;

    }
    
    .breadcrumbs {
    display: grid;
    font-size: 14px;
        line-height: 20px;
    text-transform: uppercase;
    color: #474747;
        text-align: center;
          margin-bottom: 15px;
        padding: 5px;
    }
    
    
    .headers {
    margin-bottom: 30px;
    }
   

</style>