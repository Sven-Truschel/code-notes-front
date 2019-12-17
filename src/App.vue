<template>
<div>
  <router-view></router-view>
</div>
</template>



<script>

export default {
    name: 'App',
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa|Montserrat&display=swap');
body{
  background-color: #287180!important;

}
h1, h2, h3, h4{
  font-family: 'Comfortaa', cursive;
}
*{
  font-family: 'Montserrat', sans-serif;
}

.trumbowyg-editor{
  background-color: #fff;
}
.trumbowyg-box{
  max-width: 80rem;
}


</style>