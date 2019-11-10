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
        <img v-for="movie in posters" :key="movie.title" :src="movie.poster" :alt="movie.title">
      </section>
    </section>
  </div>
</template>

<script>
  import findMovies from './find-movies';

  export default {
    name: 'Search',
    props: {
        title: String
    },
    data() {
      return {
          minLength: 3,
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
              this.disableState = value.length < this.minLength;
              this.movieName = value;
          },
          handleClick(e) {
              e.preventDefault();
              this.setMsg('Searching...');
              findMovies({movieTitle: this.movieName})
                  .then(results => {
                      if (results.error) {
                          this.setMsg(results.error)
                      } else if (results.movies.length === 0) {
                          this.setMsg('Sorry, we couldn\'t find that one. Please try again.')
                      } else {
                          this.setMsg(`Now showing the first ${results.movies.length} result of ${results.total}`);
                          this.setPosters(results.movies);
                          this.disableState = false;
                      }
                  })
                  .catch(() => {
                      this.setMsg('Something went wrong. Please try again later.');
                  })
          }
      },
      mounted() {
        this.setMsg(`Enter at least ${this.minLength} letters from the movie's title`);
      }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/templates/search.scss';
</style>
