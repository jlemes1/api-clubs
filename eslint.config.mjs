import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{ plugins: { js }, extends: ['js/recommended', 'prettier'] },
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
]);
