<template>

<div>





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
        <q-btn flat round color="primary" icon="share" /> <!-- todo -->
      </q-card-actions>
    </q-card>






</div>
</template>

<script>
/* eslint-disable */

import 'prismjs/themes/prism.css'
import 'prismjs'
export default {
    name: 'Landing',
    data() {
        return {
            name: '',
            email: '',
            notes:[{}],
            tags:[{}],
        }
    },
    created(){
      if  (localStorage.getItem('token') === null){
          this.$router.push('/login')
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
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        },
        deleteNote(index){
          // console.log(index)
          let noteId = this.notes[index]._id
          // console.log(this.notes[index]._id)
          this.notes.splice(index, 1)
          this.$http.delete('/notes/'+noteId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}} ).then(res => {
            console.log(res);
          })

        }
    },
    mounted(){
        this.$http.get('/users/'+localStorage.getItem('UID'),{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res => {
            // console.log(res)
            this.notes = res.data.notes
        })

        this.name = localStorage.getItem('user')

        this.$http.get('/users/tags/'+localStorage.getItem('UID'),{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res => {
            this.tags = res.data
        })
    }

}
</script>

<style>
.card{
      max-width: 80rem!important;
      background-color: #72E4FF!important;
}
.card img{
  max-width: 100%;
}
#deletenote{
 position: absolute;
top: 0%;
right: 1%;
color: black;
margin-top: 5px;

}

#deletenote:hover{
  color: darkred;
}

#updatenote{
 position: absolute;
top: 0%;
right: 4%;
color: black;
margin-top: 5px;

}
#updatenote:hover{
  color: darkred;
}
ul{
    list-style-type: none;
}

.noteWrapper h3{
    margin-top: 0px;
    margin-bottom: 0px;
}

.noteWrapper p {
    margin-top: 0px;
}
#navbar{
    margin-bottom: 15px;
}
#notes{
  margin-right: 15px;
  padding-inline-start: inherit;
}
#tags{
  border: 1px solid black;
  margin-left: 0px!important;
  padding-left: 0px;
}
#tags li{
  text-align: center;

}
#tags p{
  margin-bottom: 5px;

}
.list-group{
  margin-left: 15px;
}
.list-group-item:hover{

  background-color: lightgrey
}
.list-group-item{
  text-align: center;
  background-color: #72E4FF!important;
}
.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff!important;
    border-color: none!important;
}
.active{
  background-color: lightgrey;
}
.col-2{
  margin-left: 15px;

}


</style>