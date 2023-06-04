import { contextUpdater, elementDerived } from '$lib/internal/stores';
import type { WritableObject } from '$lib/internal/types';
import { derived, writable } from 'svelte/store';

type CreateCollapsibleArgs = {
	onChange?: (open: boolean) => void;
} & CollapsibleRootProps;

export type CollapsibleRootProps = {
    open?: boolean;
    disabled?: boolean;
};

type CollapsibleProps = Required<CollapsibleRootProps>; // Add subcomponent props

export function createCollapsible(args?: CreateCollapsibleArgs) {

    const ctx: WritableObject<CollapsibleProps> = {
        open: writable(args?.open),
        disabled: writable(args?.disabled)
    };

	ctx.open.subscribe((open) => {
		args?.onChange?.(open);
	});

    const root = derived([ctx.open, ctx.disabled], ([$open, $disabled]) => ({
		'data-state': $open ? 'open' : 'closed',
		'data-disabled': $disabled ? 'true' : 'undefined',
	}));

	const trigger = elementDerived([ctx.open, ctx.disabled], ([$open, $disabled], attach) => {
		if (!$disabled) {
			attach('click', () => ctx.open.set(!$open));
		}

		return {
			'data-state': $open ? 'open' : 'closed',
			'data-disabled': $disabled ? 'true' : undefined,
		};
	});

	const content = derived([ctx.open, ctx.disabled], ([$open, $disabled]) => ({
		'data-state': $open ? 'open' : 'closed',
		'data-disabled': $disabled ? 'true' : undefined,
		hidden: $open ? undefined : true,
	}));

    return Object.assign(contextUpdater(ctx), {
		root,
		trigger,
		content,
		open: ctx.open,
	});
}
