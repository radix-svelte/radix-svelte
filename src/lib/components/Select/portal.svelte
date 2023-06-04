<script lang="ts" context="module">
	import { Portal } from '$lib/internal/components';
	import type { PortalProps } from '$lib/internal/components/Portal.svelte';

	export type SelectPortalProps = PortalProps;
</script>

<script lang="ts">
	type $$Props = SelectPortalProps;
</script>

<Portal {...$$restProps}>
	<slot />
</Portal>
