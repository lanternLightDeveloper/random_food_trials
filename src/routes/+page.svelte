<script lang="ts">
	import type { PageData } from './$types'
	import { goto } from '$app/navigation'

	// Define TypeScript interfaces for type safety
	interface Nutrition {
		calories: number
		carbohydrates: number
		fat: number
		protein: number
	}

	interface Ingredient {
		raw_text: string
	}

	interface Section {
		components: Ingredient[]
	}

	interface Instruction {
		display_text: string
	}

	interface Recipe {
		name: string
		description?: string
		num_servings?: number
		cook_time_minutes?: number
		nutrition: Nutrition
		sections: Section[]
		instructions: Instruction[]
	}

	export let data: PageData
	let { posts, error, searchQuery, page } = data
	$: ({ posts, error, searchQuery, page } = data)

	let query = searchQuery || ''
	let currentPage = page || 0
	let allRecipes: Recipe[] = posts?.results || []
	let isLoading = false
	let selectedRecipe: Recipe | null = null
	let resultsCount = 100000000 // Default number of results

	async function handleSearch(event: SubmitEvent) {
		event.preventDefault()
		console.log('Search triggered with query:', query)
		currentPage = 0 // Reset page to the first page for new search
		isLoading = true

		try {
			await goto(`?search=${encodeURIComponent(query)}&count=${resultsCount}&page=${currentPage}`, {
				replaceState: true
			})
		} catch (err) {
			console.error('Navigation error:', err)
		} finally {
			isLoading = false
		}
	}

	function selectRecipe(recipe: Recipe) {
		selectedRecipe = recipe
	}

	// Reactive statement with safer data handling
	$: {
		allRecipes = posts?.results || []
	}

	// Function to export recipe data to a .txt file
	function exportRecipeToTxt() {
		if (!selectedRecipe) return

		try {
			// More robust content generation
			const content = `Recipe Details\n
				Name: ${selectedRecipe.name || 'Unnamed Recipe'}
				Description: ${selectedRecipe.description || 'No description available'}
				Servings: ${selectedRecipe.num_servings || 'N/A'}
				Prep Time: ${selectedRecipe.cook_time_minutes || 'N/A'} minutes
						
				Nutrition: 
				- Calories: ${selectedRecipe.nutrition?.calories || 'N/A'}
				- Carbs: ${selectedRecipe.nutrition?.carbohydrates || 'N/A'}g
				- Fat: ${selectedRecipe.nutrition?.fat || 'N/A'}g
				- Protein: ${selectedRecipe.nutrition?.protein || 'N/A'}g
						
				Ingredients:
				${
					selectedRecipe.sections
						?.flatMap((section) =>
							section.components.map((ingredient) => `- ${ingredient.raw_text}`)
						)
						.join('\n') || 'No ingredients available'
				}
						
				Instructions:
				${
					selectedRecipe.instructions
						?.map((instruction, index) => `${index + 1}. ${instruction.display_text}`)
						.join('\n') || 'No instructions available'
				}`

			// Create a blob and download link
			const blob = new Blob([content], { type: 'text/plain' })
			const url = URL.createObjectURL(blob)

			// Trigger download
			const a = document.createElement('a')
			a.href = url
			a.download = `${selectedRecipe.name || 'recipe'}.txt`
			a.click()

			// Revoke the object URL
			URL.revokeObjectURL(url)
		} catch (err) {
			console.error('Export failed:', err)
			alert('Failed to export recipe. Please try again.')
		}
	}
</script>

<!-- Search Form with Improved Accessibility -->
<form on:submit={handleSearch}>
	<label for="search">Search for a recipe:</label>
	<input
		id="search"
		type="text"
		bind:value={query}
		placeholder="e.g., chicken, strawberry, breakfast"
		aria-label="Recipe search input"
	/>
	<br />
	<label for="resultsCount">Number of results:</label>
	<select
		id="resultsCount"
		bind:value={resultsCount}
		aria-label="Number of recipe results to display"
	>
		<option value="5">5</option>
		<option value="10">10</option>
		<option value="15">15</option>
		<option value="20">20</option>
		<option value="40">40</option>
	</select>
	<br />
	<button class="ripple-btn" type="submit" aria-label="Perform recipe search" disabled={isLoading}>
		{isLoading ? 'Searching...' : 'Search'}
	</button>
