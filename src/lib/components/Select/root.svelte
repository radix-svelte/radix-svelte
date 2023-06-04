<script lang="ts" context="module">
	import { Popper } from '$lib/internal/components';
	import {
		generateId,
		reactiveContext,
		uniqueContext,
		type Defaults,
		collectionContext,
	} from '$lib/internal/helpers';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Direction = 'ltr' | 'rtl';

	export const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
	export const SELECTION_KEYS = [' ', 'Enter'];

	type SelectRootContext = {
		value?: string;
		open: boolean;
		dir: SelectRootProps['dir'];
		disabled?: boolean;
		required?: boolean;
		trigger: HTMLButtonElement | null;
		valueNode: HTMLSpanElement | null;
		valueNodeHasChildren: boolean;
		contentId: string;
		triggerPointerDownPos: { x: number; y: number } | null;
	};

	const defaults = {
		open: false,
		dir: 'ltr',
		trigger: null,
		valueNode: null,
		valueNodeHasChildren: false,
		contentId: generateId(),
		triggerPointerDownPos: null,
	} satisfies Defaults<SelectRootContext>;

	const { getContext, setContext } = reactiveContext<SelectRootContext>(defaults);
	export const getSelectRootContext = getContext;

	type NativeOption = SvelteHTMLElements['option'];

	export type SelectNativeOptionsContextValue = {
		onNativeOptionAdd(option: NativeOption): void;
		onNativeOptionRemove(option: NativeOption): void;
	};

	export const {
		getContext: getSelectNativeOptionsContext,
		setContext: setSelectNativeOptionsContext,
	} = uniqueContext<SelectNativeOptionsContextValue>();

	const itemCollection = collectionContext();
	export const getSelectItemCollection = itemCollection.getContext;

	export type SelectRootProps = {
		value?: string;
		open?: boolean;
		dir?: Direction;
		name?: string;
		autocomplete?: string;
		disabled?: boolean;
		required?: boolean;
	};
</script>

<script lang="ts">
	import BubbleSelect from './internal/bubbleSelect.svelte';

	type $$Props = SelectRootProps;
	export let value: $$Props['value'] = undefined;
	export let open: $$Props['open'] = defaults.open;
	export let dir: $$Props['dir'] = defaults.dir;
	export let name: $$Props['name'] = undefined;
	export let autocomplete: $$Props['autocomplete'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let required: $$Props['required'] = undefined;

	const ctx = setContext({
		value: (v) => (value = v),
		open: (o) => (open = o),
	});
	$: ctx.set({
		value,
		open,
		dir,
		disabled,
		required,
	});

	// We set this to true by default so that events bubble to forms without JS (SSR)
	$: isFormControl = $ctx.trigger ? Boolean($ctx.trigger.closest('form')) : true;
	let nativeOptionsSet = new Set<NativeOption>();

	// The native `select` only associates the correct default value if the corresponding
	// `option` is rendered as a child **at the same time** as itself.
	// Because it might take a few renders for our items to gather the information to build
	// the native `option`(s), we generate a key on the `select` to make sure React re-builds it
	// each time the options change.
	$: nativeSelectKey = Array.from(nativeOptionsSet)
		.map((option) => option.value)
		.join(';');

	setSelectNativeOptionsContext({
		onNativeOptionAdd(option) {
			nativeOptionsSet.add(option);
		},
		onNativeOptionRemove(option) {
			nativeOptionsSet.delete(option);
		},
	});

	itemCollection.setContext();
</script>

<Popper.Root>
	<slot />
</Popper.Root>

{#if isFormControl}
	{#key nativeSelectKey}
		<BubbleSelect
			aria-hidden
			{required}
			tabindex={-1}
			{name}
			{autocomplete}
			{value}
			on:change={(event) => ($ctx.value = event.target.value)}
			{disabled}
		>
			{#if value === undefined}
				<option value="" />
			{/if}
			{#each Array.from(nativeOptionsSet) as option}
				<option value={option.value} />
			{/each}
		</BubbleSelect>
	{/key}
{/if}
