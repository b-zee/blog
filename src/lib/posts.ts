export interface BlogPost {
	title: string;
	summary: string;
	date: string;
	author?: string;
	slug: string;
	availableLanguages?: string[];
}

export async function getPostsMetadata(locale: string = 'en'): Promise<BlogPost[]> {
	const modules = import.meta.glob('/src/posts/*.md');
	const posts: BlogPost[] = [];
	const translationMap = new Map<string, Set<string>>();

	// First pass: identify all posts and their translations
	for (const path of Object.keys(modules)) {
		const filename = path.split('/').pop() ?? '';
		const languageMatch = filename.match(/^(.+?)\.([a-z]{2})\.md$/);

		if (languageMatch) {
			// This is a translation file (e.g., post.nl.md)
			const baseSlug = languageMatch[1];
			const language = languageMatch[2];

			if (!translationMap.has(baseSlug)) {
				translationMap.set(baseSlug, new Set(['en'])); // English is default
			}
			translationMap.get(baseSlug)?.add(language);
		} else {
			// This is a base file (e.g., post.md)
			const slug = filename.replace(/\.md$/, '');
			if (!translationMap.has(slug)) {
				translationMap.set(slug, new Set(['en']));
			}
		}
	}

	// Second pass: load posts with proper locale
	for (const [path, resolver] of Object.entries(modules)) {
		const filename = path.split('/').pop() ?? '';
		let slug: string;
		let shouldLoad = false;
		let moduleToLoad = resolver;

		// Check if this is a translation file
		const translationMatch = filename.match(/^(.+?)\.([a-z]{2})\.md$/);

		if (translationMatch) {
			// This is a translation file
			slug = translationMatch[1];
			const fileLocale = translationMatch[2];

			// Only load if it matches the requested locale
			if (fileLocale === locale) {
				shouldLoad = true;
			}
		} else {
			// This is a base file
			slug = filename.replace(/\.md$/, '');

			// Load base file if:
			// 1. We're requesting English locale, OR
			// 2. There's no translation for the requested locale
			if (locale === 'en') {
				shouldLoad = true;
			} else {
				// Check if a translation exists for this locale
				const translationPath = `/src/posts/${slug}.${locale}.md`;
				if (modules[translationPath]) {
					// Translation exists, so we'll load that instead
					moduleToLoad = modules[translationPath];
					shouldLoad = true;
				} else {
					// No translation, load the base file as fallback
					shouldLoad = true;
				}
			}
		}

		if (!shouldLoad) {
			continue;
		}

		// Skip if we already processed this slug (prevents duplicates)
		if (posts.some(p => p.slug === slug)) {
			continue;
		}

		const date = dateFromSlug(slug);
		if (!date) {
			console.warn(`Filename ${slug} does not match the expected format.`);
			continue;
		}

		const module = (await moduleToLoad()) as { metadata?: BlogPost; default?: unknown };

		if (module.metadata) {
			const availableLanguages = Array.from(translationMap.get(slug) ?? new Set(['en']));

			posts.push({
				...module.metadata,
				slug,
				date,
				availableLanguages,
			});
		}
	}

	// Sort posts by date (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export function dateFromSlug(slug: string) {
	const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-.*$/);
	if (dateMatch === null || typeof dateMatch[1] === 'undefined') {
		return undefined;
	};

	return dateMatch[1];
}
