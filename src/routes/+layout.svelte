<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-gray-100">
	<main class="mx-auto max-w-4xl px-6 py-12">
		{@render children?.()}
	</main>
</div>
