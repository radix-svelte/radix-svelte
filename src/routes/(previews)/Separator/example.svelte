<script lang="ts">
	import { Separator } from '$lib';
	import type { ResolvedProps } from '$lib/internal/helpers';

	export let propsObj: ResolvedProps<typeof Separator>;
</script>

<div class="mx-4 w-full max-w-xs">
	<div class="font-bold text-white">Radix Svelte</div>
	<div class="text-base text-white">An open-source UI component library.</div>
	<Separator.Root
		class="my-[15px] bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
		orientation={propsObj.Root.orientation}
	/>
	<div class="flex h-5 items-center">
		<div class="text-base text-white">Blog</div>
		<Separator.Root
			class="mx-[15px] bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
			decorative
			orientation="vertical"
		/>
		<div class="text-base text-white">Docs</div>
		<Separator.Root
			class="mx-[15px] bg-white data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px"
			decorative
			orientation="vertical"
		/>
		<div class="text-base text-white">Source</div>
	</div>
</div>
