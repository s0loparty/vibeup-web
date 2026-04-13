import { chatsIndex } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { chatKeys } from './chat.keys';

export function useChatQuery() {
	return useInfiniteQuery({
		queryKey: chatKeys.list().queryKey,

		initialPageParam: '',

		refetchOnMount: false,

		queryFn: ({ pageParam }) => {
			console.log('REQUEST cursor:', pageParam);

			return chatsIndex({
				query: {
					cursor: pageParam,
				},
			});
		},

		getNextPageParam: (lastPage) => {
			return lastPage.data?.meta?.next_cursor || undefined;
		},
	});
}
