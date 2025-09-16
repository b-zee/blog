import { dateFromSlug } from '$lib/posts';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getLocale } from '$lib/paraglide/runtime.js';

export const load: PageLoad = async ({ params }) => {
	const locale = getLocale();
	let post;
	let availableTranslations: string[] = ['en'];

	// Check for available translations
	const modules = import.meta.glob('/src/posts/*.md');
	const baseSlug = params.slug;

	// Find all translations for this post
	const translations = new Set<string>(['en']);
	for (const path of Object.keys(modules)) {
		const filename = path.split('/').pop() ?? '';
		if (filename.startsWith(baseSlug)) {
			const languageMatch = filename.match(/\.([a-z]{2})\.md$/);
			if (languageMatch) {
				translations.add(languageMatch[1]);
			}
		}
	}
	availableTranslations = Array.from(translations);

	// Try to load the localized version first
	if (locale !== 'en' && translations.has(locale)) {
		try {
			post = await import(`../../posts/${params.slug}.${locale}.md`);
		} catch {
			// Fall back to English version
			try {
				post = await import(`../../posts/${params.slug}.md`);
			} catch {
				error(404, `Post not found: ${params.slug}`);
			}
		}
	} else {
		// Load English version
		try {
			post = await import(`../../posts/${params.slug}.md`);
		} catch {
			error(404, `Post not found: ${params.slug}`);
		}
	}

	const date = dateFromSlug(params.slug);

	return {
		content: post.default,
		metadata: {
			...post.metadata,
			slug: params.slug,
			date,
			availableTranslations
		}
	};
};
