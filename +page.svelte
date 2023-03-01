<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { posts } = data;

	$: console.log(posts);

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date);
	}
</script>

<!--
	goals- 
	all of these things are a layer deeper if the fetch returns a compilation breaking the page. 
	Working on understanding flatmap()
	1.set up a flat map to find how many contributors exist
	2.set up yields to check if compilation or recipe
	3.set up nutritional facts to check if compilation or recipe
	4.set up instructions facts to check if compilation or recipe
	5.set up contributors to check if compilation or recipe

	extra credit: add a random drink suggester
-->

<body>
	<!--Entry phrase: contains recipe info, description and amount of servings-->
	<hgroup>
		<h1>Today is {formatDate(posts.results[0].createdAt)}.</h1>
		<h2>Here is a random recipe to try:</h2>
		<h3>{posts.results[0].name}</h3>
		<p>{posts.results[0].description}</p>
	</hgroup>

	<!--yields can vary between recipe or compilation. needs some love 

	<p>{posts.results[0].yields}</p>



	serving/nutritional facts varies on compilation or solo

	<p>
		Calories: {posts.results[0].nutrition.calories} <br />
		Carbohydrates: {posts.results[0].nutrition.carbohydrates} <br />
		Fat: {posts.results[0].nutrition.fat} <br />
		Fiber: {posts.results[0].nutrition.fiber} <br />
		Protein: {posts.results[0].nutrition.protein} <br />
		Sugar: {posts.results[0].nutrition.sugar}
	</p>
	-->

	<!-- video. can it be loaded on the page? 

	<p><a href={posts.results[0].video_url}>{posts.results[0].video_url}</a></p>
	-->

	<!--solo  Instructions. this works. Kind of. The amount of instruction varies. And if it is a compilation return then the page breaks
	<p>{posts.results[0].instructions[0].display_text}</p>
	<p>{posts.results[0].instructions[1].display_text}</p>
	<p>{posts.results[0].instructions[2].display_text}</p>
	<p>{posts.results[0].instructions[3].display_text}</p>
	<p>{posts.results[0].instructions[4].display_text}</p>
	<p>{posts.results[0].instructions[5].display_text}</p>
	<p>{posts.results[0].instructions[6].display_text}</p>
	<p>{posts.results[0].instructions[7].display_text}</p>
	<p>{posts.results[0].instructions[8].display_text}</p>
	<p>{posts.results[0].instructions[9].display_text}</p>
	<p>{posts.results[0].instructions[10].display_text}</p>
	<p>{posts.results[0].instructions[11].display_text}</p>
	<p>{posts.results[0].instructions[12].display_text}</p>
--->

	<!--compilation breakdown. Some recipes will come back as a compilation. This makes the instructions to be one layer deeper than the solo recipes. This breaks the page
	<p>Recipe # 1</p>

	<p>{posts.results[0].recipes[0].name}</p>
	<p>{posts.results[0].recipes[0].yields}</p>
	<p>{posts.results[0].recipes[0].instructions[0].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[1].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[2].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[3].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[4].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[5].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[6].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[7].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[8].display_text}</p>
	<p>{posts.results[0].recipes[0].instructions[9].display_text}</p>

	<p>Recipe # 2</p>

	<p>{posts.results[0].recipes[1].name}</p>
	<p>{posts.results[0].recipes[1].yields}</p>
	<p>{posts.results[0].recipes[1].instructions[0].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[1].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[2].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[3].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[4].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[5].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[6].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[7].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[8].display_text}</p>
	<p>{posts.results[0].recipes[1].instructions[9].display_text}</p>

	<p>Recipe # 3</p>

	<p>{posts.results[0].recipes[2].name}</p>
	<p>{posts.results[0].recipes[2].yields}</p>
	<p>{posts.results[0].recipes[2].instructions[0].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[1].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[2].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[3].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[4].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[5].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[6].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[7].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[8].display_text}</p>
	<p>{posts.results[0].recipes[2].instructions[9].display_text}</p>
-->

	<!--
	credits some compilation
	<p>
		{posts.results[0].credits[0].name}, {posts.results[0].credits[1].name}, {posts.results[0]
			.credits[2].name}
	</p>-->
</body>

<!--edge cases

-->
<style>
	* {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	body {
		background-size: 100%;
		background-color: #0a0214;
		color: #fdfdf8;
		letter-spacing: 2px;
		line-height: 1.5;
		margin: -8px;
		font-family: Arial, Helvetica, sans-serif;
	}

	h1,
	h2,
	h3,
	p {
		margin: 5% 25%;
	}

	p {
		font-size: 1.1rem;
	}
</style>
