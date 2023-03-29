<script lang="ts">
	import CollapsibleDemo from './CollapsibleDemo.svelte';
	import CollapsibleDemoCode from './CollapsibleDemo.svelte?raw';

	export let open = false;
	export let disabled = false;
</script>

<div class="wrapper">
	<div class="comp-preview">
		<h2 class="title">Collapsible</h2>
		<div class="content">
			<CollapsibleDemo bind:open bind:disabled />
			<details>
				<summary> Tailwind </summary>
				<pre class="overflow-auto">{CollapsibleDemoCode}</pre>
			</details>
		</div>
	</div>
</div>

<style lang="postcss">
	.wrapper {
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
