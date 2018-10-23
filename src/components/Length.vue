<template>
<div class="length">


     <div class="length-container">

    <div class="select-length-container">
     <h2 style="text-align: center">Select {{ selectedType }} <span v-if="necklace === true">Length</span><span v-if="bracelet === true">Size</span></h2>


     <div v-if="necklace === true" class="length-selector">
              <div class="size-template-necklace">

                <img class="necklace-length-img" src="/static/necklace-length-guide.jpg"/>

              </div>

              <div class="size">



              <div class="radio-buttons-container">


              <span><input type="radio" id="small" value="40"  @change="showButton" v-model="necklaceLength"/>
              <label for="40-cm">40 cm</label></span>

              <span><input type="radio" id="small" value="42"  @change="showButton" v-model="necklaceLength"/>
                  <label for="42-cm">42 cm</label></span>

              <span><input type="radio" id="small" value="45"  @change="showButton" v-model="necklaceLength"/>
                  <label for="45-cm">45 cm</label></span>

                  <span><input type="radio" id="small" value="50"  @change="showButton" v-model="necklaceLength"/>
                      <label for="50-cm">50 cm</label></span>

                  <span><input type="radio" id="small" value="60"  @change="showButton" v-model="necklaceLength"/>
                      <label for="60-cm">60 cm</label></span>

                  <span><input type="radio" id="small" value="80"  @change="showButton" v-model="necklaceLength"/>
                      <label for="80-cm">80 cm</label></span>

                  </div>





         </div>
    </div>


    <div v-if="bracelet === true" class="length-selector">

              <div class="size-template-bracelet">

                  <img class="bracelet-size-img" src="/static/bracelet-size-guide.png"/>

              </div>

              <div class="size">

               <div class="radio-buttons-bracelet">

                   <span><input type="radio" id="s" value="14" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                   <label for="xs">XS - 14 cm</label></span>

            <span><input type="radio" id="s" value="15" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                   <label for="s">S - 15 cm</label></span>

            <span><input type="radio" id="m" value="16" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="m">M - 16 cm</label></span>

            <span><input type="radio" id="l" value="17" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="l">L - 17 cm</label></span>

            <span><input type="radio" id="xl" value="18" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="xl">XL - 18 cm</label></span>

                   <span><input type="radio" id="xxl" value="19" @change="sendBraceletLength(braceletLength)" v-model="braceletLength"/>
                <label for="xxl">XXL - 19 cm</label></span>
                  </div>

        </div>
    </div>

    </div>
    </div>
    </div>
</template>
<script>

export default {
data(){
    return {
        lengthChosen: false,
        necklaceLength: undefined,
        braceletLength: undefined,
        braceletSize: ''
    }
},
name: 'Length',

props: ['necklace', 'bracelet', 'selectedType'],

    mounted: function(){


         if(this.sessionType){
             this.selectedType = this.sessionType;
         }

                 if(this.sessionNecklace){
             this.necklace = this.sessionNecklace;
         }

        if(this.sessionBracelet){
             this.bracelet = this.sessionBracelet;
         }

          if(this.sessionNecklaceLength){
             this.necklaceLength = this.sessionNecklaceLength;
         }

        if(this.sessionBraceletLength){
            this.lengthChosen = true;
             this.braceletLength = this.sessionBraceletLength;
         }

          if(this.sessionBraceletSize){
              this.lengthChosen = true;
             this.braceletSize = this.sessionBraceletSize;
         }
    },

     computed: {

             sessionType(){

                if(this.$session.has('sessionType')){

                return this.$session.get('sessionType');
                }

            },

             sessionNecklace(){

                if(this.$session.has('sessionNecklace')){

                return this.$session.get('sessionNecklace');
                }

            },

        sessionBracelet(){

                if(this.$session.has('sessionBracelet')){

                return this.$session.get('sessionBracelet');
                }

            },

             sessionNecklaceLength(){

                if(this.$session.has('sessionNecklaceLength')){

                return this.$session.get('sessionNecklaceLength');
                }

            },

         sessionBraceletLength(){

                if(this.$session.has('sessionBraceletLength')){

                return this.$session.get('sessionBraceletLength');
                }

            },

         sessionBraceletSize(){

                if(this.$session.has('sessionBraceletSize')){

                return this.$session.get('sessionBraceletSize');
                }

            },

             sessionId(){


            return this.$session.id();
        }
    },

    methods: {
         showButton: function(){
            this.lengthChosen = true;
             this.$emit('nlength', this.necklaceLength);
             this.$session.set('sessionNecklaceLength', this.necklaceLength);

            this.$router.push({ name: 'Materials', params: { sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, selectedType: this.selectedType}});

        },

        toNecklaceMaterial: function(){

            this.$session.set('necklaceLength', this.necklaceLength);

            this.$router.push({ name: 'Materials', params: { sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, selectedType: this.selectedType}});
        },

        sendBraceletLength: function(braceletLength){
            this.lengthChosen = true;
            this.getBraceletLength(braceletLength);

            this.$session.set('sessionBraceletLength', this.braceletLength);
            this.$session.set('sessionBraceletSize', this.braceletSize);

             this.$router.push({ name: 'Materials', params: { sessionId: this.sessionId, necklace: this.necklace, bracelet: this.bracelet, necklaceLength: this.necklaceLength, braceletLength: this.braceletLength, braceletSize: this.braceletSize, selectedType: this.selectedType}});
        },

         getBraceletLength: function(braceletLength){
            this.braceletLength = braceletLength;
            this.lengthChosen = true;

            if(this.braceletLength === '14'){
                this.braceletSize = 'XS';
            }

            if(this.braceletLength === '15'){
                this.braceletSize = 'S';
            }

            if(this.braceletLength === '16'){
                this.braceletSize = 'M';
            }

            if(this.braceletLength === '17'){
                this.braceletSize = 'L';
            }

            if(this.braceletLength === '18'){
                this.braceletSize = 'XL';
            }

            if(this.braceletLength === '19'){
                this.braceletSize = 'XXL';
            }
        }
    }
}



