<script lang="ts">
	import { getLocale, deLocalizeHref, localizeHref } from '$lib/paraglide/runtime.js';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let currentLocale = $state(getLocale());

	const languages = [
		{ value: 'en', icon: '🇬🇧' },
		{ value: 'nl', icon: '🇳🇱' }
	] as const;

	// Update current locale when it changes (e.g., after navigation)
	$effect(() => {
		currentLocale = getLocale();
	});

	function selectLanguage(newLocale: 'en' | 'nl') {
		// Store that the user has made an explicit language choice
		if (browser) {
			localStorage.setItem('language-preference-set', 'true');
			localStorage.setItem('preferred-language', newLocale);
		}

		// Get the base path without any locale prefix
		const basePath = deLocalizeHref($page.url.pathname);

		// Get the new localized URL
		const newUrl = localizeHref(basePath, { locale: newLocale });

		// Navigate to the new URL (the locale will be determined by the URL)
		window.location.href = newUrl;
	}
</script>

<div class="flex items-center gap-2">
	<div class="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-800">
		{#each languages as lang (lang.value)}
			<button
				onclick={() => selectLanguage(lang.value)}
				class="relative p-2 rounded transition-colors {currentLocale === lang.value
					? 'bg-white dark:bg-gray-600 shadow-sm'
					: 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
				aria-label="{lang.value === 'en' ? 'English' : 'Nederlands'}"
				aria-pressed={currentLocale === lang.value}
			>
				<span class="flex items-center justify-center text-base leading-none">
					{lang.icon}
				</span>
			</button>
		{/each}
	</div>
</div>