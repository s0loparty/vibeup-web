import { useVirtualizer } from '@tanstack/vue-virtual';
import {
	computed,
	type ComponentPublicInstance,
	type ComputedRef,
	type Ref,
} from 'vue';
import type { VirtualMessageRow } from './useChatMessagesData';

export type VirtualRenderRow = {
	key: string;
	index: number;
	start: number;
	row: VirtualMessageRow | undefined;
};

type Params = {
	scrollViewportRef: Ref<HTMLElement | null>;
	virtualRowsData: ComputedRef<VirtualMessageRow[]>;
};

export function useChatMessagesVirtualizer({
	scrollViewportRef,
	virtualRowsData,
}: Params) {
	const rowVirtualizer = useVirtualizer(
		computed(() => ({
			count: virtualRowsData.value.length,
			getScrollElement: () => scrollViewportRef.value,
			getItemKey: (index: number) =>
				virtualRowsData.value[index]?.key ?? `${index}`,
			estimateSize: (index: number) => {
				const row = virtualRowsData.value[index];

				if (row?.type === 'date') {
					return 48;
				}

				return 92;
			},
			overscan: 10,
		})),
	);

	const virtualRows = computed<VirtualRenderRow[]>(() => {
		return rowVirtualizer.value.getVirtualItems().map((virtualRow) => ({
			key: String(virtualRow.key),
			index: virtualRow.index,
			start: virtualRow.start,
			row: virtualRowsData.value[virtualRow.index],
		}));
	});

	const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

	function measureRowElement(el: Element | ComponentPublicInstance | null) {
		if (!el) {
			return;
		}

		if (el instanceof HTMLElement) {
			rowVirtualizer.value.measureElement(el);
			return;
		}

		if ('$el' in el && el.$el instanceof HTMLElement) {
			rowVirtualizer.value.measureElement(el.$el);
		}
	}

	function scrollToBottom(behavior: ScrollBehavior = 'auto') {
		const lastIndex = virtualRowsData.value.length - 1;

		if (lastIndex < 0) {
			return;
		}

		rowVirtualizer.value.scrollToIndex(lastIndex, {
			align: 'end',
			behavior,
		});
	}

	return {
		rowVirtualizer,
		virtualRows,
		totalSize,
		measureRowElement,
		scrollToBottom,
	};
}
