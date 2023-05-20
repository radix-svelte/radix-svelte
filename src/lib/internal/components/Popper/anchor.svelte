<script lang="ts" context="module">
	import { mergeSvelteProps, useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getRootContext } from './root.svelte';
	import { createRefAction } from '$lib/internal/actions';

	export type PopperAnchorProps = BaseProps & {
		onFocus?: (e: FocusEvent) => void;
		onBlur?: (e: FocusEvent) => void;
		onPointerEnter?: (e: PointerEvent) => void;
		onPointerLeave?: (e: PointerEvent) => void;
	};
</script>

<script lang="ts">
	type $$Props = PopperAnchorProps;
	export let use: $$Props['use'] = [];
	export let asChild = false;
	export let onFocus: $$Props['onFocus'] = undefined;
	export let onBlur: $$Props['onBlur'] = undefined;
	export let onPointerEnter: $$Props['onPointerEnter'] = undefined;
	export let onPointerLeave: $$Props['onPointerLeave'] = undefined;

	let element: HTMLElement | null = null;
	const ref = createRefAction(
		(el) => {
			if (el) element = el;
		},
		{
			focus: [
				(e: Event) => {
					if (onFocus) onFocus(e as FocusEvent);
				},
				{},
			],
			blur: [
				(e: Event) => {
					if (onBlur) onBlur(e as FocusEvent);
				},
				{},
			],
			pointerenter: [
				(e: Event) => {
					if (onPointerEnter) onPointerEnter(e as PointerEvent);
				},
				{},
			],
			pointerleave: [
				(e: Event) => {
					if (onPointerLeave) onPointerLeave(e as PointerEvent);
				},
				{},
			],
		}
	);

	const rootContext = getRootContext();
	$: $rootContext.anchor = element;

	const getProps = (userProps: SvelteHTMLElements['div']) =>
		mergeSvelteProps($$restProps, userProps);
</script>

<!-- 
<div
	{...$$restProps}
	use:useActions={use ?? []}
	bind:this={element}
	on:click
	on:pointerenter
	on:pointerleave
	on:focus
	on:blur
	on:touchstart
>
	<slot />
</div> -->

{#if asChild}
	<slot {ref} props={getProps} />
{:else}
	<div
		{...$$restProps}
		use:ref
		use:useActions={use ?? []}
		bind:this={element}
		on:click
		on:pointerenter
		on:pointerleave
		on:focus
		on:blur
		on:touchstart
	>
		<slot />
	</div>
{/if}
