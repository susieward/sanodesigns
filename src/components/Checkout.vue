<template>
<div class="checkout">




    <div class="checkout-container">


        <!-- PAYMENT FORM -->

 <div v-if="!submitted" class="payment">
   <p>
     Customer Information
   </p>
   <div class="top-row">


       <input name="email" type="text" :class="{ 'required-field' : showErr }" v-model="stripeEmail" placeholder="Email Address*"/>




       <input name="phone" type="text" v-model="phone" placeholder="Phone (optional)"/>

      </div>
<br />
      <p>
        Shipping Address
      </p>
     <div class="top-row">


         <input name="first" type="text"  required v-model="name.first" placeholder="First Name*"/>
         <input name="last" type="text" required v-model="name.last" placeholder="Last Name*"/>

        </div>

<div class="row">
  <select name="country" required v-model="address.country" id="country">
<option value="">Select Country*</option>
<option value="United States">United States</option>
<option value="United Kingdom">United Kingdom</option>
<option value="Afghanistan">Afghanistan</option>
<option value="Albania">Albania</option>
<option value="Algeria">Algeria</option>
<option value="American Samoa">American Samoa</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Anguilla">Anguilla</option>
<option value="Antarctica">Antarctica</option>
<option value="Antigua and Barbuda">Antigua and Barbuda</option>
<option value="Argentina">Argentina</option>
<option value="Armenia">Armenia</option>
<option value="Aruba">Aruba</option>
<option value="Australia">Australia</option>
<option value="Austria">Austria</option>
<option value="Azerbaijan">Azerbaijan</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahrain">Bahrain</option>
<option value="Bangladesh">Bangladesh</option>
<option value="Barbados">Barbados</option>
<option value="Belarus">Belarus</option>
<option value="Belgium">Belgium</option>
<option value="Belize">Belize</option>
<option value="Benin">Benin</option>
<option value="Bermuda">Bermuda</option>
<option value="Bhutan">Bhutan</option>
<option value="Bolivia">Bolivia</option>
<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
<option value="Botswana">Botswana</option>
<option value="Bouvet Island">Bouvet Island</option>
<option value="Brazil">Brazil</option>
<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
<option value="Brunei Darussalam">Brunei Darussalam</option>
<option value="Bulgaria">Bulgaria</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Cambodia">Cambodia</option>
<option value="Cameroon">Cameroon</option>
<option value="Canada">Canada</option>
<option value="Cape Verde">Cape Verde</option>
<option value="Cayman Islands">Cayman Islands</option>
<option value="Central African Republic">Central African Republic</option>
<option value="Chad">Chad</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Christmas Island">Christmas Island</option>
<option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
<option value="Colombia">Colombia</option>
<option value="Comoros">Comoros</option>
<option value="Congo">Congo</option>
<option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
<option value="Cook Islands">Cook Islands</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Cote D'ivoire">Cote D'ivoire</option>
<option value="Croatia">Croatia</option>
<option value="Cuba">Cuba</option>
<option value="Cyprus">Cyprus</option>
<option value="Czech Republic">Czech Republic</option>
<option value="Denmark">Denmark</option>
<option value="Djibouti">Djibouti</option>
<option value="Dominica">Dominica</option>
<option value="Dominican Republic">Dominican Republic</option>
<option value="Ecuador">Ecuador</option>
<option value="Egypt">Egypt</option>
<option value="El Salvador">El Salvador</option>
<option value="Equatorial Guinea">Equatorial Guinea</option>
<option value="Eritrea">Eritrea</option>
<option value="Estonia">Estonia</option>
<option value="Ethiopia">Ethiopia</option>
<option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
<option value="Faroe Islands">Faroe Islands</option>
<option value="Fiji">Fiji</option>
<option value="Finland">Finland</option>
<option value="France">France</option>
<option value="French Guiana">French Guiana</option>
<option value="French Polynesia">French Polynesia</option>
<option value="French Southern Territories">French Southern Territories</option>
<option value="Gabon">Gabon</option>
<option value="Gambia">Gambia</option>
<option value="Georgia">Georgia</option>
<option value="Germany">Germany</option>
<option value="Ghana">Ghana</option>
<option value="Gibraltar">Gibraltar</option>
<option value="Greece">Greece</option>
<option value="Greenland">Greenland</option>
<option value="Grenada">Grenada</option>
<option value="Guadeloupe">Guadeloupe</option>
<option value="Guam">Guam</option>
<option value="Guatemala">Guatemala</option>
<option value="Guinea">Guinea</option>
<option value="Guinea-bissau">Guinea-bissau</option>
<option value="Guyana">Guyana</option>
<option value="Haiti">Haiti</option>
<option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
<option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
<option value="Honduras">Honduras</option>
<option value="Hong Kong">Hong Kong</option>
<option value="Hungary">Hungary</option>
<option value="Iceland">Iceland</option>
<option value="India">India</option>
<option value="Indonesia">Indonesia</option>
<option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
<option value="Iraq">Iraq</option>
<option value="Ireland">Ireland</option>
<option value="Israel">Israel</option>
<option value="Italy">Italy</option>
<option value="Jamaica">Jamaica</option>
<option value="Japan">Japan</option>
<option value="Jordan">Jordan</option>
<option value="Kazakhstan">Kazakhstan</option>
<option value="Kenya">Kenya</option>
<option value="Kiribati">Kiribati</option>
<option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
<option value="Korea, Republic of">Korea, Republic of</option>
<option value="Kuwait">Kuwait</option>
<option value="Kyrgyzstan">Kyrgyzstan</option>
<option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
<option value="Latvia">Latvia</option>
<option value="Lebanon">Lebanon</option>
<option value="Lesotho">Lesotho</option>
<option value="Liberia">Liberia</option>
<option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lithuania">Lithuania</option>
<option value="Luxembourg">Luxembourg</option>
<option value="Macao">Macao</option>
<option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
<option value="Madagascar">Madagascar</option>
<option value="Malawi">Malawi</option>
<option value="Malaysia">Malaysia</option>
<option value="Maldives">Maldives</option>
<option value="Mali">Mali</option>
<option value="Malta">Malta</option>
<option value="Marshall Islands">Marshall Islands</option>
<option value="Martinique">Martinique</option>
<option value="Mauritania">Mauritania</option>
<option value="Mauritius">Mauritius</option>
<option value="Mayotte">Mayotte</option>
<option value="Mexico">Mexico</option>
<option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
<option value="Moldova, Republic of">Moldova, Republic of</option>
<option value="Monaco">Monaco</option>
<option value="Mongolia">Mongolia</option>
<option value="Montserrat">Montserrat</option>
<option value="Morocco">Morocco</option>
<option value="Mozambique">Mozambique</option>
<option value="Myanmar">Myanmar</option>
<option value="Namibia">Namibia</option>
<option value="Nauru">Nauru</option>
<option value="Nepal">Nepal</option>
<option value="Netherlands">Netherlands</option>
<option value="Netherlands Antilles">Netherlands Antilles</option>
<option value="New Caledonia">New Caledonia</option>
<option value="New Zealand">New Zealand</option>
<option value="Nicaragua">Nicaragua</option>
<option value="Niger">Niger</option>
<option value="Nigeria">Nigeria</option>
<option value="Niue">Niue</option>
<option value="Norfolk Island">Norfolk Island</option>
<option value="Northern Mariana Islands">Northern Mariana Islands</option>
<option value="Norway">Norway</option>
<option value="Oman">Oman</option>
<option value="Pakistan">Pakistan</option>
<option value="Palau">Palau</option>
<option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
<option value="Panama">Panama</option>
<option value="Papua New Guinea">Papua New Guinea</option>
<option value="Paraguay">Paraguay</option>
<option value="Peru">Peru</option>
<option value="Philippines">Philippines</option>
<option value="Pitcairn">Pitcairn</option>
<option value="Poland">Poland</option>
<option value="Portugal">Portugal</option>
<option value="Puerto Rico">Puerto Rico</option>
<option value="Qatar">Qatar</option>
<option value="Reunion">Reunion</option>
<option value="Romania">Romania</option>
<option value="Russian Federation">Russian Federation</option>
<option value="Rwanda">Rwanda</option>
<option value="Saint Helena">Saint Helena</option>
<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
<option value="Saint Lucia">Saint Lucia</option>
<option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
<option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
<option value="Samoa">Samoa</option>
<option value="San Marino">San Marino</option>
<option value="Sao Tome and Principe">Sao Tome and Principe</option>
<option value="Saudi Arabia">Saudi Arabia</option>
<option value="Senegal">Senegal</option>
<option value="Serbia and Montenegro">Serbia and Montenegro</option>
<option value="Seychelles">Seychelles</option>
<option value="Sierra Leone">Sierra Leone</option>
<option value="Singapore">Singapore</option>
<option value="Slovakia">Slovakia</option>
<option value="Slovenia">Slovenia</option>
<option value="Solomon Islands">Solomon Islands</option>
<option value="Somalia">Somalia</option>
<option value="South Africa">South Africa</option>
<option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
<option value="Spain">Spain</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Sudan">Sudan</option>
<option value="Suriname">Suriname</option>
<option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
<option value="Swaziland">Swaziland</option>
<option value="Sweden">Sweden</option>
<option value="Switzerland">Switzerland</option>
<option value="Syrian Arab Republic">Syrian Arab Republic</option>
<option value="Taiwan, Province of China">Taiwan, Province of China</option>
<option value="Tajikistan">Tajikistan</option>
<option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
<option value="Thailand">Thailand</option>
<option value="Timor-leste">Timor-leste</option>
<option value="Togo">Togo</option>
<option value="Tokelau">Tokelau</option>
<option value="Tonga">Tonga</option>
<option value="Trinidad and Tobago">Trinidad and Tobago</option>
<option value="Tunisia">Tunisia</option>
<option value="Turkey">Turkey</option>
<option value="Turkmenistan">Turkmenistan</option>
<option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Uganda">Uganda</option>
<option value="Ukraine">Ukraine</option>
<option value="United Arab Emirates">United Arab Emirates</option>
<option value="United Kingdom">United Kingdom</option>
<option value="United States">United States</option>
<option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
<option value="Uruguay">Uruguay</option>
<option value="Uzbekistan">Uzbekistan</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Venezuela">Venezuela</option>
<option value="Viet Nam">Viet Nam</option>
<option value="Virgin Islands, British">Virgin Islands, British</option>
<option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
<option value="Wallis and Futuna">Wallis and Futuna</option>
<option value="Western Sahara">Western Sahara</option>
<option value="Yemen">Yemen</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabwe">Zimbabwe</option>
</select>

