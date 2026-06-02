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

	return {
		isError,
		isFetchingNextPage,
		hasNextPage,
		status,
		error,
		chats,
		fetchNextPage,
	};
}
