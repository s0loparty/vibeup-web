import { useMessageInfinityQuery } from '@/app/query/messages/useMessageInfinityQuery';
import { useChatMessagesStore } from '@/modules/messages/stores/useChatMessagesStore';
import type { PublicMessage } from '@/shared/api';
import { computed, watch, type Ref } from 'vue';

export function useMessageScroll(chatId: Ref<PublicMessage['chat_id']>) {
	const chatMessagesStore = useChatMessagesStore();

	const {
		data: pages,
		isFetchingNextPage,
		isError,
		hasNextPage,
		fetchNextPage,
		isSuccess,
		isPending,
	} = useMessageInfinityQuery(chatId);

	watch(pages, (newPages) => {
		if (!newPages || newPages.pages.length === 0) return;
		const list = pages.value?.pages.flatMap((p) => p.data ?? []) ?? [];
		chatMessagesStore.setMessages(list);
	});

	const messagesList = computed(() => {
		// const list = pages.value?.pages.flatMap((p) => p.data ?? []) ?? [];

		const list = chatMessagesStore.messages;

		return [...list].reverse().reduce(
			(prev, curr) => {
				const dateKey = new Date(curr.created_at).toLocaleDateString('ru-RU');
				if (!prev[dateKey]) {
					prev[dateKey] = [curr];
				} else {
					prev[dateKey].push(curr);
				}

				return prev;
			},
			{} as { [key: string]: PublicMessage[] },
		);
	});

	return {
		pages,
		isFetchingNextPage,
		isError,
		isSuccess,
		hasNextPage,
		fetchNextPage,
		messagesList,
		isPending,
	};
}