</div>

<div class="top-row">


         <input name="address.street" type="text" required v-model="address.street" placeholder="Street address*"/>

          <input name="address.street" type="text" v-model="address.apt" placeholder="Apt, Unit, Suite, etc (optional)"/>
</div>

<div class="row">
    <input name="address.zip" type="text" required v-model="address.zip" placeholder="Postal / Zip*"/>
         <input name="address.city" type="text" required v-model="address.city" placeholder="City*"/>

         <select name="state" id="state" required v-model="address.state">
   <option value="" selected="selected">Select a State*</option>
   <option value="AL">Alabama</option>
   <option value="AK">Alaska</option>
   <option value="AZ">Arizona</option>
   <option value="AR">Arkansas</option>
   <option value="CA">California</option>
   <option value="CO">Colorado</option>
   <option value="CT">Connecticut</option>
   <option value="DE">Delaware</option>
   <option value="DC">District Of Columbia</option>
   <option value="FL">Florida</option>
   <option value="GA">Georgia</option>
   <option value="HI">Hawaii</option>
   <option value="ID">Idaho</option>
   <option value="IL">Illinois</option>
   <option value="IN">Indiana</option>
   <option value="IA">Iowa</option>
   <option value="KS">Kansas</option>
   <option value="KY">Kentucky</option>
   <option value="LA">Louisiana</option>
   <option value="ME">Maine</option>
   <option value="MD">Maryland</option>
   <option value="MA">Massachusetts</option>
   <option value="MI">Michigan</option>
   <option value="MN">Minnesota</option>
   <option value="MS">Mississippi</option>
   <option value="MO">Missouri</option>
   <option value="MT">Montana</option>
   <option value="NE">Nebraska</option>
   <option value="NV">Nevada</option>
   <option value="NH">New Hampshire</option>
   <option value="NJ">New Jersey</option>
   <option value="NM">New Mexico</option>
   <option value="NY">New York</option>
   <option value="NC">North Carolina</option>
   <option value="ND">North Dakota</option>
   <option value="OH">Ohio</option>
   <option value="OK">Oklahoma</option>
   <option value="OR">Oregon</option>
   <option value="PA">Pennsylvania</option>
   <option value="RI">Rhode Island</option>
   <option value="SC">South Carolina</option>
   <option value="SD">South Dakota</option>
   <option value="TN">Tennessee</option>
   <option value="TX">Texas</option>
   <option value="UT">Utah</option>
   <option value="VT">Vermont</option>
   <option value="VA">Virginia</option>
   <option value="WA">Washington</option>
   <option value="WV">West Virginia</option>
   <option value="WI">Wisconsin</option>
   <option value="WY">Wyoming</option>
 </select>


   </div>

   <br>

   <label for="card">Card info:</label>
  <card class='stripe-card'
  id="card"
    :class='{ complete }'
    stripe='pk_live_KRoao3HQiiGM5hQqKEDMfius'
    :options='stripeOptions'
    @change='complete = $event.complete'
  />

 <button class='pay-with-stripe' @click='pay'>pay with credit card</button>
