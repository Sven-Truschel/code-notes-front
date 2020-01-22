<template>
  <q-layout view="hHh LpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn  icon="menu" @click="left = !left" />


        <q-toolbar-title>

          Codenotes
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay behavior="mobile" elevated>

  <q-item to="/create" exact>
  <q-item-section avatar>
    <q-icon name="note_add" />
  </q-item-section>

  <q-item-section>
    New Note
  </q-item-section>
</q-item>
<q-item-section>
  Categories
</q-item-section>

<q-list dense bordered separator>

<q-item clickable v-ripple v-bind:class="{active: filter === 'all' }" @click="filter = 'all'">
  All
</q-item>

<q-item clickable v-ripple v-for="(tag, index) in tags" v-bind:key='index' v-bind:class="{active: filter === tag.langtag }" @click="filter = tag.langtag">
  {{tag.langtag}}
</q-item>

</q-list>

<q-item-section>
  Settings
</q-item-section>
<q-list>
  <q-item>
<q-toggle label="Dark mode" v-model="toggleDark"  />

  </q-item>
</q-list>
    </q-drawer>

    <q-page-container>
        <q-container>
      <q-page padding>
      <router-view />
          </q-page>
  </q-container>

    </q-page-container>

  </q-layout>

</template>



<script>

export default {
    name: 'App',
    data () {
    return {
      left: false,
      tags: null,
      filter: 'all',
      toggleDark: false
    }
  },
  updated(){
    /* eslint-disable */

            this.$http.get('/users/tags/'+localStorage.getItem('UID'),{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res => {
            this.tags = res.data
        })
  },
  methods: {},
  watch: {
    toggleDark: function(toggleDark){
      if (this.toggleDark == true) {
        this.$q.dark.set(true)
      }else{
        this.$q.dark.set(false)
      }
    },
  }
  }

</script>
