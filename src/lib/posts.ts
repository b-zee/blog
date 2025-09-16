export interface BlogPost {
	title: string;
	date: string;
	excerpt: string;
	author: string;
	tags: string[];
	slug: string;
}

export async function getPostsMetadata(): Promise<BlogPost[]> {
	const modules = import.meta.glob('/src/posts/*.md');
	const posts: BlogPost[] = [];

	for (const [path, resolver] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const module = (await resolver()) as { metadata?: BlogPost; default?: unknown };

		if (module.metadata) {
			posts.push({
				...module.metadata,
				slug
			});
		}
	}

	// Sort posts by date (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}
