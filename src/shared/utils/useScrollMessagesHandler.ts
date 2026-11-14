import type { InfiniteQueryObserverResult } from '@tanstack/vue-query';
import { nextTick, ref, type Ref } from 'vue';

export function useScrollMessagesHandler(
	scrollViewportRef: Ref<HTMLElement | null>,
) {
	const isAutoScrolling = ref(true);
	const isLoadingOlder = ref(false);
	const showScrollBtn = ref(false);

	let savedScrollHeight = 0;
	let savedScrollTop = 0;
	let restoreGeneration = 0;

	function getViewport(): HTMLElement | null {
		return scrollViewportRef.value;
	}

	function updateScrollButton(event?: Event) {
		const target = (event?.target as HTMLElement | null) ?? getViewport();

		if (!target) {
			return;
		}

		showScrollBtn.value =
			target.scrollHeight - target.scrollTop - target.clientHeight > 100;
	}

	async function restoreScrollPosition(
		viewport: HTMLElement,
		generation: number,
	) {
		await nextTick();
		if (generation !== restoreGeneration || getViewport() !== viewport) return;

		const newScrollHeight = viewport.scrollHeight;
		const heightDiff = newScrollHeight - savedScrollHeight;

		if (heightDiff > 0) {
			viewport.scrollTop = savedScrollTop + heightDiff;
		}

		isLoadingOlder.value = false;
		updateScrollButton();
	}

	async function scrollHandler(
		event: Event,
		cb: () => Promise<InfiniteQueryObserverResult>,
		hasNextPage: boolean,
		isFetchingNextPage: boolean,
		isError: boolean,
	) {
		const el = event.target as HTMLElement | null;

		if (
			!el ||
			!hasNextPage ||
			isFetchingNextPage ||
			isError ||
			isAutoScrolling.value ||
			isLoadingOlder.value
		) {
			return;
		}

		const distanceFromTop = el.scrollTop;
		const threshold = el.clientHeight * 1.2;

		if (distanceFromTop < threshold) {
			isLoadingOlder.value = true;
			savedScrollHeight = el.scrollHeight;
			savedScrollTop = el.scrollTop;
			const generation = restoreGeneration;

			try {
				await cb();
				if (getViewport() === el && generation === restoreGeneration) {
					await restoreScrollPosition(el, generation);
				}
			} finally {
				isLoadingOlder.value = false;
			}
		}
	}

	function cancelPendingRestore() {
		restoreGeneration++;
	}

	function resetScroll() {
		cancelPendingRestore();
		isAutoScrolling.value = true;
		isLoadingOlder.value = false;
		savedScrollHeight = 0;
		savedScrollTop = 0;
		showScrollBtn.value = false;
	}

	function scrollToBottom(options?: ScrollToOptions) {
		const viewport = getViewport();

		if (!viewport) {
			return;
		}

		viewport.scrollTo({
			top: viewport.scrollHeight,
			behavior: options?.behavior ?? 'smooth',
		});
	}

	return {
		showScrollBtn,
		isAutoScrolling,
		isLoadingOlder,
		scrollHandler,
		resetScroll,
		cancelPendingRestore,
		scrollToBottom,
		updateScrollButton,
		getViewport,
	};
}
