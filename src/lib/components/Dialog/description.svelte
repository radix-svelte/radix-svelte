<script lang="ts" context="module">
	import type { BaseProps } from '$lib/internal/types';
	import { getDialogRootContext } from './root.svelte';

	export type DialogDescriptionProps = BaseProps<'p'>;
</script>

<script lang="ts">
	type $$Props = DialogDescriptionProps;
	const rootCtx = getDialogRootContext();
</script>

<p id={$rootCtx.descriptionId} {...$$restProps}>
	<slot />
</p>
