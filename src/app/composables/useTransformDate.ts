import { useDateFormat } from '@vueuse/core';

export function useTransformDate() {
	function formatDateFull(inputDate?: string) {
		if (!inputDate)
			return useDateFormat(new Date(), 'DD.MM.YYYY HH:mm', {
				locales: 'ru-RU',
			});

		const date = new Date(inputDate);
		return useDateFormat(date, 'DD.MM.YYYY HH:mm', { locales: 'ru-RU' });
	}

	function formatDate(inputDate?: string) {
		if (!inputDate)
			return useDateFormat(new Date(), 'DD.MM.YYYY', {
				locales: 'ru-RU',
			});

		const date = new Date(inputDate);
		return useDateFormat(date, 'DD.MM.YYYY', { locales: 'ru-RU' });
	}

	function formatDateHours(inputDate?: string) {
		if (!inputDate)
			return useDateFormat(new Date(), 'HH:mm', { locales: 'ru-RU' });

		const date = new Date(inputDate);
		return useDateFormat(date, 'HH:mm', { locales: 'ru-RU' });
	}

	function isToday(inputDate: string) {
		const inpDate = new Date(inputDate);
		const today = new Date();

		return (
			inpDate.getDate() === today.getDate() &&
			inpDate.getMonth() === today.getMonth() &&
			inpDate.getFullYear() === today.getFullYear()
		);
	}

	function dateOrHours(inputDate: string) {
		if (isToday(inputDate)) {
			return formatDateHours(inputDate);
		} else {
			return formatDate(inputDate);
		}
	}

	return {
		isToday,
		formatDateFull,
		formatDateHours,
		formatDate,
		dateOrHours,
	};
}
