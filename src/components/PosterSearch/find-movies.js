// findMovies    :: movieTitle -> movies[]

export function buildMovieQuery({movieTitle}) {
  return {
    method: 'GET',
    url: 'https://www.omdbapi.com/',
    params: {
      s: movieTitle,
      apikey: '12fc1f3f'
    }
  }
}

export function normalizeMovieResults(results) {
  if (results.Error === 'Movie not found!') {
    return {
      total: 0,
      movies: [],
    }
  }

  if (results.Response === 'False') {
    return {
      error: results.Error
    }
  }

  return {
    total: results.totalResults,
    movies: result.Search.map(movie => ({
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
      type: movie.Type,
      poster: movie.Poster === 'N/A' ? null : movie.Poster,
    }))
  }
}
