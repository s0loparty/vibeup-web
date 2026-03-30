import { useLocalStorage, watchDebounced } from '@vueuse/core';
import { onMounted } from 'vue';

export const useAppColor = () => {
	const COLOR_BRAND_KEY = '--color-brand-500';
	const DEFAULT_COLOR = '#78a5aa';

	const appColor = useLocalStorage('app-color', DEFAULT_COLOR);

	const setHtmlColor = (newColor?: string) => {
		document
			.querySelector('html')
			?.setAttribute(
				'style',
				`${COLOR_BRAND_KEY}:${newColor || appColor.value}`,
			);
	};

	const resetColor = () => {
		setHtmlColor(DEFAULT_COLOR);
		appColor.value = DEFAULT_COLOR;
	};

	watchDebounced(appColor, setHtmlColor, { debounce: 500 });

	onMounted(() => {
		const value = getComputedStyle(document.documentElement)
			.getPropertyValue(COLOR_BRAND_KEY)
			.trim();

		appColor.value = value;
	});

	return { appColor, setHtmlColor, resetColor };
};
