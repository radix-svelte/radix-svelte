<script lang="ts" context="module">
	import { reactiveContext } from '$lib/internal/helpers';

	type RootContext = {
		anchor: HTMLElement | null;
		arrow: HTMLElement | null;
	};

	const { getContext, setContext } = reactiveContext<RootContext>({
		anchor: null,
		arrow: null,
	});
	export const getRootContext = getContext;
</script>

<script lang="ts">
	setContext();
</script>

<slot />
