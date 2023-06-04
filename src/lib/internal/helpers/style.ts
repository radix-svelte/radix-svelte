type StyleObject = Record<string, number | string | undefined>;

export function styleToString(style: StyleObject): string {
	return Object.keys(style).reduce((str, key) => {
		if (style[key] === undefined) return str;
		return str + `${key}:${style[key]};`;
	}, '');
}

export function mergeStyles(...styles: Array<StyleObject | string | null | undefined>): string {
	return styles.reduce<string>((acc, style) => {
		if (typeof style === 'string') return acc + style;
		else if (style === null || style === undefined) return acc;
		return acc + styleToString(style);
	}, '');
}
