<template>

<div class="bead-selector">
<div class="top-text">
  <p>Click to select beads from the directory below.<br>
        You <strong>will be able to add more than one</strong> of each bead when working on your design.</p>
<span style="color: red" v-show="maximumReached">{{ selectedMessage }}</span>
    </div>
       
      <div class="bead-selector-container">
          
         
        
          <div class="selected-container">
            
              <h3 style="margin: 0; padding: 0">You've selected:</h3>
              
               <div v-if="necklace === true" class="continue-btn">
              <button class="btn-small" style="width: 140px" v-if="selectedBeads.length && !beadsEdit.length" @click="finishedNecklaceSelection()" :disabled="showDisabled" :class="{ 'btn-disabled': showDisabled }">continue</button><br>
              <button class="btn-small" style="width: 200px" v-if="beadsEdit.length" @click="confirmNecklaceSelection()" :disabled="showDisabled" :class="{ 'btn-disabled': showDisabled }">save changes</button>
              </div>
              
              <div v-if="necklace === false" class="continue-btn">
              <button class="btn-small" style="width: 140px" v-if="selectedBeads.length && !beadsEdit.length" @click="finishedBraceletSelection()" :disabled="showDisabled" :class="{ 'btn-disabled': showDisabled }">continue</button><br>
              <button class="btn-small" style="width: 200px" v-if="beadsEdit.length" @click="confirmBraceletSelection()" :disabled="showDisabled" :class="{ 'btn-disabled': showDisabled }">save changes</button>
              </div>
             
     
              
              <div class="selected-container-beads">
          
             
          <div v-for="(bead, index) in selectedBeads" class="selected-bead" :key="bead._id">
              
              <div class="bead-container-selector">
                  <span class="remove" @click="remove(index)">x</span>
              <img class="bead-img-small-selector" :src="bead.image"/>
             
                  
          </div>
             
              </div>
                  
                  <div v-for="(bead, index) in beadsEdit" class="selected-bead" :key="bead._id">
               
              <div class="bead-container-selector">
                  <span class="remove" @click="remove(index)">x</span>
              <img class="bead-img-small-selector" :src="bead.image"/>
               
          </div>
            
              
              
              </div>
       
          </div>
           
          </div>
   
          <div class="beads-and-search">
              <div class="search-container">
                  <span class="search"><span class="search-text">Search:</span> <input type="text" class="searchbar" v-model="search"  placeholder="blue, round, Obsidian, 10 mm, smooth, etc"/></span>
          </div>

      <div class="beads-directory" :class="{ 'container-disabled': showDisabled }">
               
          <div v-for="(bead, index) in filteredList" class="bead" :class="{ 'bead-disabled': showDisabled }" @click="select(bead, $event)" v-bind:key="bead._id">
              
          <div class="bead-container">
              <img class="bead-img-small" :src="bead.image"/>
          </div>
              <div class="admin-bead-details">
              <span class="admin-prop-name">Stone:</span> <span>{{ bead.stone }}</span> 
                  <span class="admin-prop-name">Size:</span> <span>{{ formatBeadSize(bead.size) }}</span> 
                  <span class="admin-prop-name">Cut:</span> <span>{{ bead.cut }}</span> 
                  <span class="admin-prop-name">Color:</span> <span>{{ bead.color }}</span> 
                  <span class="admin-prop-name">Shape:</span> <span>{{ bead.shape }}</span> 
                  <span class="admin-prop-name">Price:</span> <span>{{ formatPrice(bead.price) | usdollar }}</span> 
              
 
              
              
              </div>
          
          
          </div> 
          </div>
    </div>
          
      </div>
     
      </div>
    

