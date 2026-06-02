import { useMessageContextSearchInfiniteQuery } from '@/app/query/messages/useMessageContextSearchInfiniteQuery';
import { useMessageSearchInfiniteQuery } from '@/app/query/messages/useMessageSearchInfiniteQuery';
import { watchDebounced } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, toRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useChatMessagesStore } from '../stores/useChatMessagesStore';

export function useMessageSearchInput() {
	const { searchInput, contextMessageId } = storeToRefs(useChatMessagesStore());
	const chatMessagesStore = useChatMessagesStore();
	const route = useRoute<'chat-window'>();

	const chatId = computed(() => Number(route.params.id));

	const {
		data: contextMessage,
		refetch: contextRefetch,
		isPending: contextIsPending,
		isError: contextIsError,
		isLoading: contextIsLoading,
		hasNextPage: contextHasNextPage,
		isFetchingNextPage: contextIsFetchingNextPage,
		fetchNextPage: contextFetchNextPage,
	} = useMessageContextSearchInfiniteQuery(toRef(chatId), contextMessageId);

	watch(contextMessageId, (newMessageId) => {
		if (!newMessageId) return;
		contextRefetch();
	});

	watch(contextMessage, (newContext) => {
		if (!newContext || !newContext.pages[0]?.data) return;
		chatMessagesStore.setMessages(newContext.pages[0]?.data!);
	});

	const {
		data: findedMessages,
		refetch: findedRefetch,
		isLoading: findedIsLoading,
		hasNextPage: findedHasNextPage,
		isError: findedIsError,
		isFetchingNextPage: findedIsFetchingNextPage,
		fetchNextPage: findedFetchNextPage,
	} = useMessageSearchInfiniteQuery(toRef(chatId), searchInput);

	const findedMsg = computed(() => {
		return findedMessages.value?.pages.flatMap((p) => p?.data ?? []) ?? [];
	});

	watchDebounced(
		searchInput,
		(newSearchInput) => {
			if (newSearchInput.length === 0) return;
			findedRefetch();
		},
		{ debounce: 500 },
	);

	return {
		findedIsLoading,
		findedHasNextPage,
		findedIsError,
		findedMsg,
		findedIsFetchingNextPage,
		findedFetchNextPage,
		searchInput,
		contextMessage,
		contextIsPending,
		contextIsError,
		contextIsLoading,
		contextHasNextPage,
		contextIsFetchingNextPage,
		contextFetchNextPage,
	};
}
