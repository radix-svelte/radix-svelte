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
		padding: theme('spacing.4');

		@media screen('md') {
			grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
		}
	}

	.comp-preview {
		display: flex;
		flex-direction: column;
		gap: theme('spacing.2');

		.content {
			background-image: linear-gradient(
				330deg,
				theme('colors.purple.500') 0%,
				theme('colors.indigo.800') 100%
			);

			border-radius: theme('borderRadius.lg');

			padding: theme('spacing.8');

			@media screen('md') {
				padding: theme('spacing.16');
			}
		}

		.title {
			color: theme('colors.white');
			font-size: theme('fontSize.2xl');
			font-weight: theme('fontWeight.bold');
		}
	}
</style>
