<script lang="ts" context="module">
	import { reactiveContext, useActions } from '$lib/internal/helpers';
	import type { BaseProps } from '$lib/internal/types';

	type Direction = 'ltr' | 'rtl';

	const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
	const SELECTION_KEYS = [' ', 'Enter'];

	type SelectRootContext = {
		trigger: HTMLButtonElement | null;
		onTriggerChange(node: HTMLButtonElement | null): void;
		valueNode: HTMLSpanElement | null;
		onValueNodeChange(node: HTMLSpanElement): void;
		valueNodeHasChildren: boolean;
		onValueNodeHasChildrenChange(hasChildren: boolean): void;
		contentId: string;
		value?: string;
		onValueChange(value: string): void;
		open: boolean;
		required?: boolean;
		onOpenChange(open: boolean): void;
		dir: SelectRootProps['dir'];
		triggerPointerDownPos: { x: number; y: number } | null;
		disabled?: boolean;
	};

	const { getContext, setContext } = reactiveContext<SelectRootContext>();
	export const getSelectRootContext = getContext;

	export type SelectRootProps = BaseProps<'div'> & {
		value?: string;
		open?: boolean;
		dir?: Direction;
		name?: string;
		autoComplete?: string;
		disabled?: boolean;
		required?: boolean;
	};
</script>

<script lang="ts">
	type $$Props = SelectRootProps;
	export let use: $$Props['use'] = [];
</script>

<div {...$$restProps} use:useActions={use ?? []}>
	<slot />
</div>
