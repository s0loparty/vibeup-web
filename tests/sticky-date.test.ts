import assert from 'node:assert/strict';
import { test } from 'node:test';
import { computed, ref } from 'vue';
import { useStickyDate } from '../src/modules/chat/composables/useStickyDate.ts';

const rows = [
	{ type: 'date', key: 'date-13', date: '13.11.2026' },
	{ type: 'message', key: 'message-1', message: { id: 1 } },
] as never;
const items = [
	{ index: 0, start: 0, end: 48 },
	{ index: 1, start: 48, end: 148 },
] as never;

test('does not duplicate the date when its divider is visible', () => {
	const viewport = ref({ scrollTop: 0, clientHeight: 400 } as HTMLElement);
	const { stickyDate } = useStickyDate({
		scrollViewportRef: viewport,
		virtualRowsData: computed(() => rows),
		getVirtualItems: () => items,
	});
	assert.equal(stickyDate.value, null);
});

test('shows the floating date after its divider scrolls out of view', () => {
	const viewport = ref({ scrollTop: 60, clientHeight: 400 } as HTMLElement);
	const { stickyDate } = useStickyDate({
		scrollViewportRef: viewport,
		virtualRowsData: computed(() => rows),
		getVirtualItems: () => items,
	});
	assert.equal(stickyDate.value, '13.11.2026');
});

test('keeps the current floating date when the next date divider is visible', () => {
	const viewport = ref({ scrollTop: 60, clientHeight: 400 } as HTMLElement);
	const { stickyDate } = useStickyDate({
		scrollViewportRef: viewport,
		virtualRowsData: computed(
			() =>
				[
					{ type: 'date', key: 'date-13', date: '13.11.2026' },
					{ type: 'message', key: 'message-1', message: { id: 1 } },
					{ type: 'date', key: 'date-14', date: '14.11.2026' },
				] as never,
		),
		getVirtualItems: () =>
			[
				{ index: 0, start: 0, end: 48 },
				{ index: 1, start: 48, end: 148 },
				{ index: 2, start: 148, end: 196 },
			] as never,
	});
	assert.equal(stickyDate.value, '13.11.2026');
});
