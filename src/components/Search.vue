<template>
  <div class="hello">

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

<style scoped>
  body {
    font-size: 16px;
  }

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

input {
  font-size: 18px;
  line-height: 40px;
  height: 40px;
  width: 400px;
}

.rd-btn {
  cursor: pointer;
  position: relative;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  white-space: nowrap;
  color: #fff;
  background: #42b983;
  border: none;
  box-sizing: border-box;
  line-height: 40px;
  height: 40px;
  padding: 0 32px;
  overflow: hidden;
  opacity: 1;
  transition: background-color .3s, opacity .3s;
  font-size: 16px;

  text-rendering: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

  .rd-btn:hover {
     background: #45c28a;
   }

  .rd-btn:disabled {
    background: #b4b4b4;
  }

  .btn-search {
    margin-left: 10px;
  }

  .poster-search {
    max-width: 1200px;
    margin: 0 auto;
  }

  .poster-grid {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .poster-grid  img {
    width: 24%;
    object-fit: cover;
    margin-bottom: 10px;
    margin-right: 16px;
  }

  .poster-grid  img:nth-of-type(4n) {
    margin-right: 0;
  }
</style>
