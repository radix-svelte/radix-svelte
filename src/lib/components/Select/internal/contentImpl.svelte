<script lang="ts" context="module">
	type SelectContentContext = {
		content?: HTMLElement | null;
		viewport?: HTMLElement | null;
		itemRefCallback?: (node: HTMLElement | null, value: string, disabled: boolean) => void;
		selectedItem?: HTMLElement | null;
		onItemLeave?: () => void;
		itemTextRefCallback?: (node: HTMLElement | null, value: string, disabled: boolean) => void;
		focusSelectedItem?: () => void;
		selectedItemText?: HTMLElement | null;
		position?: SelectContentProps['position'];
		isPositioned?: boolean;
		searchRef?: React.RefObject<string>;
	};

	const { getContext, setContext } = reactiveContext<SelectContentContext>();
	export const getinternalContentImplContext = getContext;
</script>
