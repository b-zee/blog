export interface RawPost {
	date: string;
	title: string;
	summary: string;
	author?: string;
	en?: string;
	nl?: string;
}

export interface Post {
	slug: string;
	title: string;
	summary: string;
	author?: string;
	date: string;
	en?: string;
	nl?: string;
}

export async function getPostsMetadata(): Promise<Post[]> {
	const modules = import.meta.glob('/src/posts/*.md');
	const posts: Post[] = [];

	// First pass: group posts by postId
	for (const [path, importModule] of Object.entries(modules)) {
		const { metadata } = (await importModule()) as { metadata?: RawPost };
		const post = parsePost(path, metadata);

		if (!post) continue;

		posts.push(post);
	}

	// Sort posts by date (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export function parsePost(path: string, metadata: RawPost | undefined): Post | undefined {
	if (!metadata) return;

	const filename = path.split('/').pop() ?? '';
	const slug = filename.replace(/\.md$/, '');

	return {
		slug,
		title: metadata.title,
		summary: metadata.summary,
		author: metadata.author,
		date: metadata.date,
		en: metadata.en,
		nl: metadata.nl
	};
}
