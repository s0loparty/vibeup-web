import { useChatInfiniteQuery } from '@/app/query/chat/useChatInfiniteQuery';
import type { ChatsIndexData } from '@/shared/api';
import { computed } from 'vue';

export function useUserChatList(options?: ChatsIndexData['query']) {
	const {
		data: pages,
		hasNextPage,
		fetchNextPage,
		status,
		isFetchingNextPage,
		isError,
		error,
	} = useChatInfiniteQuery(options);

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
