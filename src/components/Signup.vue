
<template>
    <div>
       <q-input filled v-model="name" clearable label="Username" :dense="dense" style="margin: 0px auto 15px auto; max-width: 300px;" />
       <q-input filled v-model="password" clearable label="Password" type="password" :dense="dense" style="margin: 0px auto 15px auto; max-width: 300px;" />


        <br />

        <q-btn icon="send" style="margin: 0px auto 0px auto; display: block; width: 300px" color="primary" label="Sign up" @click="signUp"/>

        <br />
        {{message}}
    </div>
</template>

<script>
/* eslint-disable */
import AuthService from '@/services/AuthService.js'
export default {

    name: 'Signup',
    data() {
        return {
            name: '',
            password: '',
            message: ''

        }
    },
    methods: {
        signupold() {
            const newUser = {
               username: this.name,
               password: this.password
            }

           this.$http.post('users/signup', newUser).then(res =>{
               this.message = 'Succesfully created user'
               this.message = res.data.message
               this.$router.push('/login');

           }
           ).catch(err => {
               console.log(err)
               this.message = err
           })
        },
        async signUp() {
            try {
                const credentials = {
                    username: this.name,
                    password: this.password,
                };
                const response = await AuthService.signUp(credentials);
                this.message = response.message;
                this.$router.push('/login');
            }catch (error) {
                this.message = error.response.data.message
            }
        }

    }
}
</script>

<style>
input{
    display: block;
}
</style>