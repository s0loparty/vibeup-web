import assert from 'node:assert/strict';
import { test } from 'node:test';
import { shallowRef } from 'vue';
import { useScrollMessagesHandler } from '../src/shared/utils/useScrollMessagesHandler.ts';

test('preserves the visible position when older messages are inserted', async () => {
	const viewport = { scrollTop: 30, scrollHeight: 1000, clientHeight: 400 };
	const handler = useScrollMessagesHandler(shallowRef(viewport as HTMLElement));
	handler.isAutoScrolling.value = false;
	await handler.scrollHandler(
		{ target: viewport } as unknown as Event,
		async () => {
			viewport.scrollHeight = 1600;
			return {} as never;
		},
		true,
		false,
		false,
	);
	assert.equal(viewport.scrollTop, 630);
	assert.equal(handler.isLoadingOlder.value, false);
});

test('releases the loading lock if the request fails', async () => {
	const viewport = { scrollTop: 0, scrollHeight: 1000, clientHeight: 400 };
	const handler = useScrollMessagesHandler(shallowRef(viewport as HTMLElement));
	handler.isAutoScrolling.value = false;
	await assert.rejects(
		handler.scrollHandler(
			{ target: viewport } as unknown as Event,
			async () => {
				throw new Error('offline');
			},
			true,
			false,
			false,
		),
	);
	assert.equal(handler.isLoadingOlder.value, false);
});
