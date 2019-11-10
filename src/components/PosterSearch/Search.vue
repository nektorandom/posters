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
									:value="movieName"
									@input="updateSearch"
									class='searchBox'
									data-test-id="movie-input"
									id='movie-name'
									name='movie-name'
									placeholder='enter the name of a movie'
									type='search'
					/>
					<button :disabled="disableState" @click="handleClick" class='rd-btn btn-search' id='search-button'>
						Search
					</button>
					<br />
				</p>
				<p id='msg'>{{ msg }}</p>
			</main>
			<section class='poster-grid' id='poster-grid'>
				<img :alt="movie.title" :key="movie.title" :src="movie.poster" v-for="movie in posters">
			</section>
		</section>
	</div>
</template>

<script>
	import mixin from './mixin'

	export default {
		mixins: [
			mixin,
		],
	}
</script>

<style lang="scss">
	@import '@/assets/scss/templates/search.scss';
</style>
