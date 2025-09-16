<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';

	let currentTheme = $state('system');

	const themes = [
		{ value: 'light', icon: '☀️' },
		{ value: 'system', icon: 'auto' },
		{ value: 'dark', icon: '🌙' }
	] as const;

	onMount(() => {
		const unsubscribe = theme.subscribe(value => {
			currentTheme = value;
		});

		return unsubscribe;
	});

	function selectTheme(newTheme: 'system' | 'light' | 'dark') {
		theme.set(newTheme);
	}
</script>

<div class="flex items-center gap-2">
	<span class="text-sm text-gray-600 dark:text-gray-400">{m.theme()}</span>
	<div class="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-800">
		{#each themes as t (t.value)}
			<button
			onclick={() => selectTheme(t.value)}
			class="relative p-2 rounded transition-colors {currentTheme === t.value
				? 'bg-white dark:bg-gray-600 shadow-sm'
				: 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
			aria-label="{t.value} theme"
			aria-pressed={currentTheme === t.value}
		>
			<span class="flex items-center justify-center text-base leading-none">
				{t.icon}
			</span>
		</button>
	{/each}
	</div>
</div>