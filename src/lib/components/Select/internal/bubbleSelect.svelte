<script lang="ts" context="module">
	import type { BaseProps } from '$lib/internal/types';
	export type internalBubbleSelectProps = BaseProps<'select'> & {
		ref?: HTMLSelectElement;
	};
</script>

<script lang="ts">
	import { isBrowser, mergeStyles, useActions, visuallyHiddenStyles } from '$lib/internal/helpers';
	import { withPrevious } from '$lib/internal/stores/withPrevious';

	type $$Props = internalBubbleSelectProps;
	export let use: $$Props['use'] = [];
	export let style: $$Props['style'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let ref: $$Props['ref'] = undefined;

	const mimicDefaultValue = value;

	const valueStore = withPrevious(value);
	$: valueStore.set(value);

	// Bubble value change to parents (e.g form change event)
	$: (() => {
		if (!isBrowser) return;
		const select = ref;
		const selectProto = window.HTMLSelectElement.prototype;
		const descriptor = Object.getOwnPropertyDescriptor(selectProto, 'value') as PropertyDescriptor;
		const setValue = descriptor.set;
		if ($valueStore.previous !== value && setValue) {
			const event = new Event('change', { bubbles: true });
			setValue.call(select, value);
			select?.dispatchEvent(event);
		}
	})();
</script>

<!-- 
  We purposefully use a `select` here to support form autofill as much
  as possible.
  
  We purposefully do not add the `value` attribute here to allow the value
  to be set programatically and bubble to any parent form `onChange` event.
  Adding the `value` will cause React to consider the programatic
  dispatch a duplicate and it will get swallowed.

  We use `VisuallyHidden` rather than `display: "none"` because Safari autofill
  won't work otherwise.
 -->
<select
	{...$$restProps}
	bind:this={ref}
	use:useActions={use ?? []}
	style={mergeStyles(visuallyHiddenStyles, style)}
	value={mimicDefaultValue}
>
	<slot />
</select>
