<template>
    <div>
        <q-input filled v-model="title" clearable label="Title" :dense="dense" style="margin-bottom: 15px;" />
        <q-input filled v-model="langtag" clearable label="Tag" :dense="dense" />
<q-separator  style="margin-bottom: 15px; margin-top: 15px;"/>


<ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>



<q-btn style="margin-top: 15px; margin-right: 5px;" icon="cancel" color="red" label="Cancel" to='/' />
<q-btn style="margin-top: 15px;" icon="send" color="primary" label="Add Note" @click="create"/>

{{message}}
    </div>
</template>


<script>
/* eslint-disable */
    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import AuthService from '@/services/AuthService.js';
    import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
    import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';


export default {

    name: 'Create',
    data() {
        return {
          content: '',
          title: '',
          notecontent: '',
          message: '',
          langtag: '',
          dense: '',
          editorConfig: {
              plugins: [
                  EssentialsPlugin,
                  BoldPlugin,
                  ItalicPlugin,
                  LinkPlugin,
                  ParagraphPlugin,
                  CodeBlock
              ],
              toolbar: {
                  items: [
                      'bold',
                      'italic',
                      'link',
                      'undo',
                      'redo',
                      'codeBlock'
                  ]
              }

          },
          editor: ClassicEditor
        }
    },
    async created(){
          if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    },
    methods: {
        create() {
            const newNote = {
               title: this.title,
               content: this.content,
                username: this.$store.state.user.username,
               langtag: this.langtag
            }
            if (newNote.langtag === ''){
                newNote.langtag = undefined
            }
            console.log(newNote);
           this.$http.post('/notes', newNote, {headers: {Authorization: 'Bearer ' + this.$store.state.token}}).then(res =>{
               this.message = res.data.message
               this.$router.push('/');
           }
           )
           .catch(err => {
               this.message = err
               if (this.message == 'Error: Request failed with status code 401') {
                   this.$router.push('/login')
               }
           })
        },

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