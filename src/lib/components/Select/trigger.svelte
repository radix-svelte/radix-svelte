<script lang="ts" context="module">
	import { useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';
	import { OPEN_KEYS, getSelectItemCollection, getSelectRootContext } from './root.svelte';

	export type SelectTriggerProps = BaseProps<'button'>;
</script>

<script lang="ts">
	import { Popper } from '$lib/internal/components';
	import { findNextItem, shouldShowPlaceholder, useTypeaheadSearch } from './internal/helpers';

	type $$Props = SelectTriggerProps;
	export let use: $$Props['use'] = [];
	export let disabled: $$Props['disabled'] = undefined;

	const rootCtx = getSelectRootContext();
	$: isDisabled = $rootCtx.disabled || disabled;
	$: items = getSelectItemCollection();

	const { search, handleTypeaheadSearch, resetTypeahead } = useTypeaheadSearch((search) => {
		const enabledItems = $items.filter((item) => !item.disabled);
		const currentItem = enabledItems.find((item) => item.value === $rootCtx.value);
		const nextItem = findNextItem(enabledItems, search, currentItem);
		if (nextItem !== undefined) {
			$rootCtx.value = nextItem.value;
		}
	});

	const handleOpen = () => {
		if (!isDisabled) {
			$rootCtx.open = true;
			resetTypeahead();
		}
	};
</script>

<Popper.Anchor
	as="button"
	type="button"
	aria-controls={$rootCtx.contentId}
	aria-expanded={$rootCtx.open}
	aria-required={$rootCtx.required}
	aria-autocomplete="none"
	dir={$rootCtx.dir}
	data-state={$rootCtx.open ? 'open' : 'closed'}
	disabled={isDisabled}
	data-disabled={isDisabled ? '' : undefined}
	data-placeholder={shouldShowPlaceholder($rootCtx.value) ? '' : undefined}
	on:click
	on:click={(e) => e.currentTarget?.focus()}
	on:pointerdown
	on:pointerdown={(e) => {
		// prevent implicit pointer capture
		// https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
		const target = e.target;
		if (target.hasPointerCapture(e.pointerId)) {
			target.releasePointerCapture(e.pointerId);
		}

		// only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
		// but not when the control key is pressed (avoiding MacOS right click)
		if (e.button === 0 && e.ctrlKey === false) {
			handleOpen();
			$rootCtx.triggerPointerDownPos = {
				x: Math.round(e.pageX),
				y: Math.round(e.pageY),
			};
			// prevent trigger from stealing focus from the active item after opening.
			e.preventDefault();
		}
	}}
	on:keydown
	on:keydown={(e) => {
		const isTypingAhead = $search !== '';
		const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
		if (!isModifierKey && e.key.length === 1) handleTypeaheadSearch(e.key);
		if (isTypingAhead && e.key === ' ') return;
		if (OPEN_KEYS.includes(e.key)) {
			handleOpen();
			e.preventDefault();
		}
	}}
	{...$$restProps}
	use={use ?? []}
>
	<slot />
</Popper.Anchor>
