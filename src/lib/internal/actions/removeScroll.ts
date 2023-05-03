import type { Action } from 'svelte/action';

type Params = {
	disable?: boolean;
};

export const getScrollbarWidth = () => {
	return window.innerWidth - document.documentElement.clientWidth;
};

export const removeScroll = ((node, params) => {
	const update = (params: Params) => {
		const scrollbarWidth = getScrollbarWidth();
		document.body.style.overflow = params.disable ? 'initial' : 'hidden';
		document.body.style.paddingRight = params.disable ? '' : scrollbarWidth + 'px';
	};

	update(params);

	return {
		update,
		destroy() {
			update({ disable: true });
		},
	};
}) satisfies Action;
