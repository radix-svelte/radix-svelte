<script lang="ts" context="module">
	import { useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';

	export type SelectValueProps = BaseProps<'span'>;
</script>

<script lang="ts">
	import { shouldShowPlaceholder } from './internal/helpers';
	import { getSelectRootContext } from './root.svelte';

	type $$Props = SelectValueProps;
	export let use: $$Props['use'] = [];

	$: hasChildren = $$slots.default !== undefined;

	$: {
		$rootCtx.valueNodeHasChildren = hasChildren;
	}

	const rootCtx = getSelectRootContext();
</script>

<span {...$$restProps} use:useActions={use ?? []}>
	{#if shouldShowPlaceholder($rootCtx.value)}
		<slot name="placeholder" />
	{:else}
		<slot />
	{/if}
</span>
