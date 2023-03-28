<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const { posts } = data;

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date);
	}

	$: console.log(posts);
</script>

<body>
	<!--Entry phrase: contains recipe info, description and amount of servings-->

	<h1>Today is {formatDate(posts.results[0].createdAt)}</h1>
	<h2>Here is a random recipe to try:</h2>
	<h3>{posts.results[0].name}</h3>

	{#if posts.results[0].description}
		<p>{posts.results[0].description}</p>
	{/if}
	<br />

	<h2>Ingredients:</h2>

	{#if posts.results && posts.results.length > 0}
		<ul>
			{#each posts.results as result}
				{#if result.recipes && result.recipes.length > 0}
					{#each result.recipes as recipe}
						<li>
							<details>
								<summary>{recipe.name}</summary>
								{#each recipe.sections as section}
									{#if section.name}
										<p>{section.name}</p>
									{/if}
									<ul class="highlight">
										{#each section.components as component}
											<li>{component.raw_text}</li>
										{/each}
									</ul>
								{/each}
							</details>
						</li>
					{/each}
				{:else}
					{#each result.sections as section}
						<ul>
							{#if section.name}
								<p>{section.name}</p>
							{/if}
							{#each section.components as component}
								<li>{component.raw_text}</li>
							{/each}
						</ul>
					{/each}
				{/if}
			{/each}
		</ul>
	{:else}
		<p>No data available</p>
	{/if}

	<h2>Instructions:</h2>

	{#if posts.results && posts.results.length > 0}
		<ul>
			{#each posts.results as result}
				{#if result.recipes && result.recipes.length > 0}
					{#each result.recipes as recipe}
						<li>
							<details>
								<summary>{recipe.name}</summary>
								<ul class="highlight">
									<p>Yield: {recipe.yields}</p>
									<p>
										Calories: {recipe.nutrition.calories} <br />
										Carbohydrates: {recipe.nutrition.carbohydrates} <br />
										Fat: {recipe.nutrition.fat} <br />
										Fiber: {recipe.nutrition.fiber} <br />
										Protein: {recipe.nutrition.protein} <br />
										Sugar: {recipe.nutrition.sugar}
									</p>
									{#each recipe.instructions as instruction}
										<li>{instruction.display_text}</li>
									{/each}
								</ul>
								<p>
									Credits: {#each recipe.credits as credit}{credit.name} {/each}
								</p>
							</details>
						</li>
					{/each}
				{:else if result.instructions && result.instructions.length > 0}
					<p>Yield: {result.yields}</p>
					<p>
						Calories: {result.nutrition.calories} <br />
						Carbohydrates: {result.nutrition.carbohydrates} <br />
						Fat: {result.nutrition.fat} <br />
						Fiber: {result.nutrition.fiber} <br />
						Protein: {result.nutrition.protein} <br />
						Sugar: {result.nutrition.sugar}
					</p>
					<ul>
						{#each result.instructions as instruction}
							<li>{instruction.display_text}</li>
						{/each}
					</ul>
					<p>
						Credits: {#each result.credits as credit}{credit.name} {/each}
					</p>
				{:else}
					<p>No instructions available</p>
				{/if}
			{/each}
		</ul>
	{:else}
		<p>No data available</p>
	{/if}

	<br />
</body>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	body {
		height: fit-content;
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
		margin: 5% 10%;
	}

	li {
		margin: 3% 10%;
	}

	h1 {
		font-size: 1.1rem;
	}

	h2 {
		font-size: 1rem;
	}

	h3,
	h4 {
		font-size: 0.9rem;
	}

	ul {
		&:hover {
			cursor: pointer;
		}
	}
	.highlight {
		background-color: #201131;
		li {
			list-style-type: disc;
		}
	}

	p,
	li {
		font-size: 0.8rem;
	}

	@media (min-width: 780px) {
		h1,
		h2,
		h3,
		h4,
		p {
			margin: 5% 20%;
		}

		li {
			margin: 2% 20%;
		}
	}

	@media (min-width: 1280px) {
		h1,
		h2,
		h3,
		h4,
		p {
			margin: 3% 25%;
		}

		li {
			margin: 2% 25%;
		}
	}
</style>
