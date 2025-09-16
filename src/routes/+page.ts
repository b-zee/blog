import type { PageLoad } from './$types';
import { getPostsMetadata } from '$lib/posts';
import { getLocale } from '$lib/paraglide/runtime.js';

export const load: PageLoad = async () => {
	const locale = getLocale();
	const posts = await getPostsMetadata(locale);
	return {
		posts
	};
};
