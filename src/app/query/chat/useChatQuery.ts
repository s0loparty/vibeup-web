import type { ChatWithLastMessage } from '@/app/types/api';
import { chatsIndex, type CursorPaginationMeta } from '@/shared/api';
import { useQuery } from '@tanstack/vue-query';
import { chatKeys } from './chat.keys';

export function useChatQuery() {
	return useQuery({
		queryKey: chatKeys.list().queryKey,

		select(data) {
			return data.data as {
				meta: CursorPaginationMeta;
				data: ChatWithLastMessage[];
			};
		},

		queryFn: () => {
			return chatsIndex({
				query: {
					include: 'lastMessage,members',
				},
			});
		},
	});
}
