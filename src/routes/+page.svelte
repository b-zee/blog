<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	export let data: PageData;
</script>

<svelte:head>
	<title>Blog Posts</title>
	<meta name="description" content="A collection of blog posts" />
</svelte:head>

<h1>Blog Posts</h1>

<div>
	{#each data.posts as post (post.slug)}
		<article>
			<a href={resolve(`/blog/${post.slug}`)}>
				<h2>{post.title}</h2>
				<p>By {post.author} - {new Date(post.date).toLocaleDateString()}</p>
				<p>{post.excerpt}</p>
				<div>
					{#each post.tags as tag (tag)}
						<span>#{tag} </span>
					{/each}
				</div>
			</a>
		</article>
	{/each}
</div>
