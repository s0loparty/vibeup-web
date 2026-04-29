import type ScrollArea from '@/app/components/ui/scroll-area/ScrollArea.vue';
import { ref, type Ref } from 'vue';

export function useChatScroll(
	scrollAreaRef: Ref<InstanceType<typeof ScrollArea> | null>,
) {
	const showScrollBtn = ref(false);

	function getViewport(): HTMLElement | null {
		if (!scrollAreaRef.value) return null;

		return scrollAreaRef.value.$el?.querySelector(
			'[data-slot="scroll-area-viewport"]',
		) as HTMLElement | null;
	}

	function handleScroll(event: Event) {
		const target = event.target as HTMLElement;

		if (!target) {
			return;
		}

		showScrollBtn.value =
			target.scrollHeight - target.scrollTop - target.clientHeight > 100;
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

	return {
		showScrollBtn,
		handleScroll,
		scrollToBottom,
	};
}
