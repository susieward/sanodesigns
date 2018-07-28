<template>
<div class="cart">
    <h2 style="text-align: center">Cart</h2>
    <div class="cart-container">
    
    <p>Length: {{ necklaceLength }}</p>    
        
    <div class="cart-beads">
        
        <div v-for="bead in selectedBeads">
        
            {{ bead.stone }}
                {{ bead.size }}
                {{ bead.price }}
            
        
        </div>
        
        <div class="cart-notes">
        
            <p>{{ notes }}</p>
        
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
        
    }
},
name: 'Cart',

props: ['necklaceLength', 'selectedBeads', 'notes'],
    
components: {
    Checkout
}

}




</script>
<style>

.cart {
display: grid;
width: 100vw;
min-height: 100vh;
justify-content: center;
    padding: 30px;
    align-content: flex-start;
    grid-gap: 20px;
}
    
.cart-container {
display: grid;
border: 1px solid #ddd;
width: 975px;
    padding: 30px;
}



</style>