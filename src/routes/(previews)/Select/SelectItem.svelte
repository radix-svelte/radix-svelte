<script lang="ts">
	import { Select, type SelectItemProps } from '$lib';
	import { cn } from '$routes/helpers';

	type $$Props = SelectItemProps & {
		class?: string;
	};

	let className = '';
	export { className as class };
</script>

<Select.Item
	class={cn(
		'text-black data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 \
		relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none \
		data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
		className
	)}
	{...$$restProps}
>
	<Select.ItemText><slot /></Select.ItemText>
	<Select.ItemIndicator class="absolute left-0 inline-flex w-[25px] items-center justify-center">
		CheckIcon
	</Select.ItemIndicator>
</Select.Item>
