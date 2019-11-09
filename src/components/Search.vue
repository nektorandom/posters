<template>
  <div class="">
    <section class='poster-search'>
      <header class='header'>
        <h1>{{ title }}</h1>
        <h3>Find your favourite movie posters.</h3>
      </header>
      <main>
        <p>
          <label class='label' for='movie-name'></label>
          <input
                  class='searchBox'
                  type='search'
                  id='movie-name'
                  name='movie-name'
                  placeholder='enter the name of a movie'
                  data-test-id="movie-input"
          />
          <button id='search-button' class='rd-btn btn-search'>
            Search
          </button>
          <br />
        </p>
        <p id='msg'></p>
      </main>
      <section id='poster-grid' class='poster-grid'>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
      title: String
  },
  data() {
    return {

      }
  },
    methods: {

    },
}
</script>

<style lang="scss">
  @import '@/assets/scss/templates/search.scss';
</style>
