export interface BlogPost {
	title: string;
	summary: string;
	date: string;
	author?: string;
	slug: string;
}

export async function getPostsMetadata(): Promise<BlogPost[]> {
	const modules = import.meta.glob('/src/posts/*.md');
	const posts: BlogPost[] = [];

	for (const [path, resolver] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace(/\.md+$/, '') ?? '';
		const date = dateFromSlug(slug);
		if (!date) {
			console.warn(`Filename ${slug} does not match the expected format.`);
			continue;
		};

		const module = (await resolver()) as { metadata?: BlogPost; default?: unknown };

		if (module.metadata) {
			posts.push({
				...module.metadata,
				slug,
				date,
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
