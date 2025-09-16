import { dateFromSlug } from '$lib/posts';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../posts/${params.slug}.md`);
		const date = dateFromSlug(params.slug);

		return {
			content: post.default,
			metadata: {
				...post.metadata,
				slug: params.slug,
				date
			}
		};
	} catch {
		error(404, `Post not found: ${params.slug}`);
	}
};
