<template>
    <div>
        <q-input filled v-model="title" clearable label="Title" :dense="dense" style="margin-bottom: 15px;" />
        <q-input filled v-model="langtag" clearable label="Tag" :dense="dense" />
<q-separator  style="margin-bottom: 15px; margin-top: 15px;"/>


<ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>


<q-btn style="margin-top: 15px; margin-right: 5px;" icon="cancel" color="red" label="Cancel" to='/' />
<q-btn style="margin-top: 15px;" icon="send" color="primary" label="Edit Note" @click="edit"/>

{{message}}
    </div>
</template>


<script>
/* eslint-disable */
    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

    import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
    import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default {

    name: 'Edit',
    data() {
        return {
          content: null,
          title: '',
          notecontent: '',
          message: '',
          langtag: '',
          id: this.$route.params.id,
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
    created(){
      if  (localStorage.getItem('token') === null){
          this.$router.push('/login')
      }
    },
        mounted(){
        this.$http.get('/notes/'+this.id,{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res => {
            this.title = res.data.title
            this.langtag = res.data.langtag
            this.content = res.data.content

        })

        this.name = localStorage.getItem('user')


    },
    methods: {
        edit() {
            const editNote = [
                { propName:'title', value: this.title,},
                { propName:'content', value: this.content,},
                { propName:'langtag', value: this.langtag,},
            ]
            if (editNote.langtag === ''){
                editNote.langtag = undefined
            }
           this.$http.patch('/notes/'+this.id, editNote, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res =>{
               this.message = res.data.message
               this.$router.push('/');
           }
           )
           .catch(err => {
               if (this.message == 'Error: Request failed with status code 401') {
                   this.$router.push('/login')
               }
           })
        }

    }
}
</script>

<style>
input {
  display: block;
}

pre {
  color: rgb(213, 206, 217) !important;
  background-color: rgb(35, 38, 46);
  font-size: 20px;
  line-height: 27px;
  white-space: pre;
}

.form-control{
    width: 20%!important;
}
</style>