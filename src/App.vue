<template>
  <div id="app">
    <SearchBlock/>
  </div>
</template>

<script>
import SearchBlock from './components/PosterSearch/Search.vue'

export default {
  name: 'app',
  components: {
    SearchBlock
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
