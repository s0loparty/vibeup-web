<script setup lang="ts">
import type { MessageSearch } from '@/shared/api/types.gen.ts';
import { LoaderIcon, SearchIcon, XIcon } from 'lucide-vue-next';
import { computed, nextTick, ref, watch } from 'vue';
import MessagesSearchList from './MessagesSearchList.vue';
import { useChatMessagesStore } from './stores/useChatMessagesStore.ts';

const model = defineModel<string>({ required: true });
const inputRef = ref<HTMLInputElement | null>(null);
const chatMessagesStore = useChatMessagesStore();

const props = defineProps<{
	isSearching: boolean;
	findedMessages: MessageSearch[];
	isLoading: boolean;
}>();

const emits = defineEmits(['close']);

const isShowFinded = computed(() => {
	return props.findedMessages.length && chatMessagesStore.isShowSearch;
});

watch(inputRef, async (newVal) => {
	if (newVal) {
		await nextTick();
		inputRef.value?.focus();
	}
});
</script>

<template>
	<div v-if="isSearching" class="relative mr-2.5 w-full max-w-125">
		<div class="relative w-full">
			<SearchIcon
				class="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-400"
			/>
			<input
				ref="inputRef"
				v-model="model"
				type="text"
				placeholder="Поиск"
				class="h-11 w-full rounded-4xl bg-gray-100 px-11 placeholder:font-normal placeholder:text-gray-400"
			/>
			<LoaderIcon
				class="absolute top-1/2 right-2 mr-1.5 size-6 -translate-y-1/2 animate-spin text-gray-400"
				v-if="isLoading"
			/>
			<div
				v-else
				class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-1.5 text-gray-400 transition-all duration-200 hover:rounded-full hover:bg-gray-300/60"
				@click="emits('close')"
			>
				<XIcon class="size-6" />
			</div>
		</div>

		<div class="absolute top-[calc(100%+1px)] right-0 left-0 z-10">
			<MessagesSearchList
				:finded-message-list="findedMessages"
				v-if="isShowFinded"
			/>
		</div>
	</div>
</template>
