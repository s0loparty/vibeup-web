<script setup lang="ts">
import BaseScrollButton from '@/app/components/base/BaseScrollButton.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useChatScroll } from '@/modules/chat/composables/useChatScroll';
import '@twallpaper/vue/css';
import { ref } from 'vue';

const scrollAreaRef = ref<InstanceType<typeof ScrollArea> | null>(null);
const { showScrollBtn, handleScroll, scrollToBottom } =
	useChatScroll(scrollAreaRef);

import ChatWindowMessagesItem from './ChatWindowMessagesItem.vue';
</script>

<template>
	<div class="relative min-h-0 flex-1 overflow-hidden">
		<!-- <img :src="space" alt="" class="absolute inset-0 opacity-10" /> -->
		<!-- Wallpaper background -->

		<!-- Content with transparent background -->
		<ScrollArea
			@scroll="handleScroll"
			ref="scrollAreaRef"
			class="relative h-full"
		>
			<div class="chat mx-auto max-w-175 space-y-3 p-4">
				<!-- Example message groups with alternating alignment -->
				<!--пока что передаем пропс индекса для отображения аватарок дальше мб по другому хз -->
				<ChatWindowMessagesItem v-for="(num, index) in 30" :key="num" :index />
			</div>
		</ScrollArea>
		<BaseScrollButton v-if="showScrollBtn" @click="scrollToBottom" />
	</div>
</template>
