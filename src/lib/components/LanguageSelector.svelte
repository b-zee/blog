<script lang="ts">
	import { getLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	const languages = [
		{ value: 'en', icon: '🇬🇧', name: 'English' },
		{ value: 'nl', icon: '🇳🇱', name: 'Nederlands' }
	] as const;

	// Get the base path without any locale prefix for generating links
	const currentLocale = getLocale();

	function setPreferredLanguage(event: MouseEvent, newLocale: 'en' | 'nl') {
		// Store explicitly preferred language in localStorage
		try {
			localStorage.setItem('preferred-language', newLocale);
		} catch {
			// no-op in case localStorage is not available
		}
	}
</script>

<div class="flex items-center gap-2">
	<div class="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-800">
		{#each languages as lang (lang.value)}
			<a
				href={resolve(localizeHref(page.url.pathname, { locale: lang.value }) as `/${string}`)}
				onclick={(e) => setPreferredLanguage(e, lang.value)}
				data-sveltekit-reload
				class="relative p-2 rounded transition-colors block {lang.value === currentLocale
					? 'bg-white dark:bg-gray-600 shadow-sm'
					: 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
				aria-label={lang.name}
				aria-current={lang.value === currentLocale ? 'true' : 'false'}
			>
				<span class="flex items-center justify-center text-base leading-none">
					{lang.icon}
				</span>
			</a>
		{/each}
	</div>
</div>