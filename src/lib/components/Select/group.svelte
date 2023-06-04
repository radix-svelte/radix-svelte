<script lang="ts" context="module">
	import { generateId, reactiveContext, useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';

	export type SelectGroupProps = BaseProps<'div'>;

	type SelectGroupContext = {
		id: string;
	};

	const { getContext, setContext } = reactiveContext<SelectGroupContext>({
		id: generateId(),
	});
	export const getSelectGroupContext = getContext;
</script>

<script lang="ts">
	type $$Props = SelectGroupProps;
	export let use: $$Props['use'] = [];

	const ctx = setContext();
</script>

<div role="group" aria-labelledby={$ctx.id} {...$$restProps} use:useActions={use ?? []}>
	<slot />
</div>
