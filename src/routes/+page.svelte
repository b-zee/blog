<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	export let data: PageData;
</script>

<svelte:head>
	<title>Blog Posts</title>
	<meta name="description" content="A collection of blog posts" />
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<h1
			class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-4xl font-bold text-transparent"
		>
			Blog Posts
		</h1>
		<p class="text-gray-600 dark:text-gray-400">Thoughts, stories, and ideas</p>
	</div>

	<div class="space-y-6">
		{#each data.posts as post (post.slug)}
			<article class="group">
				<a
					href={resolve(`/blog/${post.slug}`)}
					class="block rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10"
				>
					<h2 class="mb-2 text-2xl font-semibold transition-colors group-hover:text-blue-400">
						{post.title}
					</h2>
					<p class="mb-3 text-sm text-gray-500">
						By <span class="text-blue-400">{post.author}</span> •
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<p class="mb-4 line-clamp-2 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
					<div class="flex flex-wrap gap-2">
						{#each post.tags as tag (tag)}
							<span
								class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
							>
								#{tag}
							</span>
						{/each}
					</div>
				</a>
			</article>
		{/each}
	</div>
</div>
