import { useMessageInfinityQuery } from '@/app/query/messages/useMessageInfinityQuery';
import type { PublicMessage } from '@/shared/api';
import { computed, type Ref } from 'vue';

export function useMessageScroll(chatId: Ref<PublicMessage['chat_id']>) {
	const {
		data: pages,
		isFetchingNextPage,
		isError,
		hasNextPage,
		fetchNextPage,
		isSuccess,
		isPending,
	} = useMessageInfinityQuery(chatId);

	const messagesList = computed(() => {
		const list = pages.value?.pages.flatMap((page) => page.data ?? []) ?? [];

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
