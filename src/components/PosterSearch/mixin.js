import findMovies from './find-movies';

export default {
	props: {
		title: String
	},
	data() {
		return {
			minLength: 3,
			disableState: true,
			movieName: '',
			msg: '',
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