<span style="color:red; margin-top: 10px;" v-show="error"> {{ error }}</span>
       </div>

       <div v-else class="statussubmit">
  <div v-if="status === 'failure'">
    <h3>Oh No!</h3>
    <p>Something went wrong!</p>
  </div>
<div v-else class="loadercontainer">
    <h2>One moment...</h2>
    <loader></loader>
  </div>
      </div>

           </div>

        </div>





</template>
<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import Loader from './Loader.vue'
import axios from 'axios'
export default {
data(){
    return {
      error: '',
      err: false,
      submitted: false,
      complete: false,
      status: '',
          response: '',
          stripeKey: 'pk_live_KRoao3HQiiGM5hQqKEDMfius',
        name: {
          first: '',
          last: ''
        },
        phone: '' || null,
        stripeEmail: '',
        address: {
          country: '',
            street: '',
            apt: '',
            city: '',
            state: '',
            zip: ''
        },


          type: '',
          length: '',
          size: '',
          beads: [],
          design: '',
          material: {},
          clasp: '',
          emailSent: false,
          emailSuccess: false

    }
},

props: {
  totalPrice: {
    type: [Number, String],
    default: '5000'
  },
  success: {
    type: Boolean,
    default: false
  },
  selectedType: String,
  necklaceLength: Number,
  braceletLength: Number,
  braceletSize: String,
  selectedMaterial: Object,
  selectedClasp: String,
  templateBeads: Array,
  dataURL: String,
  notes: String

},

name: 'Checkout',

components: {
  Card,
  Loader
},

computed: {

  cartBeads(){

    var arr = [];
    this.templateBeads.forEach((bead) => {
        let cartBead = {};

        cartBead.stone = bead.stone;
        cartBead.size = bead.size + 'mm';
        cartBead.quantity = bead.quantity;

        arr.push(cartBead);

    })

    return arr;
  },



},

methods: {

  showErr(){
    return this.err = true;
  },
      pay () {

        if(this.stripeEmail === '' || this.name.first === '' || this.name.last === '' || this.address.country === '' || this.address.street === '' || this.address.city === '' || this.address.state === '' || this.address.zip === ''){

        this.showErr();
          this.error = 'Please fill out all fields marked with *'
        } else {

          createToken().then(data => {
              this.submitted = true;
              console.log(data.token);

              axios.post('https://sanodesigns-server.herokuapp.com/charge', {
                stripeEmail: this.stripeEmail,
                stripeToken: data.token.id,
                stripeAmt: Math.round(this.totalPrice * 100),
                name: this.name,
                address: this.address,
                phone: this.phone,

                  type: this.selectedType,
                  length: this.necklaceLength || this.braceletLength,
                  size: this.braceletSize,
                  clasp: this.selectedClasp,
                  notes: this.notes,
                  material: this.selectedMaterial.type,
                  color: this.selectedMaterial.color,
                  beads: 'Sent to your email.',
                  designImage: 'Sent to your email.'

              },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
            .then(response => {
              this.status = 'success';
              this.$emit('successSubmit');
              this.sendEmail();
            })
            .catch(error => {
              this.status = 'failure';
            });
          });

        }
      },

        sendEmail: function(){

          let cartBeads = this.cartBeads;
          var beadsString = JSON.stringify(cartBeads);

            var data = {
              stripeAmt: this.totalPrice,
              name: this.name,
              address: this.address,
              phone: this.phone,
              email: this.stripeEmail,

                type: this.selectedType,
                length: this.necklaceLength || this.braceletLength,
                size: this.braceletSize,
                clasp: this.selectedClasp,
                notes: this.notes,
                material: this.selectedMaterial.type,
                color: this.selectedMaterial.color,
              beads: beadsString,
              designImage: this.dataURL
            };

            axios.post('https://sanodesigns-server.herokuapp.com/send', data).then((response) => {
              if(response){
                this.$emit('emailYes');
                this.emailSent = true;
                this.emailSuccess = true;
              }
            }).catch((error) => {
              console.log(error);
              if(error){
                this.$emit('emailNo');
                this.emailSent = true;
                this.emailSuccess = false;
              }
            })

          }
        }

}




</script>
<style>


.checkout {
display: grid;

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

       background-color: #F7F8F9;
          box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
        padding: 30px;
        width: 650px;
         border: 1px solid transparent;
        border-radius: 6px;

    }

    .payment p {
      color: #ad81c0;
      font-weight: 600;
    }

    .payment input {
    padding: 8px 12px;
    font-size: 15px;
    line-height: 21px;
        margin: 5px;
    font-family: 'Karla';
    border: 1px solid #b8b8b8;
    border-radius: 6px;
    }

.required-field {
    border: 1px solid red;
}


    .payment input::placeholder {
      color:#676767;
      font-size: 14px;
      line-height: 21px;
    }

  .required-field {
    border: 1px solid red;
  }

    .payment label {
color: #ad81c0;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: 600;
    }

    select {


  padding: 8px 12px;
      font-family: 'Karla';

  font-size: 14px;
  line-height: 21px;
  border: 1px solid #ccc;
height: 40px;
  background-color: #fff;

    }

     .row {


width: 100%;
}

#country {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 98%;
}

    .top-row {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 0;
        width: 100%;
    }

    .stripe-card {
      border: 1px solid #b8b8b8;

      border-radius: 6px;

      padding: 8px 12px;
    margin: 10px 0px 0px 0px;
    background-color: #fff;
    }


    .pay-with-stripe {
      border: 1px solid #000;
      border-radius: 2px;
      background-color: #000;
      padding: 14px 22px;
      margin-top: 20px;
      margin-right: auto;
      margin-left: auto;
      text-align: center;
      font-family: 'Karla';
      font-size: 16px;
      line-height: 23px;
      text-transform: uppercase;
      color: #d9d9d9;
      font-weight: 400;
      cursor: pointer;

      opacity: 1;
      width: 250px;
    }


</style>
