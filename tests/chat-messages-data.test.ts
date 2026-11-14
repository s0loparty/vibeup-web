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

test('groups context messages by their local calendar date', () => {
	const first = new Date(2026, 0, 1, 12).toISOString();
	const second = new Date(2026, 0, 2, 12).toISOString();
	const { virtualRowsData } = useChatMessagesData({
		isContext: ref(true),
		contextMessage: ref({
			pages: [
				{
					data: [
						{ id: 1, created_at: first },
						{ id: 2, created_at: second },
					],
				},
			],
			pageParams: [],
		}),
		messagesList: ref({}),
	} as never);
	assert.deepEqual(
		virtualRowsData.value.map((row) =>
			row.type === 'date' ? row.date : row.message.id,
		),
		['01.01.2026', 1, '02.01.2026', 2],
	);
});
