<script lang="ts" context="module">
	import type { UnwrapCustomEvents, WrapWithCustomEvent } from '$lib/internal/types';
	export type HoverCardTriggerProps = PopperAnchorProps;
</script>

<script lang="ts">
	import { Popper } from '$lib/internal/components';

	import type { PopperAnchorProps } from '$lib/internal/components/Popper';
	import { createEventDispatcher } from 'svelte';
	import { getRootContext } from './root.svelte';

	type $$Props = HoverCardTriggerProps;
	type $$Events = WrapWithCustomEvent<{
		change: boolean;
	}>;

	export let use: $$Props['use'] = [];
	export let asChild: $$Props['asChild'] = false;

	const ctx = getRootContext();
	const dispatch = createEventDispatcher<UnwrapCustomEvents<$$Events>>();

	const open = () => {
		clearTimeout($ctx.closeTimer);
		const timer = setTimeout(() => ($ctx.open = true), $ctx.openDelay);
		$ctx.openTimer = timer;
	};

	const close = () => {
		clearTimeout($ctx.openTimer);
		$ctx.closeTimer = setTimeout(() => ($ctx.open = false), $ctx.closeDelay);
	};

	$: dispatch('change', $ctx.open);
</script>

{#if asChild}
	<Popper.Anchor
		onPointerLeave={close}
		onPointerEnter={open}
		onFocus={open}
		onBlur={close}
		on:touchstart={(e) => e.preventDefault()}
		use={[...(use ?? [])]}
		data-state={$ctx.open ? 'open' : 'closed'}
		asChild
		let:ref
		let:props
		{...$$restProps}
	>
		<slot {ref} {props} />
	</Popper.Anchor>
{:else}
	<Popper.Anchor
		onPointerLeave={close}
		onPointerEnter={open}
		onFocus={open}
		onBlur={close}
		on:touchstart={(e) => e.preventDefault()}
		use={[...(use ?? [])]}
		data-state={$ctx.open ? 'open' : 'closed'}
		{...$$restProps}
	>
		<slot />
	</Popper.Anchor>
{/if}
