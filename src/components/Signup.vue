
<template>
    <div>
       <q-input filled v-model="email" clearable label="Email" :dense="dense" style="margin: 0px auto 15px auto; max-width: 300px;" />
       <q-input filled v-model="name" clearable label="Username" :dense="dense" style="margin: 0px auto 15px auto; max-width: 300px;" />
       <q-input filled v-model="password" clearable label="Password" type="password" :dense="dense" style="margin: 0px auto 15px auto; max-width: 300px;" />


        <br />

        <q-btn icon="send" style="margin: 0px auto 0px auto; display: block; width: 300px" color="primary" label="Sign up" @click="signup"/>

        <br />
        {{message}}
    </div>
</template>

<script>
/* eslint-disable */

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
           this.$http.post('/signup', newUser).then(res =>{
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