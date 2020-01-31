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
<q-expansion-item
        expand-separator
        icon="filter_list"
        label="Categories"

      >
        <q-card clickable v-ripple v-bind:class="{active: filter === 'all' }" @click="filter = 'all'" >
          <q-card-section>
All
          </q-card-section>
                  <q-separator />

        </q-card>

                <q-card  clickable v-ripple v-for="(tag, index) in tags" v-bind:key='index' v-bind="tags" v-bind:class="{active: filter === tag.langtag }" @click="filter = tag.langtag">
          <q-card-section>
{{tag.langtag}}
          </q-card-section>
        <q-separator />
        </q-card>

      </q-expansion-item>


      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Settings"
      >
        <q-card>
          <q-card-section>
<q-toggle label="Dark mode" v-model="toggleDark"  />

          </q-card-section>

                  <q-card-section>

<q-btn unelevated round color="black" icon="exit_to_app" @click="logout"/>
                  </q-card-section>
        </q-card>


      </q-expansion-item>


    </q-drawer>

    <q-page-container>
        <q-container name="main">
      <q-page padding>
      <router-view />
          </q-page>
  </q-container>

    </q-page-container>

  </q-layout>

</template>



<script>
 /* eslint-disable */
import AuthService from '@/services/AuthService.js';
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
 mounted(){

            this.$http.get('/users/tags/'+this.$store.state.user.user,{headers: {Authorization: 'Bearer ' + this.$store.state.user}}).then(res => {
              this.tags = res.data
        })
  },

  methods: {
     logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
  watch: {
    toggleDark: function(toggleDark){
      if (this.toggleDark == true) {
        this.$q.dark.set(true)
      }else{
        this.$q.dark.set(false)
      }
    },
    $route: function(){
            this.$http.get('/users/tags/'+this.$store.state.user.user,{headers: {Authorization: 'Bearer ' + this.$store.state.user}}).then(res => {
              this.tags = res.data
        })
    }
  }
  }

</script>
<style>
.my-card{
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}

.body--dark{
  color: white;
}
</style>
