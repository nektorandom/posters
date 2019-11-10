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
            fetch(
                `http://www.omdbapi.com/?s=${encodeURIComponent(this.movieName)}&apikey=${this.apiKey}`
            )
                .then(resp => resp.json())
                .then(result => {
                    if (result.Response === 'True') {
                        let posters = result.Search.map(movie => {
                            return {
                                Title: movie.Title,
                                Year: movie.Year,
                                imdbID: movie.imdbID,
                                Type: movie.Type,
                                Poster: movie.Poster === 'N/A' ? `https://via.placeholder.com/300x468?text=${encodeURIComponent(movie.Title)}` : movie.Poster,
                            }
                        });
                        this.setPosters(posters);
                        this.setMsg(`Now showing the first ${result.Search.length} result of ${result.totalResults}`);
                    } else {
                        if (result.Error === 'Movie not found!') {
                            this.setMsg('Sorry, we couldn\'t find that one. Please try again.');
                        } else {
                            this.setMsg(result.Error);
                        }
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
