<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import { getLocale } from "$lib/paraglide/runtime.js";
	import { m } from '$lib/paraglide/messages';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.metadata.title} - Blog</title>
	<meta name="description" content={data.metadata.summary} />
</svelte:head>

<article class="space-y-8">
	<header class="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
		<a
			href={resolve('/')}
			class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 transition-colors hover:text-blue-500 dark:hover:text-blue-400"
		>
			<span class="mr-2">&lt;</span>
			Back to all posts
		</a>

		<h1
			class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-4xl font-bold text-transparent"
		>
			{data.metadata.title}
		</h1>

		<div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
			{#if data.metadata.author}
				<span>{m.by()} <span class="text-blue-500 dark:text-blue-400">{data.metadata.author}</span></span>
				<span>•</span>
			{/if}
			<time>
				{new Date(data.metadata.date).toLocaleDateString(getLocale(), {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
	</header>

	<div
		class="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900"
	>
		<svelte:component this={data.content} />
	</div>
</article>
