<script lang="ts" context="module">
	import { useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';
	import { getRootContext } from './root.svelte';

	export type PopperAnchorProps<T extends 'div' | 'button' | 'a'> = BaseProps<T> & {
		as?: T;
		ref?: HTMLElement | null;
	};
</script>

<script lang="ts">
	type $$Generic = 'div' | 'button' | 'a';
	type $$Props = PopperAnchorProps<$$Generic>;
	export let use: $$Props['use'] = [];
	export let as: $$Props['as'] = 'div';
	export let ref: $$Props['ref'] = null;

	let element: HTMLElement;
	$: if (element) ref = element;

	const rootContext = getRootContext();
	$: $rootContext.anchor = element;
</script>

<svelte:element
	this={as}
	{...$$restProps}
	use:useActions={use ?? []}
	bind:this={element}
	on:click
	on:pointerenter
	on:pointermove
	on:pointerleave
	on:pointerdown
	on:focus
	on:blur
	on:touchstart
>
	<slot />
</svelte:element>
