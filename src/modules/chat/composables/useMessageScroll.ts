import { useMessageInfinityQuery } from '@/app/query/messages/useMessageInfinityQuery';
import type { PublicMessage } from '@/shared/api';
import { computed, nextTick, ref, watch, type Ref } from 'vue';

export function useMessageScroll(chatId: Ref<PublicMessage['chat_id']>) {
	const isAutoScrolling = ref(true);
	// Флаг для отслеживания, что мы сейчас подгружаем старые сообщения
	const isLoadingOlder = ref(false);
	// Сохраняем ссылку на viewport для восстановления скролла
	let savedScrollHeight = 0;

	const {
		data: pages,
		isFetchingNextPage,
		isError,
		hasNextPage,
		fetchNextPage,
		isSuccess,
	} = useMessageInfinityQuery(chatId);

	const messagesList = computed(() => {
		const list = pages.value?.pages.flatMap((p) => p.data ?? []) ?? [];
		return [...list].reverse();
	});

	// Функция для восстановления позиции скролла после подгрузки
	async function restoreScrollPosition(viewport: HTMLElement) {
		await nextTick();
		const newScrollHeight = viewport.scrollHeight;
		const heightDiff = newScrollHeight - savedScrollHeight;

		if (heightDiff > 0) {
			// Оставляем небольшой отступ сверху, чтобы было видно что подгрузилось
			// но не прокручиваем на всю высоту новых сообщений
			const minimalOffset = 50;
			viewport.scrollTop += minimalOffset;
		}

		isLoadingOlder.value = false;
	}

	async function scrollHandler(event: Event) {
		const el = event.target as HTMLElement;

		if (
			!hasNextPage.value ||
			isFetchingNextPage.value ||
			!el ||
			isError.value ||
			isAutoScrolling.value ||
			isLoadingOlder.value
		)
			return;

		const distanceFromTop = el.scrollTop;
		const threshold = el.clientHeight * 1.2;

		if (distanceFromTop < threshold) {
			isLoadingOlder.value = true;
			savedScrollHeight = el.scrollHeight;

			await fetchNextPage();

			// После загрузки восстанавливаем позицию
			await restoreScrollPosition(el);
		}
	}

	// Сброс состояния при смене чата
	function resetScroll() {
		isAutoScrolling.value = true;
		isLoadingOlder.value = false;
		savedScrollHeight = 0;
	}

	watch(isAutoScrolling, (ready) => {
		if (ready) {
			isAutoScrolling.value = false;
		}
	});

	return {
		isAutoScrolling,
		pages,
		isFetchingNextPage,
		isError,
		isSuccess,
		hasNextPage,
		fetchNextPage,
		messagesList,
		scrollHandler,
		resetScroll,
		isLoadingOlder,
	};
}
