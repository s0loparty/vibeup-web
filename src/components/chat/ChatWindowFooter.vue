<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { PaperclipIcon, RocketIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import BaseEmojiPicker from '../base/BaseEmojiPicker.vue';
import ChatWindowTextField from './ChatWindowTextField.vue';

const textModel = ref('');
</script>

<template>
	<div class="mx-auto w-full max-w-175 shrink-0 p-4 pt-0">
		<div class="flex items-center justify-between gap-2.5">
			<div class="relative w-full">
				<BaseEmojiPicker />
				<ChatWindowTextField v-model.trim="textModel" />
				<Button
					variant="ghost"
					size="icon"
					class="absolute right-2 bottom-2.5 p-0"
				>
					<PaperclipIcon class="size-6 text-gray-500" />
				</Button>
			</div>

			<button
				class="group flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-400"
			>
				<!-- <SendIcon class="text-white" /> -->
				<!-- <img :src="sendicon" alt="" class="size-8" /> -->
				<RocketIcon
					class="text-white transition-transform group-active:scale-120"
				/>
			</button>
		</div>
	</div>
</template>
