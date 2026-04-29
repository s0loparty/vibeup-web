import { useChatQuery } from '@/app/query/chat/useChatQuery';
import { computed } from 'vue';

export function useUserChatListScroll() {
	const {
		data: pages,
		hasNextPage,
		fetchNextPage,
		status,
		isFetchingNextPage,
		isError,
		error,
	} = useChatQuery();

	const chats = computed(() => {
		return pages.value?.pages.flatMap((p) => p.data?.data ?? []) ?? [];
	});

	function scrollHandler(event: Event) {
		const el = event.target as HTMLElement;

		if (!hasNextPage || isFetchingNextPage.value || !el || isError.value)
			return;

		const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
		const threshold = el.clientHeight * 1.5;

		if (distanceFromBottom < threshold) {
			fetchNextPage();
		}
	}

	return {
		isError,
		isFetchingNextPage,
		status,
		error,
		chats,
		scrollHandler,
	};
}
