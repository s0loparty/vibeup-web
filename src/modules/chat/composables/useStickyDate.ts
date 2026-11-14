import type { VirtualItem } from '@tanstack/virtual-core';
import { computed, type ComputedRef, type Ref } from 'vue';
import type { VirtualMessageRow } from './useChatMessagesData';

type Params = {
	scrollViewportRef: Ref<HTMLElement | null>;
	virtualRowsData: ComputedRef<VirtualMessageRow[]>;
	getVirtualItems: () => VirtualItem[];
};

export function useStickyDate({
	scrollViewportRef,
	virtualRowsData,
	getVirtualItems,
}: Params) {
	const stickyDate = computed<string | null>(() => {
		const viewport = scrollViewportRef.value;
		const items = getVirtualItems();

		if (!viewport || !items.length) {
			return null;
		}

		const scrollTop = viewport.scrollTop;

		const firstVisibleItem =
			items.find((item) => item.start <= scrollTop && item.end > scrollTop) ??
			items.find((item) => item.end > scrollTop) ??
			items[0];

		if (!firstVisibleItem) {
			return null;
		}

		for (let index = firstVisibleItem.index; index >= 0; index -= 1) {
			const row = virtualRowsData.value[index];

			if (row?.type === 'date') {
				const dividerIsVisible = items.some((item) => {
					const visibleRow = virtualRowsData.value[item.index];
					return (
						visibleRow?.type === 'date' &&
						visibleRow.date === row.date &&
						item.end > scrollTop &&
						item.start < scrollTop + viewport.clientHeight
					);
				});
				return dividerIsVisible ? null : row.date;
			}
		}

		return null;
	});

	return {
		stickyDate,
	};
}
