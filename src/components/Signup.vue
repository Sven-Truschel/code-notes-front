
<template>
    <div>
        E-mail: <input type="text" v-model="email" />
        Password: <input type="password" v-model="password" />
        <br />
        <button @click="signup">Signup</button>
        <br />
        {{message}}
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {

    name: 'Signup',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            message: ''

        }
    },
    methods: {
        signup() {
            const newUser = {
               email: this.email,
               password: this.password
            }
           axios.post('http://localhost:3000/users/signup', newUser).then(res =>{
               this.message = 'Succesfully created user'
               this.message = res.data.message
               this.$router.push('/login');

           }
           ).catch(err => {
               console.log(err)
               this.message = err
           })
        }

    }
}
</script>

<style>
input{
    display: block;
}
</style>