</template>
<script>
export default {
    name: 'BeadSelector',
    
  props: ['necklaceLength', 'braceletLength', 'necklace', 'bracelet', 'beadsEdit'],
  data () {
    return { 
        search: '',
        searchProps: ['stone', 'size', 'cut', 'color', 'shape', 'price'], 
        beadsEdit: [],
        selectedBeads: [],
        selectedStone: undefined,
        selectedSize: undefined,
        selectedColor: undefined,
        selectedShape: undefined,
        selectedProps: [],
        selectedMax: false
      
    }
  },
    
    
    computed: {
        

        beads(){
            return this.$store.state.beads;
        },
        
        totalSelectedBeadsLength() {
            
            if(this.beadsEdit.length){
                
                return Object.values(this.beadsEdit)
                .reduce((acc, el) => acc + el.size, 0);
                
            } else {
        
            return Object.values(this.selectedBeads)
            .reduce((acc, el) => acc + el.size, 0);
            }
    
        },
        
        maximumLength(){
            
            if(this.necklace === true){
                
                return this.necklaceLength * 10;
                
            }
            
            if(this.necklace === false){
                
                return this.braceletLength * 10;
            }
        },
        
             selectedMessage(){
            
              if(this.totalSelectedBeadsLength >= this.maximumLength){
                  
                  var msg = 'You have reached the maximum amount of beads that will fit on your chosen length! Please remove beads to continue.'
                return msg;
                
            }
        },
        
        showDisabled(){
            
            return this.totalSelectedBeadsLength >= this.maximumLength
        },
        
        
    
        
    filteredList: function(){
        var lowSearch = this.search.toLowerCase();
       
        
        return this.beads.filter(bead => {
            return this.searchProps.some( key =>
                                              
        String(bead[key]).toLowerCase().includes(lowSearch)
       );
        });

    }
    },
    
    
    methods: {
        
        maximumReached: function(){
            if(this.totalSelectedBeadsLength >= this.maximumLength){
                  this.selectedMax = true;
            
                }
        },
    
        select: function(bead, event){
            
        if(this.totalSelectedBeadsLength >= this.maximumLength){
            
            event.preventDefault();
            
            
        } else {
            if(this.beadsEdit.length){
                
              var addedBead = this.beadsEdit.find(selectedBead => selectedBead._id === bead._id);
                
                if(this.beadsEdit.includes(addedBead)){
                    return
                } else {
     
                    this.beadsEdit.push(bead)
                }
            } else {
                
                
                var addedBead = this.selectedBeads.find(selectedBead => selectedBead._id === bead._id);
                
                if(this.selectedBeads.includes(addedBead)){
                    return
                } else {
                 this.selectedBeads.push(bead);
                }
            }
         }
        },
        
         remove: function(index){
            if(this.beadsEdit.length){
                this.beadsEdit.splice(index, 1);
           
            } else {
                 this.selectedBeads.splice(index, 1);
            }
         },
        
        finishedNecklaceSelection: function(){
        this.$session.set('sessionSelected', this.selectedBeads);
            this.$emit('selected', this.selectedBeads );
           
        },
            
            finishedBraceletSelection: function(){
         this.$session.set('sessionSelected', this.selectedBeads);
                 this.$emit('selected', this.selectedBeads );
            },
        
        confirmNecklaceSelection: function(){
           this.$session.set('sessionSelected', this.beadsEdit);
            this.$emit('edited', this.beadsEdit );
        },
            
            confirmBraceletSelection: function(){
             this.$session.set('sessionSelected', this.beadsEdit);
            this.$emit('edited', this.beadsEdit);
        },
            
        formatPrice: function(value){
            return value.toFixed(2);
        },
        
           formatBeadSize: function(value){
            return value + '' + ' mm'
        },
    },
    
    
     filters: {
        pick: function (objects, key) {
            return objects.map(function(object) { 
    	       return object[key];
                               
     })
        },
 
    usdollar: function(value) {
      return `$${value}`;
    }
  
    

}
}
</script>

<style>
    
    
   
 
    .bead-selector {
    display: grid;
    align-content: flex-start;
    grid-gap: 20px;

    }
    
    
    .bead-selector-container {

    display: grid;
    grid-template-columns: auto 850px;
    min-height: 400px;
    justify-content: center;
    grid-gap: 20px;
      
 
    }
    
     .top-text {
        padding-left: 15px;
        padding-right: 15px;
    }
    
    
    
