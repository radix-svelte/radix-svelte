<script lang="ts" context="module">
	import type { DialogTitleProps } from '../Dialog';

	export type AlertDialogTitleProps = DialogTitleProps;
</script>

<script lang="ts">
	import { Dialog } from '../Dialog';

	type $$Props = AlertDialogTitleProps;
</script>

<Dialog.Title {...$$restProps}>
	<slot />
</Dialog.Title>
