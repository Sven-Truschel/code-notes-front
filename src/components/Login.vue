<template>
    <div>
      Email: <input type="text" v-model="email">
        Password: <input type="password" v-model="password">
        <br/>
        <button @click="login">login</button>
        <br>
        {{message}}
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
</style>