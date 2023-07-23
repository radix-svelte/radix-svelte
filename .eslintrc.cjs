module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'no-console': 'warn',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_|\\$\\$Props' },
		],
	},
	globals: {
		NodeJS: true,
	},
};
