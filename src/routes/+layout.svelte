<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeSelector from '$lib/components/ThemeSelector.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100"
>
	<div class="mx-auto max-w-4xl px-6">
		<header class="flex items-center justify-end gap-4 py-4">
			<ThemeSelector />
		</header>
		<main class="py-8">
			{@render children?.()}
		</main>
	</div>
</div>
