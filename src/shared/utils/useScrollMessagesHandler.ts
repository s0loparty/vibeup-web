import type ScrollArea from '@/app/components/ui/scroll-area/ScrollArea.vue';
import type { InfiniteQueryObserverResult } from '@tanstack/vue-query';
import { nextTick, ref, watch, type Ref } from 'vue';

export function useScrollMessagesHandler(
	scrollAreaRef: Ref<InstanceType<typeof ScrollArea> | null>,
) {
	const isAutoScrolling = ref(true);
	// Флаг для отслеживания, что мы сейчас подгружаем старые сообщения
	const isLoadingOlder = ref(false);
	// Сохраняем ссылку на viewport для восстановления скролла
	let savedScrollHeight = 0;

	const showScrollBtn = ref(false);

	function updateScrollButton(event: Event) {
		const target = event.target as HTMLElement;

		if (!target) {
			return;
		}

		showScrollBtn.value =
			target.scrollHeight - target.scrollTop - target.clientHeight > 100;
	}

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

	async function scrollHandler(
		event: Event,
		cb: () => Promise<InfiniteQueryObserverResult>,
		hasNextPage: boolean,
		isFetchingNextPage: boolean,
		isError: boolean,
	) {
		const el = event.target as HTMLElement;

		if (
			!hasNextPage ||
			isFetchingNextPage ||
			!el ||
			isError ||
			isAutoScrolling.value ||
			isLoadingOlder.value
		)
			return;

		const distanceFromTop = el.scrollTop;
		const threshold = el.clientHeight * 1.2;

		if (distanceFromTop < threshold) {
			isLoadingOlder.value = true;
			savedScrollHeight = el.scrollHeight;

			await cb();

			await restoreScrollPosition(el);
		}
	}

	// Сброс состояния при смене чата
	function resetScroll() {
		isAutoScrolling.value = true;
		isLoadingOlder.value = false;
		savedScrollHeight = 0;
	}

	function getViewport(): HTMLElement | null {
		if (!scrollAreaRef.value) return null;

		return scrollAreaRef.value.$el?.querySelector(
			'[data-slot="scroll-area-viewport"]',
		) as HTMLElement | null;
	}

	function scrollToBottom() {
		const viewport = getViewport();
		if (viewport) {
			viewport.scrollTo({
				top: viewport.scrollHeight,
				behavior: 'smooth',
			});
		}
	}

	watch(isAutoScrolling, (ready) => {
		if (ready) {
			isAutoScrolling.value = false;
		}
	});

	return {
		showScrollBtn,
		isAutoScrolling,
		isLoadingOlder,
		scrollHandler,
		resetScroll,
		scrollToBottom,
		updateScrollButton,
	};
}
