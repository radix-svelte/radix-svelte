<script lang="ts">
	import Collapsible from './Collapsible.svelte';
	import CollapsibleCode from './Collapsible.svelte?raw';

	export let open = false;
	export let disabled = false;
</script>

<main>
	<article class="max-w-screen-md w-full">
		<div class="max-w-80">
			<div class="flex flex-col items-start gap-2">
				<p>
					Outer open: {open}
				</p>
				<button
					class="bg-white text-violet-500 rounded-md px-2 py-1"
					on:click={() => (open = !open)}
				>
					Outer open toggle
				</button>

				<p>
					Outer disabled: {disabled}
				</p>
				<button
					class="bg-white text-violet-500 rounded-md px-2 py-1"
					on:click={() => (disabled = !disabled)}
				>
					Outer disabled toggle
				</button>
			</div>

			<hr class="my-2" />
		</div>

		<Collapsible bind:open bind:disabled />
		<details>
			<summary> Tailwind </summary>
			<pre class="overflow-auto">{CollapsibleCode}</pre>
		</details>
	</article>
</main>

<style lang="postcss">
	main {
		background-image: linear-gradient(
			330deg,
			theme('colors.purple.500') 0%,
			theme('colors.indigo.800') 100%
		);

		display: grid;
		place-items: center;
		padding: theme('spacing.16');
	}
</style>
