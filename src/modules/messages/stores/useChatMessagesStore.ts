import type { PublicMessage } from '@/shared/api';
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export const useChatMessagesStore = defineStore('chatMessages', () => {
	const isContext = ref(false);
	const isShowSearch = ref(false);
	const searchInput = ref('');
	const contextMessageId = ref<PublicMessage['id'] | null>(null);
	const messages = shallowRef<PublicMessage[]>([]);
	const contextScrollTick = ref(0);

	function getHtmlElementForScroll(
		elems: HTMLElement[],
		id: PublicMessage['id'],
	): HTMLElement | undefined {
		return elems.find((elem) => elem.getAttribute('id') === String(id));
	}

	function incrementScrollTick() {
		return contextScrollTick.value++;
	}

	function setIsContext(value: boolean): void {
		isContext.value = value;
	}

	function setContextMessageId(value: PublicMessage['id'] | null): void {
		contextMessageId.value = value;
	}

	function setMessages(value: PublicMessage[]): void {
		messages.value = value;
	}

	function toggleSearch() {
		isShowSearch.value = !isShowSearch.value;
		searchInput.value = '';
	}

	return {
		contextScrollTick,
		isContext,
		isShowSearch,
		searchInput,
		contextMessageId,
		messages,
		setIsContext,
		toggleSearch,
		setContextMessageId,
		setMessages,
		getHtmlElementForScroll,
		incrementScrollTick,
	};
});
