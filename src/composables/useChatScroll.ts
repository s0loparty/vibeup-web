import type ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { onMounted, ref, type Ref } from 'vue';

export function useChatScroll(
	scrollAreaRef: Ref<InstanceType<typeof ScrollArea> | null>,
) {
	const showScrollBtn = ref(false);

	function handleScroll(event: Event) {
		const target = event.target as HTMLElement;

		if (!target) {
			return;
		}

		showScrollBtn.value =
			target.scrollHeight - target.scrollTop - target.clientHeight > 100;
	}

	function scrollToBottom() {
		if (scrollAreaRef.value) {
			const viewport = scrollAreaRef.value.$el?.querySelector(
				'[data-slot="scroll-area-viewport"]',
			);

			if (viewport) {
				viewport.scrollTo({
					top: viewport.scrollHeight,
					behavior: 'smooth',
				});
			}
		}
	}

	onMounted(() => {
		scrollToBottom();
	});

	return {
		showScrollBtn,
		handleScroll,
		scrollToBottom,
	};
}
