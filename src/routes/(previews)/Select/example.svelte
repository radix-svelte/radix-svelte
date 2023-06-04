<script lang="ts">
	import { Select } from '$lib';
	import type { ResolvedProps } from '$lib/internal/helpers';
	import SelectItem from './SelectItem.svelte';

	export let propsObj: ResolvedProps<typeof Select>;
</script>

<Select.Root>
	<Select.Trigger
		class="hover:bg-mauve3 data-[placeholder]:text-violet9 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
		aria-label="Food"
	>
		<Select.Value placeholder="Select a fruit…" />
		<Select.Icon class="text-black">ChevronDownIcon</Select.Icon>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
		>
			<Select.ScrollUpButton
				class="flex h-[25px] cursor-default items-center justify-center bg-white text-black"
			>
				ChevronUpIcon
			</Select.ScrollUpButton>
			<Select.Viewport class="p-[5px]">
				<Select.Group>
					<Select.Label class="text-mauve11 px-[25px] text-xs leading-[25px]">Fruits</Select.Label>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
				</Select.Group>

				<Select.Separator class="bg-violet6 m-[5px] h-[1px]" />

				<Select.Group>
					<Select.Label class="text-mauve11 px-[25px] text-xs leading-[25px]">
						Vegetables
					</Select.Label>
					<SelectItem value="aubergine">Aubergine</SelectItem>
					<SelectItem value="broccoli">Broccoli</SelectItem>
					<SelectItem value="carrot" disabled>Carrot</SelectItem>
					<SelectItem value="courgette">Courgette</SelectItem>
					<SelectItem value="leek">Leek</SelectItem>
				</Select.Group>

				<Select.Separator class="bg-violet6 m-[5px] h-[1px]" />

				<Select.Group>
					<Select.Label class="text-mauve11 px-[25px] text-xs leading-[25px]">Meat</Select.Label>
					<SelectItem value="beef">Beef</SelectItem>
					<SelectItem value="chicken">Chicken</SelectItem>
					<SelectItem value="lamb">Lamb</SelectItem>
					<SelectItem value="pork">Pork</SelectItem>
				</Select.Group>
			</Select.Viewport>
			<Select.ScrollDownButton
				class="flex h-[25px] cursor-default items-center justify-center bg-white text-black"
			>
				ChevronDownIcon
			</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
</Select.Root>
