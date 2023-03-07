<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { posts } = data;

	$: console.log(posts);

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date);
	}

	function getInstructions() {
		if (!posts.results || posts.results.length === 0) {
			return [];
		}
		const instructions = posts.results.flatMap((post) => post.instructions);
		return instructions.filter((instruction) => instruction.display_text);
	}

	/*flatmap function
	Do multiple functions live in one flatMap()?
	*/
</script>

<!--
	goals- 
	all of these things are a layer deeper if the fetch returns a compilation breaking the page. 
	Working on understanding flatmap()
	MAIN***.set up instructions 
	1.set up a flat map to find how many contributors exist
	2.set up yields 
	3.set up nutritional facts 
	4.set up contributors 

	extra credit: add a random drink suggester
-->

<body>
	<hgroup>
		<!--Entry phrase: contains recipe info, description and amount of servings-->

		<h1>Today is {formatDate(posts.results[0].createdAt)}.</h1>
		<h2>Here is a random recipe to try:</h2>
		<h3>{posts.results[0].name}</h3>
		<p>{posts.results[0].description}</p>
	</hgroup>

	<!--this shows a compilation but not a solo recipe-->

	{#if posts.results && posts.results.length > 0}
		{#each posts.results as post}
			{#if post.recipes && post.recipes.length > 0}
				{#each post.recipes as recipe}
					{#if recipe.instructions && recipe.instructions.length > 0}
						<h2>{recipe.name}</h2>
						<ul>
							{#each recipe.instructions as instruction}
								{#if instruction.display_text}
									<li>{instruction.display_text}</li>
								{/if}
							{/each}
						</ul>
					{/if}
				{/each}
			{/if}
		{/each}
	{:else}
		<p>No data available</p>
	{/if}
	<!--compilation breakdown. Some recipes will come back as a compilation. 
		This makes the instructions to be one layer deeper than the solo recipes. 
		They work by themselves but not together.
		The comp code wont break if its a solo recipe. but the solo recipe code does break if its a compilation.

	*******
	solo break down. They work by themselves but not together


	{#if posts.results}
		<ul>
			{#each getInstructions() as instruction}
				<li>{instruction.display_text}</li>
			{/each}
		</ul>
	{:else}
		<p>No posts found</p>
	{/if}
-->

	<!--yields can vary between recipe or compilation. needs some love

	<p>{posts.results[0].yields}</p>
	

	*****
	serving/nutritional facts varies on compilation or solo

	<p>
		Calories: {posts.results[0].nutrition.calories} <br />
		Carbohydrates: {posts.results[0].nutrition.carbohydrates} <br />
		Fat: {posts.results[0].nutrition.fat} <br />
		Fiber: {posts.results[0].nutrition.fiber} <br />
		Protein: {posts.results[0].nutrition.protein} <br />
		Sugar: {posts.results[0].nutrition.sugar}
	</p>


	*****
	video. can it be loaded on the page? 

	<p><a href={posts.results[0].video_url}>{posts.results[0].video_url}</a></p>


	*****
	credits compilation
	<p>
		{posts.results[0].credits[0].name}, {posts.results[0].credits[1].name}, {posts.results[0]
			.credits[2].name}
	</p>
	-->
</body>

<!--edge cases-->
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
	p,
	li {
		margin: 5% 25%;
	}

	p {
		font-size: 1.1rem;
	}
</style>
