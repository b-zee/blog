import type { PageLoad } from './$types';
import { getPostsMetadata } from '$lib/posts';

export const load: PageLoad = async () => {
	const posts = await getPostsMetadata();
	return {
		posts
	};
};
