import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from '@vue/eslint-config-typescript';
import skipFormatting from 'eslint-config-prettier/flat';
import pluginOxlint from 'eslint-plugin-oxlint';
import pluginVue from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{vue,ts,mts,tsx}'],
	},

	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	...pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,

	...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

	skipFormatting,

	{
		files: ['src/app/components/ui/**/*.vue'],
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	},

	{
		// Указываем путь к сгенерированным файлам
		files: ['src/shared/api/**/*.ts'],
		rules: {
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					// Для этих файлов разрешаем expect-error БЕЗ описания
					'ts-expect-error': false,
					'ts-ignore': 'allow-with-description',
					minimumDescriptionLength: 3,
				},
			],
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
);
