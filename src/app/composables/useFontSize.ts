import { useLocalStorage, watchDebounced } from '@vueuse/core';
import { onMounted } from 'vue';

export const useFontSize = () => {
	const DEFAULT_FONT_SIZE = 16;
	const MIN_FONT_SIZE = 12;
	const MAX_FONT_SIZE = 24;

	// Храним размер текста в localStorage
	const fontSize = useLocalStorage('font-size', DEFAULT_FONT_SIZE);

	// Применяем размер текста к root элементу
	const setHtmlFontSize = (size?: number) => {
		const value = size ?? fontSize.value;
		document.documentElement.style.fontSize = `${value}px`;
	};

	// Сброс к дефолтному размеру
	const resetFontSize = () => {
		setHtmlFontSize(DEFAULT_FONT_SIZE);
		fontSize.value = DEFAULT_FONT_SIZE;
	};

	// При изменении fontSize обновляем root элемент (с debounce)
	watchDebounced(fontSize, setHtmlFontSize, { debounce: 500 });

	// При монтировании применяем сохранённый размер
	onMounted(setHtmlFontSize);

	return {
		fontSize,
		setHtmlFontSize,
		resetFontSize,
		MIN_FONT_SIZE,
		MAX_FONT_SIZE,
	};
};
