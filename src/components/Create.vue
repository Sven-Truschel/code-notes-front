<template>
    <div>
        <q-input filled v-model="title" clearable label="Title" :dense="dense" style="margin-bottom: 15px;" />
        <q-input filled v-model="langtag" clearable label="Tag" :dense="dense" />
<q-separator  style="margin-bottom: 15px; margin-top: 15px;"/>

<q-editor v-model="content" min-height="10rem"
:toolbar="[
  ['bold', 'italic', 'strike', 'underline', 'code'],
  ['token', 'hr', 'link'],
  ['fullscreen']
]" />



<q-btn style="margin-top: 15px; margin-right: 5px;" icon="cancel" color="red" label="Cancel" to='/' />
<q-btn style="margin-top: 15px;" icon="send" color="primary" label="Add Note" @click="create"/>


    </div>
</template>


<script>
/* eslint-disable */
export default {

    name: 'Create',
    data() {
        return {
          content: '',
          title: '',
          notecontent: '',
          message: '',
          langtag: '',
          dense: ''
        }
    },
    created(){
      if  (localStorage.getItem('token') === null){
          this.$router.push('/login')
      }
    },
    methods: {
        create() {
            const newNote = {
               title: this.title,
               content: this.content,
               email: localStorage.getItem('email'),
               langtag: this.langtag
            }
            if (newNote.langtag === ''){
                newNote.langtag = undefined
            }
            console.log(newNote);
           this.$http.post('/notes', newNote, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res =>{
               this.message = res.data.message
               this.$router.push('/');
           }
           )
           .catch(err => {
               console.log(err)
               this.message = err
           })
        },
        // codeBlock(){
        //     console.log(this.$children[3].value)

        //     this.$children[3].value = '<pre><code>' + this.$children[3].value + '</code></pre>'
        // }

    }
}
</script>

<style>
input{
    display: block;
}

pre {
    color: rgb(213, 206, 217)!important;
    background-color: rgb(35, 38, 46);
    font-size: 20px;
    line-height: 27px;
    white-space: pre
}
.form-control{
    width: 20%!important;
}


</style>