/* SEARCH */
    

       .search-container {

    display: grid;
   align-content: center;
       justify-content: flex-start;
    padding: 20px;
    padding-left: 0;
        margin-bottom: 10px;

    }
    
    .search {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
         align-content: flex-end;
        padding: 0;
        margin: 0;
    }
    
    .search-text {
    
  font-size: 23px;
line-height: 26px;
        font-family: 'Playfair Display';
        margin: 0;
        padding: 0;
display: grid;

         align-content: center;
       
   
    }
    .searchbar {
    height: 40px;
    width:440px;
    padding: 10px 12px;
    font-size: 18px;
    border: 1px solid #aaa;

    }


   
    

    .beads-directory {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
  
      height: 800px;
        width: 850px;
       opacity: 1;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
     .container-disabled {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
  
      height: 800px;
        width: 850px;
       opacity: 0.4;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
    
    .bead-container {
        width: 140px;
       height: 140px;
        border: 1px solid #ddd;
        border-radius: 50%;
    }
    
     .bead-img-small {
    width: 100%;
         height: 100%;
         margin: auto;
  object-fit: cover;
     
   
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
    
    .selected-container {
    display: grid;
   align-content: flex-start;
grid-gap: 15px;
    padding-top: 20px;

  


    }
    
     .selected-container-beads {
    display: grid;
    grid-template-columns: auto auto;
         grid-gap: 10px;
 justify-content: center;
border: 1px solid #ddd;
  padding: 10px;
        width: 275px; 
 
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
    
        
     .admin-bead-details {
        display: grid;
        grid-template-columns: auto auto;
justify-content: center;
      line-height: 20px;
        font-size: 14px;
    }
    
     .admin-prop-name {
    margin-right: 18px;
    }
    
    .bead {

    display: grid;
    justify-content: center;
        grid-gap: 2px;
        padding: 5px;
        cursor: pointer;
         border: 1px solid transparent;
    }
    
    .bead:hover {
        border: 1px solid #C4A8D1;
    }
    
    .bead:focus {
        border: 1px solid #C4A8D1;
    }
    
      .bead-disabled {
        display: grid;
    justify-content: center;
        grid-gap: 2px;
        padding: 5px;
        cursor: default;
         border: 1px solid transparent;
        
    }
    
    .bead-disabled:hover {
    border: 1px solid transparent;
    cursor: default;
        
        
    }
    
    .selected-bead p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    }
    
    .remove {
    color: #bebebe;
    font-size: 18px;
    position: absolute;
    top: 10;
    left: 10;
    cursor: pointer;
    }
    
    .remove:hover {
    color: #555;
    }
    
    .continue-btn {
    display: grid;
     align-content: flex-end;
    width: 100%;
    }
    
    .btn-disabled {
border: 1px solid #000;
background-color: #000;
padding: 14px 22px;
text-align: center;
font-family: 'Karla';
font-size: 18px;
line-height: 18px;
text-transform: uppercase;
color: #d9d9d9;
font-weight: 400;
cursor: pointer; 
height: 50px;
opacity: 0.3;
cursor: default;
    }
    
    
    
    @media screen and (max-width: 1200px){
        
        .top-text {
            width: 860px;
            text-align: center;
          }
        
        .bead-selector {
            
        width: 860px;
        }
        
         .bead-selector-container {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        min-height: 400px;
        justify-content: center;
        grid-gap: 20px;
   
 
        }
        
           .selected-container {
    display: grid;
   align-content: flex-start;
grid-gap: 15px;
    padding-top: 20px;

               justify-content: center;
  text-align: center;


    }
        
           .continue-btn {
    display: grid;
      align-content: flex-end;
    justify-content: center;
   
    width: 100%;

    }
    
        .search-container {

            display: grid;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
        }
        
       
     .selected-container-beads {
    display: grid;
    grid-template-columns: repeat(6, auto);
         grid-gap: 10px;
width: auto;
        justify-content: flex-start;
border: 1px solid #ddd;
  padding: 10px;
   
 
    }
        
           .beads-directory {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
  
      height: 700px;
        width: 800px;
       opacity: 1;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
     .container-disabled {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto auto;
        grid-gap: 10px;
  
      height: 800px;
        width: 800px;
       opacity: 0.4;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
    
    .bead-container {
        width: 140px;
       height: 140px;
        border: 1px solid #ddd;
        border-radius: 50%;
    }
        
    }
    
      @media screen and (max-width: 1000px){
          
          .top-text {
            width: 640px;
          }
          
         .bead-selector {
            
        width: 640px;
        }
          
              .bead-selector-container {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        min-height: 400px;
        justify-content: center;
        grid-gap: 20px;
   
 
        }
          
    .selected-container-beads {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    width: auto;
    justify-content: flex-start;
    border: 1px solid #ddd;
    padding: 10px;
   
 
    }
     
          
    .beads-directory {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto;
        grid-gap: 10px;
  
      height: 600px;
        width: 600px;
       opacity: 1;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
     .container-disabled {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto;
        grid-gap: 10px;
  
      height: 600px;
        width: 600px;
       opacity: 0.4;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
        
        
    }
    
      @media screen and (max-width: 766px){
          
          
          .top-text {
            width: 600px;
            text-align: center;
              padding-left: 15px;
              padding-right: 15px;
          }
          
         .bead-selector {
            
        width: 600px;
        }
          
              .bead-selector-container {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        min-height: 400px;
        justify-content: center;
        grid-gap: 20px;
     width: 600px;
 
        }

          
            .beads-directory {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto;
        grid-gap: 10px;
  
      height:6500px;
        width: 560px;
       opacity: 1;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
     .container-disabled {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto auto;
        grid-gap: 10px;
  
      height: 600px;
        width: 600px;
       opacity: 0.4;
        padding: 20px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
          
    .selected-container-beads {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 0px;
    width: auto;
    justify-content: flex-start;
    border: 1px solid #ddd;
    padding: 10px;
   
 
    }
        
        
    }
    
      @media screen and (max-width: 600px){
          
          
          .top-text {
            width: 400px;
          }
        .bead-selector {
            margin: auto;
        width: 400px;
        }
          
              .bead-selector-container {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        min-height: 400px;
        justify-content: center;
        grid-gap: 20px;


 
        }
          
          .bead-selector-container {
    
               width: 400px;
          }
          
          .selected-container {
            margin: auto;
               width: 400px;
          }
          
     .search-container {

    display: grid;
   align-content: center;

    padding: 20px;
           align-items: center;
  

    }
          
       .search {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 10px;
         align-content: center;

        padding: 0;
        margin: 0;
    }
    
    .search-text {
    
  font-size: 23px;
line-height: 26px;
        font-family: 'Playfair Display';
        margin: 0;
        padding: 0;
display: grid;

         align-content: center;
       
   
    }
    
    
    
    .searchbar {
    height: 40px;
    width: 400px;
    padding: 10px 12px;
    font-size: 18px;
    border: 1px solid #aaa;
        margin-bottom: 20px;
    }
          
    
          
            .beads-directory {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto;
        grid-gap: 10px;
  
      height: 400px;
        width: 400px;
       opacity: 1;
        padding: 10px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
    
     .container-disabled {
    display: grid;
        margin: auto;
    grid-template-columns: auto auto;
        grid-gap: 10px;
  
      height: 400px;
        width: 400px;
       opacity: 0.4;
        padding: 10px;
        border: 1px solid #ddd;
        overflow: scroll;
    }
          
            .selected-container-beads {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 0px;
    width: auto;
    justify-content: flex-start;
    border: 1px solid #ddd;
    padding: 10px;
   
 
    }
         
        
    }
    
    @media screen and (max-width: 400px){
          
    .top-text {
    width: 390px;
    }
        
        .selected-container {
        padding-left: 20px;
        padding-right: 20px;
        }
        
    .bead-selector {
    width: 390px;
    }
        
                
          .bead-selector-container {
        
               width: 390px;
          }
          
          .selected-container {
            margin: auto;
               width: 390px;
          }
          
   .search-container {
    display: grid;
    align-content: center;
    justify-content: center;
    padding: 20px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    
    }
        
           .search {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 10px;
         align-content: center;

        padding: 0;
        margin: 0;
    }
    
    .search-text {
    
  font-size: 23px;
line-height: 26px;
        font-family: 'Playfair Display';
        margin: 0;
        padding: 0;
display: grid;

         align-content: center;
       
   
    }
    
    
    .searchbar {
    height: 40px;
    width: 350px;
    padding: 10px 12px;
    font-size: 18px;
    border: 1px solid #aaa;
    margin-bottom: 20px;
     margin-left: auto;
    margin-right: auto;
    }
          
    .beads-directory {
    display: grid;
    margin: auto;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    height: 600px;
    width: 360px;
    opacity: 1;
    padding: 10px;
    border: 1px solid #ddd;
    overflow: scroll;
    }
    
    .container-disabled {
    display: grid;
    margin: auto;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    height: 600px;
    width: 360px;
    opacity: 0.4;
    padding: 10px;
    border: 1px solid #ddd;
    overflow: scroll;
    }
          
    .selected-container-beads {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 0px;
    width: auto;
    justify-content: flex-start;
    border: 1px solid #ddd;
    padding: 10px;
   
 
    }
    
         
    }
    
</style>