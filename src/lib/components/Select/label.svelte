<script lang="ts" context="module">
	import { useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';
	import { getSelectGroupContext } from './group.svelte';

	export type SelectLabelProps = BaseProps<'div'>;
</script>

<script lang="ts">
	type $$Props = SelectLabelProps;
	export let use: $$Props['use'] = [];

	const groupCtx = getSelectGroupContext();
</script>

<div id={$groupCtx.id} {...$$restProps} use:useActions={use ?? []}>
	<slot />
</div>
