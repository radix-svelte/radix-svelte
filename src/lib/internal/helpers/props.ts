export function styleObject(
	style: Record<string, unknown> | string | null | undefined
): Record<string, unknown> {
	if (style == null) return {};
	if (typeof style === 'object') return style;
	return Object.fromEntries(
		style
			.split(';')
			.filter((s) => s !== '')
			.map((kv) => kv.split(':').map((t) => t.trim()))
	);
}

export function styleString(style: Record<string, unknown> | string | null | undefined): string {
	if (style == null) return '';
	if (typeof style === 'string') return style;
	return Object.entries(style)
		.map(([k, v]) => `${k}:${v}`)
		.join(';');
}

type AnyProps = Record<string, any>;

export function mergeSvelteProps(parentProps: AnyProps, ...manyChildProps: AnyProps[]) {
	const mergedProps = { ...parentProps };
	for (const childProps of manyChildProps) {
		// All child props should override.
		const overrideProps = { ...childProps };

		for (const propName in childProps) {
			const mergedPropValue = mergedProps[propName];
			const childPropValue = childProps[propName];

			if (propName === 'style') {
				overrideProps[propName] = styleString({
					...styleObject(mergedPropValue),
					...styleObject(childPropValue),
				});
			} else if (propName === 'class') {
				overrideProps[propName] = [mergedPropValue, childPropValue].filter(Boolean).join(' ');
			}
		}

		Object.assign(mergedProps, overrideProps);
	}
	return mergedProps;
}
