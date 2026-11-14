import type { MessagesContextResponse, PublicMessage } from '@/shared/api';
import type { InfiniteData } from '@tanstack/vue-query';
import { computed, type ComputedRef, type Ref } from 'vue';

type MessagesGroupMap = Record<string, PublicMessage[]>;

export type VirtualDateRow = {
	type: 'date';
	key: string;
	date: string;
};

export type VirtualItemRow = {
	type: 'message';
	key: string;
	message: PublicMessage;
};

export type VirtualMessageRow = VirtualDateRow | VirtualItemRow;

type ContextInfiniteData = InfiniteData<
	MessagesContextResponse | undefined,
	unknown
>;

type Params = {
	isContext: ComputedRef<boolean> | Ref<boolean>;
	contextMessage: Ref<ContextInfiniteData | undefined>;
	messagesList: ComputedRef<MessagesGroupMap> | Ref<MessagesGroupMap>;
};

export function useChatMessagesData({
	isContext,
	contextMessage,
	messagesList,
}: Params) {
	function groupMessagesByDate(messages: PublicMessage[]): MessagesGroupMap {
		const grouped: MessagesGroupMap = {};

		for (const message of messages) {
			const dateKey = new Date(message.created_at).toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});

			if (!grouped[dateKey]) {
				grouped[dateKey] = [];
			}

			grouped[dateKey].push(message);
		}

		return grouped;
	}

	const normalizedContextMessages = computed<MessagesGroupMap>(() => {
		const data = contextMessage.value;

		if (!data?.pages?.length) {
			return {};
		}

		const messages = [...data.pages]
			.reverse()
			.flatMap((page) => page?.data ?? []);

		return groupMessagesByDate(messages);
	});

	const activeMessagesList = computed<MessagesGroupMap>(() => {
		if (isContext.value) {
			return normalizedContextMessages.value;
		}

		return messagesList.value;
	});

	const virtualRowsData = computed<VirtualMessageRow[]>(() => {
		const rows: VirtualMessageRow[] = [];

		Object.entries(activeMessagesList.value).forEach(([date, group]) => {
			rows.push({
				type: 'date',
				key: `date-${date}`,
				date,
			});

			group.forEach((message) => {
				rows.push({
					type: 'message',
					key: `message-${message.id}`,
					message,
				});
			});
		});

		return rows;
	});

	const messageIndexById = computed(() => {
		const map = new Map<number, number>();

		virtualRowsData.value.forEach((row, index) => {
			if (row.type === 'message') {
				map.set(row.message.id, index);
			}
		});

		return map;
	});

	return {
		virtualRowsData,
		messageIndexById,
		activeMessagesList,
		normalizedContextMessages,
	};
}
