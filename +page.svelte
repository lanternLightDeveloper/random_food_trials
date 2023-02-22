<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { posts } = data;

	console.log(data);
	console.log(posts);

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date);
	}
</script>

<h1>Hello friend {posts} {data}</h1>

<hgroup>
	<h1>{data.posts.title}</h1>
	<h2>{formatDate(data.posts.createdAt)}</h2>
</hgroup>

<div class="content">
	{@html data.posts.content}
</div>
