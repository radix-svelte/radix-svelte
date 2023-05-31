<script lang="ts" context="module">
	import { useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';

	export type SelectTriggerProps = BaseProps<'div'>;
</script>

<script lang="ts">
	type $$Props = SelectTriggerProps;
	export let use: $$Props['use'] = [];
</script>

<div {...$$restProps} use:useActions={use ?? []}>
	<slot />
</div>