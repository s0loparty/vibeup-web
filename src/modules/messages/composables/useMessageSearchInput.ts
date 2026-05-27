import { useMessageSearchQuery } from '@/app/query/messages/useMessageSearchQuery';
import type { Chat } from '@/shared/api';
import { watchDebounced } from '@vueuse/core';
import { ref, toRef } from 'vue';

export function useMessageSearchInput(chatid: Chat['id']) {
	const isShowSearch = ref(false);
	const searchInput = ref('');

	const {
		data: findedMessages,
		refetch,
		isLoading,
	} = useMessageSearchQuery(toRef(chatid), searchInput);

	function closeSearch() {
		isShowSearch.value = !isShowSearch.value;
		searchInput.value = '';
	}

	watchDebounced(
		searchInput,
		(newSearchInput) => {
			console.log(findedMessages);
			if (newSearchInput.length === 0) return;
			refetch();
			console.log(findedMessages.value);
		},
		{ debounce: 500 },
	);

	return {
		isLoading,
		findedMessages,
		isShowSearch,
		searchInput,
		closeSearch,
	};
}
