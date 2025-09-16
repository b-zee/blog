<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.metadata.title} - Blog</title>
	<meta name="description" content={data.metadata.excerpt} />
</svelte:head>

<article class="space-y-8">
	<header class="space-y-4 border-b border-gray-800 pb-8">
		<a
			href={resolve('/')}
			class="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-400"
		>
			<span class="mr-2">&lt;</span>
			Back to all posts
		</a>

		<h1
			class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-4xl font-bold text-transparent"
		>
			{data.metadata.title}
		</h1>

		<div class="flex items-center gap-4 text-sm text-gray-400">
			<span>By <span class="text-blue-400">{data.metadata.author}</span></span>
			<span>•</span>
			<time>
				{new Date(data.metadata.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>

		<div class="flex flex-wrap gap-2">
			{#each data.metadata.tags as tag (tag)}
				<span
					class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
				>
					#{tag}
				</span>
			{/each}
		</div>
	</header>

	<div
		class="prose prose-lg max-w-none prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-100 prose-code:text-blue-400 prose-pre:border prose-pre:border-gray-800 prose-pre:bg-gray-900"
	>
		<svelte:component this={data.content} />
	</div>
</article>
