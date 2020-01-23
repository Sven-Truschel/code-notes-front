<template>
    <div>
<div class="wrapper">
       <q-input filled v-model="email" clearable label="Email" :dense="dense" style="margin-top: 15px; max-width: 300px;" />
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

export default {
name: 'Login',
    data() {
        return{
            email: '',
            password: '',
            message: ''
        }
    },
    methods: {
        login() {
            let user = {
                email: this.email,
                password: this.password
            }
            this.$http.post('/users/login', user).then(res => {
                if(res.status == 200){
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', res.data.username)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('UID', res.data.userId)
                    this.$router.push('/');
                }
                console.log(res)
                this.message = res.data.message
            })
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