<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Handle auto-redirect for first-time Dutch visitors
	onMount(() => {
		if (browser) {
			const currentLocale = getLocale();
			const hasLanguagePreference = localStorage.getItem('language-preference-set');

			// Only auto-redirect if:
			// 1. User hasn't manually set a language preference
			// 2. They're on the English version (no /nl/ prefix)
			// 3. Their browser language is Dutch
			// 4. We're on the homepage
			if (!hasLanguagePreference && currentLocale === 'en' && $page.url.pathname === '/') {
				// Check browser language preference
				const browserLanguages = navigator.languages || [navigator.language];
				const prefersNL = browserLanguages.some(lang =>
					lang.toLowerCase().startsWith('nl')
				);

				if (prefersNL) {
					// Redirect to Dutch version
					const nlUrl = localizeHref('/', { locale: 'nl' });
					// Use hard navigation to ensure content updates
					window.location.href = nlUrl;
				}
			}
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
	<div class="mx-auto max-w-4xl px-6">
		<header class="flex justify-end items-center gap-4 py-4">
			<LanguageSelector />
			<ThemeSelector />
		</header>
		<main class="py-8">
			{@render children?.()}
		</main>
	</div>
</div>
