import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../posts/${params.slug}.md`);

		return {
			content: post.default,
			metadata: {
				...post.metadata,
				slug: params.slug
			}
		};
	} catch {
		error(404, `Post not found: ${params.slug}`);
	}
};
