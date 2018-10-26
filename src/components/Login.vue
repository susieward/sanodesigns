<template>
<div>


            <form class="login" @submit.prevent="login">
            <input type="text" name="username" required v-model="username" placeholder="Username"/>
            <input type="password" name="password" required v-model="password" placeholder="Password"/>
                 <button class="btn-small" type="submit">login</button>
            </form>

    <p style="color:red" v-show="errorText"> {{ errorText }}</p>

</div>


</template>
<script>
import axios from 'axios'
export default {
name: 'Login',


data() {
    return {

        username: '',
        password: '',
        errorText: ''
    }
},


methods: {


    login: function () {

        axios.post('https://sanodesigns-server.herokuapp.com/login', {
            username: this.username,
            password: this.password
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }

        }).then(response =>{
            this.$store.commit('AUTH_SUCCESS', { token: response.data.token });
            this.$router.push('/admin');
            }).catch(error => {
            this.errorText = error.response.data.message;

    })
    }


}
}


</script>
<style>


.error {
margin-top: 20px;
}

.login{
display: grid;
grid-gap: 25px;
width: 350px;
height: 220px;
justify-content: center;
align-content: center;
padding: 30px;
border-radius: 8px;
margin: auto;
}

.login input {
padding: 6px 12px;
  border: 1px solid #C4A8D1;
font-size: 16px;
}

</style>
