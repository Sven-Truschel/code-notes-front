<template>

<div>



<p class='emptymessage' v-if="notes == 0">You don't have any notes yet, Click <a href="/create">here</a> to create one! </p>

    <q-card class="my-card" style="margin-bottom: 20px;" v-for="(note, index) in notesFiltered" v-bind:key="note._id">
      <q-card-section>
        <div class="text-h6 text-center">
          {{note.title}}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="text-center"  v-html="note.content" style="overflow-wrap: break-word;">
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat round color="primary" icon="delete" @click="deleteNote(index)" />
        <q-btn flat round color="primary" icon="edit" :to="{ name: 'Edit', params: { id: note._id } }"/> <!-- todo -->
        <!-- <q-btn flat round color="primary" icon="share" /> todo -->
      </q-card-actions>
    </q-card>






</div>
</template>

<script>
/* eslint-disable */

import 'prismjs/themes/prism.css'
import 'prismjs'
import AuthService from '@/services/AuthService.js';

export default {
    name: 'Landing',
    data() {
        return {
            name: '',
            notes:[{}],
            tags:[{}],
            username: ''
        }
    },
   async created(){
      // if  (localStorage.getItem('token') === null){
      //     this.$router.push('/login')
      // }
          if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }



    },
    computed: {
      notesFiltered(){
        if (this.$parent.$parent.$parent.$parent.filter == 'all'){
          return this.notes
        }else{
          return this.notes.filter(note => note.langtag == this.$parent.$parent.$parent.$parent.filter)
        }
      },
    },
    methods: {


        deleteNote(index){
          // console.log(index)
          let noteId = this.notes[index]._id
          // console.log(this.notes[index]._id)
          this.notes.splice(index, 1)
          this.$http.delete('/notes/'+noteId, {headers: {Authorization: 'Bearer ' + this.$store.state.token}} ).then(res => {
            console.log(res);
          })

        },

    },
    mounted(){
        this.$http.get('/users/'+this.$store.state.user.user,{headers: {Authorization: 'Bearer ' + this.$store.state.token}}).then(res => {
console.log(res.data)
            this.notes = res.data.notes
        })

    }

}
</script>

<style>

</style>