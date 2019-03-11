<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
    font-size : 5.5px;
}
@media only screen and (min-width: 401px){
    html {
        font-size: 6.3px !important;
    }
}
@media only screen and (min-width: 428px){
    html {
        font-size: 6.7px !important;
    }
}
@media only screen and (min-width: 481px){
    html {
        font-size: 7.5px !important; 
    }
}
@media only screen and (min-width: 569px){
    html {
        font-size: 8.9px !important; 
    }
}
@media only screen and (min-width: 641px){
    html {
        font-size: 10px !important; 
    }
}
</style>
