import { parsePost, type RawPost } from '$lib/posts';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const load: PageLoad = async ({ params }) => {
	let post;

	// First, try to load the requested post
	try {
		post = (await import(`../../posts/${params.slug}.md`)) as {
			metadata?: RawPost;
			default: Component;
		};
	} catch {
		// no-op
	}
	if (!post || !post.metadata) {
		throw error(404, `Post not found: ${params.slug}`);
	}

	// Get the postId from metadata
	const parsedPost = parsePost(`../../posts/${params.slug}.md`, post.metadata);
	if (!parsedPost) {
		throw error(500, `Failed to parse post metadata for: ${params.slug}`);
	}

	return {
		content: post.default,
		metadata: parsedPost
	};
};
