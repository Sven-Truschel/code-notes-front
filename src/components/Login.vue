<template>
    <div>
<div class="wrapper">
       <q-input filled v-model="username" clearable label="Username" :dense="dense" style="margin-top: 15px; max-width: 300px;" />
       <q-input filled v-model="password" clearable label="Password" type="password" :dense="dense" style="margin-top: 15px; max-width: 300px;" />
<a href="/signup" style="font-size: 13px;">Don't have an account yet? Click here to sign up!</a>

        <q-btn icon="send" style="display: block; width: 300px; margin-top: 15px;" color="primary" label="Login" @click="login"/>

        <br>
       <p v-if="message"> {{message}}</p>
       </div>
    </div>
</template>

<script>
/* eslint-disable */
import AuthService from '@/services/AuthService.js'

export default {
name: 'Login',
    data() {
        return{
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        async login() {
            try{
                const credentials = {
                    username: this.username,
                    password: this.password
                };
                const response = await AuthService.login(credentials);
                this.message = response.message
                const token = response.token

                const user = {user: response.userId, username: response.username}

                this.$store.dispatch('login', {token, user});
                this.$router.push('/');
            } catch(error){
                this.message = error.message
            }
        }
    }
}
</script>
<style>
input{
    display: block;
}
.wrapper{
    margin-left: auto;
    margin-right: auto;
    max-width: 300px;
}
</style>