</form>
<ul>
	{#each allRecipes as recipe (recipe.id)}
		<li>
			<button
				on:click={() => (selectedRecipe = selectedRecipe === recipe ? null : recipe)}
				on:keydown={(e) =>
					e.key === 'Enter' && (selectedRecipe = selectedRecipe === recipe ? null : recipe)}
				tabindex="0"
				aria-label={`Select recipe: ${recipe.name}`}
			>
				<h3>{recipe.name}</h3>
				<p>{recipe.description || 'No description available'}</p>
			</button>

			<!-- Conditionally render the selected recipe details -->
			{#if selectedRecipe === recipe}
				<div class="recipe-details">
					<button on:click={() => (selectedRecipe = null)} aria-label="Close recipe details">
						Close
					</button>
					<h2>{selectedRecipe.name}</h2>
					<p>{selectedRecipe.description || 'No description available'}</p>
					<p><strong>Servings:</strong> {selectedRecipe.num_servings || 'N/A'}</p>
					<p><strong>Prep Time:</strong> {selectedRecipe.cook_time_minutes || 'N/A'} minutes</p>

					<h3>Nutrition</h3>
					<p>
						{selectedRecipe.nutrition.calories} calories,
						{selectedRecipe.nutrition.carbohydrates}g carbs,
						{selectedRecipe.nutrition.fat}g fat,
						{selectedRecipe.nutrition.protein}g protein
					</p>

					<h3>Ingredients</h3>
					<ul>
						{#each selectedRecipe.sections as section}
							{#each section.components as ingredient}
								<li>{ingredient.raw_text}</li>
							{/each}
						{/each}
					</ul>

					<h3>Instructions</h3>
					<ol>
						{#each selectedRecipe.instructions as instruction}
							<li>{instruction.display_text}</li>
						{/each}
					</ol>

					<button on:click={exportRecipeToTxt} aria-label="Export recipe to text file">
						Export to .txt
					</button>
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	button {
		all: unset;
	}

	/* buttons */
	.ripple-btn {
		background-color: var(--error);
		color: var(--text-Color-1);
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
		position: relative;

		&:hover {
			border: var(--bord);
		}
	}

	.ripple-btn::after {
		content: '';
		position: absolute;
		background: var(--highlight-2);
		color: var(--back-1);
		border-radius: 50%;
		width: 100px;
		height: 100px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		transition:
			transform 0.5s,
			opacity 0.5s;
	}

	.ripple-btn:active::after {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}

	/* Recipe Details Styling */
	h2,
	h3 {
		margin-bottom: 10px;
	}

	h2 {
		font-size: 2rem;
		border-bottom: 2px solid var(--back-3); /* Highlight color */
		padding-bottom: 5px;
	}

	h3 {
		font-size: 1.5rem;
		margin-top: 20px;
	}

	p {
		line-height: 1.6;
		margin-bottom: 15px;
	}

	strong {
		font-weight: bold;
	}

	ol {
		margin-left: 20px;
		padding-left: 10px;
		list-style-type: decimal;
		line-height: 1.6;
	}

	ul {
		margin-left: 20px;
	}

	ol li {
		margin-bottom: 10px;
	}

	.recipe-details {
		margin-top: 10px;
		padding: 10px;
		background: var(--highlight-2);
		color: var(--back-1);
		border: 1px solid var(--back-3);
		border-radius: 4px;

		& button {
			margin-top: 10px;
			background: var(--grabber);
			color: var(--text-Color-1);
			padding: 5px 10px;
			border-radius: 4px;
			cursor: pointer;

			&:hover {
				background: var(--highlight);
			}
		}
	}
</style>
