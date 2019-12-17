<template>

<div>
  <b-navbar toggleable="lg" type="dark" variant="info" id="navbar">
    <b-navbar-brand href="#">CodeNotes</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item  to="Create">New Note</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{name}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-row>
    <b-col cols="12" sm="2">

  <b-list-group>
  <b-list-group-item v-bind:class="{active: filter === 'all' }" @click="filter = 'all'">All</b-list-group-item>
  <div v-for="tag in tags" v-bind:key="tag.langtag">

  <b-list-group-item  v-bind:class="{active: filter === tag.langtag }" @click="filter = tag.langtag">{{tag.langtag}}</b-list-group-item>
  </div>
</b-list-group>

  </b-col>



<b-col>
<ul id="notes">

<li v-for="(value, index) in notesFiltered" v-bind:key="value._id">
  <b-card
    :title="value.title"
    style="max-width: 40rem;"
    class="mb-2"
  >
  <font-awesome-icon @click="deleteNote(index)" id='deletenote' icon="trash-alt" />
   <router-link :to="{ name: 'Edit', params: { id: value._id } }"><font-awesome-icon  id='updatenote' icon="pen" /></router-link>

    <b-card-text v-html="value.content">
      <!-- {{value.content}} -->
    </b-card-text>
  </b-card>
  </li>
</ul>
</b-col>
  </b-row>





</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
    name: 'Landing',
    data() {
        return {
            name: '',
            email: '',
            notes:[{}],
            tags:[{}],
            filter: 'all',
        }
    },
    created(){
      if  (localStorage.getItem('token') === null){
          this.$router.push('/login')
      }
    },
    computed: {
      notesFiltered(){
        if (this.filter == 'all'){
          return this.notes
        }else{
          return this.notes.filter(note => note.langtag == this.filter)
        }
      }
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
          axios.delete('http://localhost:3000/notes/'+noteId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}} ).then(res => {
            console.log(res);
          })

        }
    },
    mounted(){
        axios.get('http://localhost:3000/users/'+localStorage.getItem('UID'),{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res => {
            // console.log(res)
            this.notes = res.data.notes
        })

        this.name = localStorage.getItem('user')

        axios.get('http://localhost:3000/users/tags/'+localStorage.getItem('UID'),{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res => {
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