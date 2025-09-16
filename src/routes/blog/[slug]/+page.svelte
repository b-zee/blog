<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.metadata.title} - Blog</title>
	<meta name="description" content={data.metadata.excerpt} />
</svelte:head>

<article>
	<h1>{data.metadata.title}</h1>
	<p>By {data.metadata.author} - {new Date(data.metadata.date).toLocaleDateString()}</p>
	<div>
		{#each data.metadata.tags as tag (tag)}
			<span>#{tag} </span>
		{/each}
	</div>
	<hr />
	<svelte:component this={data.content} />
</article>

<a href={resolve('/')}>← Back to all posts</a>
