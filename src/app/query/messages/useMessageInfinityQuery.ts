import { messagesIndex, type MessagesIndexData } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { messageKeys } from './message.keys';

export function useMessageInfinityQuery(
	chatId: Ref<MessagesIndexData['path']['chatId']>,
) {
	return useInfiniteQuery({
		initialPageParam: '',
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,

		queryKey: computed(() => messageKeys.list(chatId.value).queryKey),

		queryFn: async ({ pageParam }) => {
			const result = await messagesIndex({
				path: { chatId: chatId.value },
				query: { include: 'sender', cursor: pageParam },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		getNextPageParam: (lastPage) => {
			return lastPage.meta?.next_cursor ?? undefined;
		},
	});
}
