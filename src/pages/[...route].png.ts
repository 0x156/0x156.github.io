import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../utils/generateOgImage';
import { SITE_TITLE, SITE_TAGLINE } from '../consts';

export async function getStaticPaths() {
	const posts = await getCollection('blog');

	const staticPages = [
		{ params: { route: 'og' }, props: { title: SITE_TITLE, subtitle: SITE_TAGLINE } },
		{ params: { route: 'blog' }, props: { title: 'Notes', subtitle: SITE_TITLE } },
		{ params: { route: 'tags' }, props: { title: 'Tags', subtitle: SITE_TITLE } },
		{ params: { route: 'archive' }, props: { title: 'Archive', subtitle: SITE_TITLE } },
	];

	const blogPages = posts.map((post) => ({
		params: { route: `blog/${post.id}` },
		props: { title: post.data.title, subtitle: 'Notes' },
	}));

	return [...staticPages, ...blogPages];
}

export const GET: APIRoute = async ({ props }) => {
	const safeTitle = (props.title as string).replace(/&/g, 'and');
	return new Response(await generateOgImage(safeTitle, props.subtitle as string), {
		headers: { 'Content-Type': 'image/png' },
	});
};
