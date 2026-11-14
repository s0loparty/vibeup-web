import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ref } from 'vue';
import { useChatMessagesData } from '../src/modules/chat/composables/useChatMessagesData.ts';

test('prepends older context pages in chronological order', () => {
	const message = (id: number) => ({ id, created_at: '2026-01-01T12:00:00Z' });
	const { virtualRowsData } = useChatMessagesData({
		isContext: ref(true),
		contextMessage: ref({
			pages: [
				{ data: [message(3), message(4)] },
				{ data: [message(1), message(2)] },
			],
			pageParams: [],
		}),
		messagesList: ref({}),
	} as never);
	assert.deepEqual(
		virtualRowsData.value
			.filter((row) => row.type === 'message')
			.map((row) => row.message.id),
		[1, 2, 3, 4],
	);
});
