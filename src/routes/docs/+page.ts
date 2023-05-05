import { schemas } from '$routes/(previews)/schemas';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const firstCmp = Object.keys(schemas)[0];
	throw redirect(303, `/docs/${firstCmp}`);
};