</script>
<style>
    .length-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;

    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;


    }

     .select-length-container {
        display: grid;

grid-gap: 30px;
        justify-content: center;

    }


    .select-text {
    font-size: 22px;
line-height: 25px;
color: #262626;
font-family: 'Playfair Display';
font-weight: 400;
    text-align: center;
    margin: auto;
    padding: 0;
    }

    .select-length {
    display: grid;
justify-content: center;

    }

    .length-selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
    }

    .size-template-necklace {

    height: 400px;
    width: 400px;
    border: 1px solid #ddd;
    }

    .necklace-length-img {

    height: 100%;
    width: 100%;
    }

    .size-template-bracelet {
    height: 440px;
    width: 440px;
    border: 1px solid #ddd;
    }

    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }

    .size {
       min-height: 400px;
        width: 300px;

    }

    .radio-buttons-container {
    display: grid;
    grid-template-rows: repeat(6, auto);
    }

    .radio-buttons-bracelet {
    display: grid;
    grid-template-rows: repeat(6, auto);
    }

    .necklace-material-radios {
    display: grid;
    grid-template-rows: repeat(3, auto);
    }


/* media queries */


    @media screen and (max-width: 1200px){

   .length-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;

    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
       width: 860px;


    }

     .select-length-container {
        display: grid;


        justify-content: center;
    }


    .select-text {
    font-size: 22px;
line-height: 25px;
color: #262626;
font-family: 'Playfair Display';
font-weight: 400;
    text-align: center;
    margin: auto;
    padding: 0;
    }

    .select-length {
    display: grid;
justify-content: center;

    }

    .length-selector {
    display: grid;
    grid-template-columns: auto auto;

    padding: 10px;
    grid-gap: 40px;
    }

    .size-template-necklace {

    height: 400px;
    width: 400px;
    border: 1px solid #ddd;
    }

    .necklace-length-img {

    height: 100%;
    width: 100%;
    }

    .size-template-bracelet {
    height: 440px;
    width: 440px;
    border: 1px solid #ddd;
    }

    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }

    .size {
       min-height: 400px;
        width: 300px;

    }
    }

       @media screen and (max-width: 1000px){

   .length-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;

    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 640px;


    }

     .select-length-container {
        display: grid;
         grid-gap: 30px;


        justify-content: center;
    }


    .select-text {
    font-size: 22px;
line-height: 25px;
color: #262626;
font-family: 'Playfair Display';
font-weight: 400;
    text-align: center;
    margin: auto;
    padding: 0;
    }

    .select-length {
    display: grid;
justify-content: center;

    }

    .length-selector {
    display: grid;
    grid-template-columns: auto auto;
justify-content: center;
    padding: 10px;
    grid-gap: 20px;

    }

    .size-template-necklace {

    height: 300px;
    width: 300px;
    border: 1px solid #ddd;
    }

    .necklace-length-img {

    height: 100%;
    width: 100%;
    }

    .size-template-bracelet {
    height: 440px;
    width: 440px;
    border: 1px solid #ddd;
    }

    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }

    .size {
       min-height: 300px;
 width:200px;


    }
    }


       @media screen and (max-width: 766px){

             .length-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;

    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 600px;


    }



              .length-selector {
    display: grid;
    grid-template-columns: auto auto;
justify-content: center;
    padding: 10px;
    grid-gap: 20px;

    }

       .size-template-necklace {

    height: 300px;
    width: 300px;
    border: 1px solid #ddd;
    }

    .necklace-length-img {

    height: 100%;
    width: 100%;
    }

    .size-template-bracelet {
    height: 340px;
    width: 340px;
    border: 1px solid #ddd;
    }

    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }

    .size {
       min-height: 300px;
 width:200px;


    }

    }




    @media screen and (max-width: 600px){


    .length-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;

    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 400px;


    }


    .length-selector {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
justify-content: center;
        align-items: center;
    padding: 10px;
    grid-gap: 20px;

    }


    }


       @media screen and (max-width: 400px){

                  .length-container {
    grid-area: content;
    display: grid;
    align-content: flex-start;

    grid-gap: 30px;

    padding-top: 0px;
    padding-bottom: 10px;
    min-height: 700px;
    width: 400px;


    }



              .length-selector {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
justify-content: center;
    padding: 10px;
    grid-gap: 20px;

    }


       .size-template-necklace {

    height: 300px;
    width: 300px;
    border: 1px solid #ddd;
    }

    .necklace-length-img {

    height: 100%;
    width: 100%;
    }

    .size-template-bracelet {
    height: 340px;
    width: 340px;
    border: 1px solid #ddd;
    }

    .bracelet-size-img {
    height: 100%;
        width: 100%;
    }

    .size {
min-height: 300px;
 width:auto;


    }

    }


</style>
