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
                  :value="movieName"
                  @input="updateSearch"
          />
          <button id='search-button' class='rd-btn btn-search' :disabled="disableState" @click="handleClick">
            Search
          </button>
          <br />
        </p>
        <p id='msg'>{{ msg }}</p>
      </main>
      <section id='poster-grid' class='poster-grid'>
        <img v-for="movie in posters" :key="movie.Title" :src="movie.Poster" :alt="movie.Title">
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
        disableState: true,
        movieName: '',
        msg: '',
        apiKey: '12fc1f3f',
        posters: {},
      }
  },
    methods: {
        setMsg(msg) {
            this.msg = msg;
        },
        setPosters(posters) {
            this.posters = posters;
        },
        updateSearch(e) {
            let value = e.target.value;
            this.disableState = value.length < 3;
            this.movieName = value;
        },
        handleClick(e) {
            e.preventDefault();
            this.setMsg('Searching...');
            fetch(
                `http://www.omdbapi.com/?s=${encodeURIComponent(this.movieName)}&apikey=${this.apiKey}`
            )
                .then(resp => resp.json())
                .then(result => {
                    this.setPosters(result.Search);
                    this.setMsg('');
                })
                .catch(error => {
                    throw error
                })
        }
    },
}
</script>

<style lang="scss">
  @import '@/assets/scss/templates/search.scss';
</style>
