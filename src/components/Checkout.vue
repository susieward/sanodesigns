<template>
<div class="checkout">
    <div class="checkout-container">
    
       
        <!-- PAYMENT FORM -->

 <div class="payment">
 
     <div class="top-row">
         <span>
     <label for="name">Name:</label>
         <input name="name" type="text" v-model="name" placeholder="Your full name" style="width: 250px"/>
         </span>
         
         <span>
         <label for="email">Email:</label>
         <input name="email" type="text" v-model="email" placeholder="you@example.com" style="width: 250px"/>
         </span>
        </div>
     
 <br>

     <label for="address">Shipping address:<br>
         <input name="address.street" type="text" v-model="address.street" placeholder="123 Example Drive" style="width: 97%"/>
 
     
<div class="row">
         <input name="address.city" type="text" v-model="address.city" placeholder="City"/>
         <input name="address.state" type="text" v-model="address.state" placeholder="State"/>
    <input name="address.zip" type="text" v-model="address.zip" placeholder="ZIP"/>
   </div></label>
   
     
       </div>  
          
           </div> 
         
        </div>
      
  



</template>
<script>
export default {
    
data(){
    return {
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        }
    }
},
    
name: 'Checkout'

}




</script>
<style>

.checkout {
display: grid;
      border: 1px solid #eee;
    width: 700px;
    margin: auto;
    justify-content: center;
    align-content: center;
    padding: 30px;

}
    
.checkout-container {
    display: grid;


    }
    
    .payment {
    display: grid;

        border: 1px solid #eee;
        border-radius: 6px;
        padding: 30px;
        width: 650px;

    }
    
    .payment input {
    padding: 4px 6px;
    font-size: 16px;
        margin: 5px;
    font-family: 'Karla';
    border: 1px solid #C4A8D1;
    border-radius: 4px;
    }
    
    .payment label {

    margin-top: auto;
    margin-bottom: auto;
    }
    
     .row {


width: 100%;
}
    
    .top-row {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 0;
        width: 100%;
    }


</style>