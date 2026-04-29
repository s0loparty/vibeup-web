import { chatsShow, type ChatsShowData } from '@/shared/api';
import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { chatKeys } from './chat.keys';

export function useChatShowQuery(chatId: Ref<ChatsShowData['path']['chat']>) {
	return useQuery({
		staleTime: Infinity,
		refetchOnMount: false,

		queryKey: computed(() => chatKeys.show(chatId.value).queryKey),

		queryFn: async () => {
			const result = await chatsShow({
				path: { chat: chatId.value },
				query: { include: 'members' },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},
	});
}
