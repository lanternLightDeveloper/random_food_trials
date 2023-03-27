<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let sections = [];

	let activeIndex = -1;

	function toggleSection(index) {
		activeIndex = activeIndex === index ? -1 : index;
		dispatch('toggle', { index, activeIndex });
	}
</script>

{#each sections as section, i}
	<div class="accordion">
		<div
			class="accordion-header"
			on:click={() => toggleSection(i)}
			class:selected={activeIndex === i}
		>
			<h2>{section.title}</h2>
			<div class="icon">
				{#if activeIndex === i}
					&#9660;
				{:else}
					&#9654;
				{/if}
			</div>
		</div>
		<div
			class="accordion-content"
			class:selected={activeIndex === i}
			style="display: {activeIndex === i ? 'block' : 'none'}"
		>
			<ul>
				{#each section.content as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
{/each}

<style>
	.accordion {
		margin-bottom: 10px;
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 10px;
		margin: 0 5%;
		background-color: #0c0202;
		border: 1px solid #c90303;
		cursor: pointer;
	}

	.accordion-header:hover {
		background-color: #237c0d;
	}

	.accordion-header.selected {
		background-color: #99a80e;
		color: #0c0202;
	}

	.accordion-content {
		padding: 10px;
		border: 1px solid #ddd;

		height: fit-content;
	}
</style>
