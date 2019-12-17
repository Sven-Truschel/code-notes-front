<template>
    <div>
        <b-container>
<b-row>
    <b-col>
        <div class='form wrapper'>
       Title: <b-form-input v-model="title" ></b-form-input>
        Tag: <b-form-input type="text" v-model="langtag" ></b-form-input>
        {{message}}
         <trumbowyg v-model="content" :config="config" class="form-control" name="content"></trumbowyg>
        <b-button @click="create">Create</b-button>
         </div>
    </b-col>
</b-row>
        </b-container>
    </div>



</template>


<script>
/* eslint-disable */
import axios from 'axios';
import Trumbowyg from 'vue-trumbowyg';
import 'trumbowyg/dist/ui/trumbowyg.css';
import preformatted from 'trumbowyg/dist/plugins/preformatted/trumbowyg.preformatted.min.js'

export default {

    name: 'Create',
    data() {
        return {
          content: null,
          config: {
              autogrow: true,
              btns: [
                'viewHTML',
                'preformatted',
                'undo',
                'redo',
                'strong',
                'em',
                'link',
                'formatting',
                'strong',
                'fullscreen',
                'orderedList',
                'unorderedList',
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'justifyFull'
                ],

          },
          title: '',
          notecontent: '',
          message: '',
          langtag: ''
        }
    },
    components:{
        Trumbowyg
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
           axios.post('http://localhost:3000/notes', newNote, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res =>{
               this.message = res.data.message
               this.$router.push('/');
           }
           )
           .catch(err => {
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